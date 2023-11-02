import { useCallback, useEffect, useRef } from 'react';
import { memo, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';
import propTypes from 'prop-types';

import styles from './Map.module.scss';
import config from '~/config';
import Loading from '~/components/Loading';
import { mapStyle } from './mapStyle';
import icons from '~/assets/icons';
import Button from '~/components/Button';
// import Search from './Search';

const cx = classNames.bind(styles);

const containerStyle = {
  width: '70vw',
  height: '70vh',
};

const center = {
  lat: 10.84778,
  lng: 106.78655,
};

const libraries = ['places'];

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

function Map({ lat, lng, isOpen, onClose, width = containerStyle.width, height = containerStyle.height, zoom = 10 }) {
  const [myLocation, setLocation] = useState(center);

  const mapRef = useRef();

  const handleLocationBtnClick = () => {
    getMyLocation();
  };

  const handleChoice = (e) => {
    e.preventDefault();
    onClose(marker);
  };

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const getMyLocation = () => {
    const success = (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setLocation({ lat: lat, lng: lng });
    };

    const error = () => {
      toast.error('Không thể lấy vị trí của bạn!');
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
    return myLocation;
  };

  const [marker, setMarker] = useState({ lat: Number(lat), lng: Number(lng) });

  useEffect(() => {
    if (typeof lat === 'number' && typeof lng === 'number') {
      setMarker({ lat, lng });
    }
  }, [lat, lng]);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: config.constants.GOOGLE_MAP_API_KEYS,
    libraries,
  });

  if (loadError) {
    toast.error('Lỗi tải bản đồ!');
  }

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    mapRef.current = map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
  }, []);

  return isLoaded ? (
    <div
      className={cx('wrapper', {
        open: isOpen,
      })}
    >
      <h1 className={cx('title')}>
        Map{' '}
        <span role="img" aria-label="tent">
          🗺
        </span>
      </h1>
      <button className={cx('location-btn')} onClick={handleLocationBtnClick}>
        <FontAwesomeIcon icon={icons.faLocationCrosshairs} />
      </button>
      <Button primary className={cx('choice-btn')} onClick={handleChoice}>
        Chọn địa điểm này
      </Button>
      <Button danger className={cx('close-btn')} onClick={handleClose}>
        Đóng
      </Button>
      <Search panTo={panTo} />
      <GoogleMap
        onClick={(e) => {
          setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        }}
        mapContainerStyle={{
          width,
          height,
        }}
        center={lat ? { lat, lng } : myLocation}
        zoom={zoom}
        onLoad={onLoad}
        options={options}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker position={marker} />
        <Marker
          position={myLocation}
          icon={{
            path: icons.faLocationCrosshairs.icon[4],
            fillColor: '#0000ff',
            fillOpacity: 1,
            scale: 0.05,
            strokeWeight: 1,
            strokeColor: '#ffffff',
          }}
        />
        {/*  {markers.map((marker, index) => ( */}
        {/* <Marker key={index} position={marker} /> */}
        {/* ))} */}
      </GoogleMap>
    </div>
  ) : (
    <Loading />
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 10.84778, lng: () => 106.78655 },
      radius: 200 * 1000,
    },
  });

  return (
    <div className={cx('search')}>
      <Combobox
        className={cx('search-combo-box')}
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lng, lat });
          } catch (error) {
            console.log('error!');
          }
        }}
      >
        <ComboboxInput
          className={cx('search-input')}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Nhập địa chỉ"
        />
        <ComboboxPopover className={cx('combo-box-popover')} hidden={false}>
          {status === 'OK' && data.map(({ id, description }) => <ComboboxOption key={id} value={description} />)}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

Map.propTypes = {
  lat: propTypes.number,
  lng: propTypes.number,
};

export default memo(Map);

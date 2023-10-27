import React, { useCallback } from 'react';
import { memo, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';

import styles from './Map.module.scss';
import config from '~/config';
import Loading from '~/components/Loading';
import { mapStyle } from './mapStyle';
import icons from '~/assets/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button';

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

function Map({ isOpen, onClose }) {
  const [myLocation, setLocation] = useState(center);

  const handleLocationBtnClick = () => {
    getMyLocation();
  };

  const handleClose = (e) => {
    e.preventDefault();
    onClose(marker);
  };

  const getMyLocation = () => {
    const success = (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      setLocation({ lat, lng });
    };

    const error = () => {
      toast.error('Không thể lấy vị trí của bạn!');
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
    return myLocation;
  };

  const [marker, setMarker] = useState(center);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: config.constants.GOOGLE_MAP_API_KEYS,
    libraries,
  });

  if (loadError) {
    toast.error('Lỗi tải bản đồ!');
  }

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
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
      <Button primary className={cx('choice-btn')} onClick={handleClose}>
        Chọn địa điểm này
      </Button>
      <GoogleMap
        onClick={(e) => {
          setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
          // setMarkers((prev) => [...prev, marker]);
        }}
        mapContainerStyle={containerStyle}
        center={myLocation}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={options}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker position={marker} icon="" />
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

export default memo(Map);

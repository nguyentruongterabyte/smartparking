import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';
import classNames from 'classnames/bind';

import styles from './Map.module.scss';

const cx = classNames.bind(styles);

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

export default Search;

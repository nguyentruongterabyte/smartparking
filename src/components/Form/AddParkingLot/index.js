import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';

import axios from '~/utils/axios';
import styles from '../Form.module.scss';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import Map from '~/components/Map';
import hooks from '~/hooks';
import config from '~/config';

const cx = classNames.bind(styles);
const administrative_boundaries_url = 'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json';

function AddParkingLot({ isOpen, onClose }) {
  const [parkingLotName, setParkingLotName] = useState('');
  const [numberSlot, setNumberSlot] = useState(undefined);
  const [timeOpen, setTimeOpen] = useState('');
  const [timeClose, setTimeClose] = useState('');
  const [ward, setWard] = useState('');
  const [street, setStreet] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [number, setNumber] = useState('');
  const [lat, setLat] = useState(undefined);
  const [lng, setLng] = useState(undefined);
  const [vehicleIds, setVehicleIds] = useState([]);

  const axiosPrivate = hooks.useAxiosPrivate();
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [administrativeBoundaries, setAdministrativeBoundaries] = useState([]);

  useEffect(() => {
    const response = axios.get(administrative_boundaries_url);
    response
      .then((res) => {
        setAdministrativeBoundaries(res.data);
      })
      .catch((e) => {
        console.error(e);
      });

    const response2 = axiosPrivate.get(config.constants.VEHICLE_TYPES_URL);
    response2
      .then((res) => {
        const vs = res?.data?.object.map((v) => ({ label: v.typeName, value: v.id }));
        setVehicleTypes(vs);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleMapBtnClick = (e) => {
    e.preventDefault();
    setIsOpenMap(true);
  };

  const renderCities = () => {
    const render = administrativeBoundaries.map((city) => {
      const provinceName = city.Name.replace('Thành phố', '').replace('Tỉnh', '').trim();

      return (
        <option key={city.Id} value={provinceName}>
          {provinceName}
        </option>
      );
    });
    return render;
  };

  const renderDistricts = () => {
    if (!city) return;
    const filterCity = administrativeBoundaries.filter((ct) => ct.Name.includes(city));
    const render = filterCity[0]?.Districts?.map((district) => {
      const districtName = district.Name;
      return (
        <option key={district.Id} value={districtName}>
          {districtName}
        </option>
      );
    });
    return render;
  };

  const renderWards = () => {
    if (!city || !district) return;
    const filterCity = administrativeBoundaries.filter((administrativeBoundary) => {
      return administrativeBoundary.Name.includes(city);
    });
    const filterDistrict = filterCity[0]?.Districts?.filter((dt) => dt.Name.includes(district));

    const render = filterDistrict[0]?.Wards?.map((ward) => {
      const wardName = ward.Name;
      return (
        <option key={ward.Id} value={wardName}>
          {wardName}
        </option>
      );
    });
    return render;
  };
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleCloseMap = (marker) => {
    setIsOpenMap(false);
    setLat(marker.lat);
    setLng(marker.lng);
  };

  return (
    <Modal isOpen={isOpen}>
      <form
        className={cx('container', {
          open: isOpen && !isOpenMap,
        })}
      >
        <div className={cx('header')}>
          <h3 className={cx('heading')}>Thêm nhà xe mới</h3>
        </div>
        <div className={cx('form')}>
          <div className={cx('group')}>
            {/* parking lot name */}
            <div className={cx('field', 'file_v1')}>
              <label htmlFor="parkingLotName" className={cx('ha-screen-reader')}>
                Tên bãi đỗ xe
              </label>
              <input
                id="parkingLotName"
                onChange={(e) => setParkingLotName(e.target.value)}
                value={parkingLotName}
                className={cx('input', 'field__input')}
                name="parkingLotName"
                placeholder="e.g. Lý Trường Vạn"
              />

              <span className={cx('field__label-wrap')} aria-hidden="true">
                <span className={cx('field__label')}>Tên bãi đỗ xe</span>
              </span>
            </div>

            {/* number slot */}
            <div className={cx('field', 'file_v1')}>
              <label htmlFor="numberSlot" className={cx('ha-screen-reader')}>
                Số xe ước tính
              </label>
              <input
                id="numberSlot"
                min={0}
                onChange={(e) => setNumberSlot(e.target.value)}
                value={numberSlot}
                className={cx('input', 'field__input')}
                name="numberSlot"
                placeholder="e.g. 100"
              />
              <span className={cx('field__label-wrap')} aria-hidden="true">
                <span className={cx('field__label')}>Số xe ước tính</span>
              </span>
            </div>
            {/* time open  */}
            <div className={cx('field', 'file_v1', 'half')}>
              <label htmlFor="timeOpen" className={cx('ha-screen-reader')}>
                Giờ mở cửa
              </label>
              <input
                id="timeOpen"
                type="time"
                onChange={(e) => setTimeOpen(e.target.value)}
                value={timeOpen}
                className={cx('input', 'field__input', 'half')}
                name="timeOpen"
              />

              <span className={cx('field__label-wrap')} aria-hidden="true">
                <span className={cx('field__label')}>Giờ mở cửa</span>
              </span>
            </div>
            {/* time close */}
            <div className={cx('field', 'file_v1', 'half')}>
              <label htmlFor="timeClose" className={cx('ha-screen-reader')}>
                Giờ đóng cửa
              </label>
              <input
                id="timeClose"
                type="time"
                onChange={(e) => setTimeClose(e.target.value)}
                value={timeClose}
                className={cx('input', 'field__input', 'half')}
                placeholder="e.g. 11:00 PM"
                name="timeClose"
              />
              <span className={cx('field__label-wrap')} aria-hidden="true">
                <span className={cx('field__label')}>Giờ đóng cửa</span>
              </span>
            </div>
            {/* city */}
            <select className={cx('input', 'half')} value={city} onChange={(e) => setCity(e.target.value)}>
              <option defaultValue>Chọn tỉnh/thành phố</option>
              {renderCities()}
            </select>
            {/* district */}
            <select className={cx('input', 'half')} value={district} onChange={(e) => setDistrict(e.target.value)}>
              <option defaultValue="">Chọn quận/huyện</option>
              {renderDistricts()}
            </select>
            {/* ward */}
            <select className={cx('input')} value={ward} onChange={(e) => setWard(e.target.value)}>
              <option defaultValue="">Chọn phường/xã</option>
              {renderWards()}
            </select>
            {/* street */}
            <div className={cx('field', 'file_v1')}>
              <label htmlFor="street" className={cx('ha-screen-reader')}>
                Đường
              </label>
              <input
                id="street"
                onChange={(e) => setStreet(e.target.value)}
                value={street}
                className={cx('input', 'field__input')}
                name="street"
                placeholder="e.g. Phạm Văn Đồng"
              />

              <span className={cx('field__label-wrap')} aria-hidden="true">
                <span className={cx('field__label')}>Đường</span>
              </span>
            </div>
            {/* number */}
            <div className={cx('field', 'file_v1')}>
              <label htmlFor="number" className={cx('ha-screen-reader')}>
                Số
              </label>
              <input
                id="number"
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                className={cx('input', 'field__input')}
                name="number"
                placeholder="e.g. 12D/2"
              />

              <span className={cx('field__label-wrap')} aria-hidden="true">
                <span className={cx('field__label')}>Số</span>
              </span>
            </div>

            {/* Location button */}
            <Button className={cx('btn')} onClick={handleMapBtnClick} primary>
              Chọn vị trí trên bản đồ
            </Button>

            {/* Vehicle types options */}
            <div>
              <label htmlFor="vehicleTypes">Loại xe</label>
              <MultiSelect
                id="vehicleTypes"
                options={vehicleTypes}
                value={vehicleIds}
                onChange={setVehicleIds}
                labelledBy="vehiclesType"
              />
            </div>
          </div>
        </div>
        <div className={cx('controls')}>
          <Button danger onClick={handleClose}>
            Đóng
          </Button>
          <Button primary>Thêm nhà xe</Button>
        </div>
      </form>
      <Map isOpen={isOpenMap} onClose={handleCloseMap} />
    </Modal>
  );
}

export default AddParkingLot;

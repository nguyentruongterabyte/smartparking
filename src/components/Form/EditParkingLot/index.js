/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from '~/utils/axios';
import styles from '../Form.module.scss';
import styles2 from './EditParkingLot.module.scss';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import Map from '~/components/Map';
import hooks from '~/hooks';
import config from '~/config';
import icons from '~/assets/icons';
import Image from '~/components/Image';

const cx = classNames.bind(styles);
const cx2 = classNames.bind(styles2);
const administrative_boundaries_url = 'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json';

function EditParkingLot({ id, isOpen, onClose }) {
  const [parkingLotName, setParkingLotName] = useState('');
  const [parkingLotNameFocus, setParkingLotNameFocus] = useState(false);

  const [numberSlot, setNumberSlot] = useState(undefined);
  const [timeOpen, setTimeOpen] = useState('');
  const [timeClose, setTimeClose] = useState('');

  const [ward, setWard] = useState('');
  const [wardFocus, setWardFocus] = useState(false);

  const [district, setDistrict] = useState('');
  const [districtFocus, setDistrictFocus] = useState(false);

  const [city, setCity] = useState('');
  const [cityFocus, setCityFocus] = useState(false);

  const [lat, setLat] = useState(undefined);
  const [lng, setLng] = useState(undefined);
  const [locationFocus, setLocationFocus] = useState(false);

  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [vehiclePrices, setVehiclePrices] = useState({ default: 0 });
  const [fileBase64, setFileBase64] = useState(undefined);

  const axiosPrivate = hooks.useAxiosPrivate();
  const [vehicleIds, setVehicleIds] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [administrativeBoundaries, setAdministrativeBoundaries] = useState([]);

  const [isCityChange, setIsCityChange] = useState(false);
  const [isDistrictChange, setIsDistrictChange] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const errRef = useRef();

  useEffect(() => {
    // fetch administrative boundaries
    const response = axios.get(administrative_boundaries_url);
    response
      .then((res) => {
        setAdministrativeBoundaries(res.data);
      })
      .catch((e) => {
        console.error(e);
      });

    // fetch vehicle types
    const response2 = axiosPrivate.get(config.constants.VEHICLE_TYPES_URL);
    response2
      .then((res) => {
        const vs = res?.data?.object.map((v) => ({ label: v.typeName, value: v.id }));
        setVehicleTypes(vs);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    vehicleIds.forEach((vehicleId) => setVehiclePrices((prev) => ({ ...prev, [vehicleId.value]: 0 })));
  }, [vehicleIds]);

  useEffect(() => {
    if (id) {
      // fetch parking lot information
      const response = axiosPrivate.post(config.constants.PARKING_LOTS_URL, JSON.stringify({ id }));
      response
        .then((res) => {
          const parkingLot = res.data?.object;
          setParkingLotName(parkingLot.parkingLotName);
          setNumberSlot(parkingLot.numberSlot);
          setTimeOpen(parkingLot.timeOpen);
          setTimeClose(parkingLot.timeClose);
          setCity(parkingLot.city);
          setDistrict(parkingLot.district);
          setWard(parkingLot.ward);
          setLat(parkingLot.lat);
          setLng(parkingLot.lng);
          setStreet(parkingLot.street);
          setNumber(parkingLot.number);
          // setImage(  );
          setFileBase64(parkingLot.images.length > 0 ? parkingLot.images[0] : {});
        })
        .catch((err) => toast.warn('Không thể lấy thông tin bãi đỗ xe này!'));
      // fetch ticket details
      const response2 = axiosPrivate.post(config.constants.PRICE_TICKET_URL, JSON.stringify({ id }));
      response2
        .then((res) => {
          const ticketPrices = res.data?.object || [];

          ticketPrices.forEach((ticketPrice) => {
            setVehiclePrices((prev) => ({ ...prev, [ticketPrice.id]: ticketPrice.price }));
            setVehicleIds((prev) => {
              const checkExists = prev.some((tP) => tP.value === ticketPrice.id);
              if (checkExists) {
                return prev;
              }
              return [...prev, { label: ticketPrice.typeName, value: ticketPrice.id }];
            });
          });
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  // render vehicle price
  const renderVehiclePrices = () =>
    vehicleIds.length > 0 ? (
      vehicleTypes.map((vehicleType) => {
        return vehicleIds.map((vehicleId) => vehicleId.value).includes(vehicleType.value) ? (
          <tr key={vehicleType.value}>
            <td>{vehicleType.label}</td>
            <td>
              <input
                value={vehiclePrices[vehicleType.value]}
                onChange={(e) => setVehiclePrices((prev) => ({ ...prev, [vehicleType.value]: Number(e.target.value) }))}
                type="number"
                step="1000"
                className={cx2('vehicle-price')}
              />
            </td>
          </tr>
        ) : (
          ''
        );
      })
    ) : (
      <tr>
        <td>Chưa có loại xe nào được chọn</td>
      </tr>
    );

  // render wards
  const renderWards = () => {
    if (city === 'default' || district === 'default') return;
    const filterCity = administrativeBoundaries.filter((administrativeBoundary) => {
      return administrativeBoundary.Name.includes(city);
    });
    const filterDistrict = filterCity[0]?.Districts?.filter((dt) => dt.Name.includes(district)) || [];

    const render =
      filterDistrict.length > 0
        ? filterDistrict[0].Wards.map((ward) => {
            const wardName = ward.Name;
            return (
              <option key={ward.Id} value={wardName}>
                {wardName}
              </option>
            );
          })
        : '';
    return render;
  };

  // render districts
  const renderDistricts = () => {
    if (city === 'default') return;
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

  // render cities
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

  // handle close map
  const handleCloseMap = (marker) => {
    setIsOpenMap(false);
    if (marker) {
      setLat(marker.lat);
      setLng(marker.lng);
    }
  };

  // handle close form
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  // handle file change
  const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFileBase64((prev) => ({ ...prev, data: reader.result }));
    };

    reader.readAsDataURL(e.target.files[0]);

    console.log(fileBase64.data);
  };

  // handle map button click
  const handleMapBtnClick = (e) => {
    e.preventDefault();
    setLocationFocus(false);
    setIsOpenMap(true);
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('parkingLotName = ', parkingLotName);
    console.log('numberSlot = ', numberSlot);
    console.log('timeOpen = ', timeOpen);
    console.log('timeClose = ', timeClose);
    console.log('ward = ', ward);
    console.log('street = ', street);
    console.log('district = ', district);
    console.log('city = ', city);
    console.log('number = ', number);
    console.log('lat = ', lat);
    console.log('lng = ', lng);
    console.log('vehiclePrices = ', vehiclePrices);
    console.log(vehiclePrices);
    if (!parkingLotName) {
      setParkingLotNameFocus(true);
      return;
    }

    if (city === 'default') {
      setCityFocus(true);
      return;
    }

    if (district === 'default') {
      setDistrictFocus(true);
      return;
    }

    if (ward === 'default') {
      setWardFocus(true);
      return;
    }

    if (!lat || !lng) {
      setLocationFocus(true);
      return;
    }

    const response = axiosPrivate.post(
      config.constants.EDIT_PARKING_URL,
      JSON.stringify({
        id,
        parkingLotName,
        numberSlot,
        timeOpen,
        timeClose,
        ward,
        street,
        district,
        city,
        number,
        lat,
        lng,
      }),
    );

    response
      .then(() => {
        toast.success('Cập nhật bãi đỗ xe thành công!');
      })
      .catch(() => toast.error('Đã có lỗi xảy ra!'));
  };

  // handle city change
  const handleCityChange = (e) => {
    setCityFocus(false);
    setCity(e.target.value);
    setIsCityChange(true);
  };

  // handle district change
  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    setIsDistrictChange(true);
  };

  return (
    <Modal isOpen={isOpen}>
      <form
        className={cx('container', {
          open: isOpen && !isOpenMap,
        })}
        onSubmit={handleSubmit}
      >
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
          {errMsg}
        </p>
        <div className={cx('header')}>
          <h3 className={cx('heading')}>Chỉnh sửa nhà xe</h3>
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
                required
                aria-describedby="parkinglotnamenote"
                onFocus={() => setParkingLotNameFocus(true)}
                onBlur={() => setParkingLotNameFocus(false)}
                placeholder="e.g. Lý Trường Vạn"
              />
              <p
                id="parkinglotnamenote"
                className={!parkingLotName && parkingLotNameFocus ? 'instructions' : 'offscreen'}
              >
                <FontAwesomeIcon icon={icons.faInfoCircle} />
                Không được để trống tên bãi đỗ xe
              </p>
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
                required
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
            <select
              className={cx('input')}
              aria-describedby="citynote"
              value={city}
              onChange={handleCityChange}
              onBlur={() => setCityFocus(true)}
              onFocus={() => setCityFocus(false)}
            >
              <option value={city}>{city}</option>
              {renderCities()}
            </select>
            <p id="citynote" className={cityFocus && city === 'default' ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={icons.faInfoCircle} />
              Không được để trống tỉnh/thành phố
            </p>
            {/* district */}
            <select
              className={cx('input')}
              aria-describedby="districtnote"
              value={district}
              onChange={handleDistrictChange}
            >
              <option value={isCityChange ? 'default' : district}>{isCityChange ? 'Chọn quận/huyện' : district}</option>
              {renderDistricts()}
            </select>
            <p id="districtnote" className={districtFocus && district === 'default' ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={icons.faInfoCircle} />
              Không được để trống quận/huyện
            </p>
            {/* ward */}
            <select className={cx('input')} value={ward} onChange={(e) => setWard(e.target.value)}>
              <option value={isCityChange || isDistrictChange ? 'default' : ward}>
                {isCityChange || isDistrictChange ? 'Chọn phường/xã' : ward}
              </option>
              {renderWards()}
            </select>
            <p id="wardnote" className={wardFocus && ward === 'default' ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={icons.faInfoCircle} />
              Không được để trống phường/xã
            </p>
            {/* street */}
            <div className={cx('field', 'file_v1')}>
              <label htmlFor="street" className={cx('ha-screen-reader')} required>
                Đường
              </label>
              <input
                id="street"
                onChange={(e) => setStreet(e.target.value)}
                value={street}
                className={cx('input', 'field__input')}
                name="street"
                placeholder="e.g. Phạm Văn Đồng"
                required
              />

              <span className={cx('field__label-wrap')} aria-hidden="true" required>
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
                required
              />

              <span className={cx('field__label-wrap')} aria-hidden="true">
                <span className={cx('field__label')}>Số</span>
              </span>
            </div>

            {/* Location button */}
            <Button aria-describedby="locationnote" className={cx('btn')} onClick={handleMapBtnClick} primary>
              Chọn vị trí trên bản đồ
            </Button>
            <p id="locationnote" className={locationFocus ? 'instructions' : 'offscreen'}>
              <FontAwesomeIcon icon={icons.faInfoCircle} />
              Bạn chưa chọn vị trí trên bản đồ
            </p>
            <br />
            {/* file image */}
            {/* <img alt="nhà xe" src={String(fileBase64.data)} /> */}
            <Image src={'data:image/png;base64,' + fileBase64?.data.toString()} />
            <br />
            <input id="file" type="file" onChange={handleFileChange} />
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
            {/* Price vehicle list */}
            <label>Bảng giá</label>
            <Table bordered hover size="sm">
              <thead>
                <tr>
                  <th>Loại xe</th>
                  <th>Giá giữ xe</th>
                </tr>
              </thead>
              <tbody>
                {vehicleIds.length > 0 ? (
                  renderVehiclePrices()
                ) : (
                  <tr>
                    <td>Chưa có xe nào được chọn</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
        <div className={cx('controls')}>
          <Button danger onClick={handleClose}>
            Đóng
          </Button>
          <Button success>Cập nhật</Button>
        </div>
      </form>
      <Map lat={lat} lng={lng} isOpen={isOpenMap} onClose={handleCloseMap} />
    </Modal>
  );
}

export default EditParkingLot;

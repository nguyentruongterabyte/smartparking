/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Modal from '~/components/Modal';
import Button from '~/components/Button';
import styles from '../Form.module.scss';
import hooks from '~/hooks';
import config from '~/config';

const cx = classNames.bind(styles);

function CheckIn({ isOpen, onClose, userId, parkingLotId }) {
  const axiosPrivate = hooks.useAxiosPrivate();
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [license, setLicense] = useState('');
  const [vehicleId, setVehicleId] = useState('');

  useEffect(() => {
    if (parkingLotId) {
      const response = axiosPrivate.post(
        config.constants.VEHICLE_TYPES_BY_ID_URL,
        JSON.stringify({ id: parkingLotId }),
      );

      response
        .then((res) => {
          setVehicleTypes(res.data?.object);
          setVehicleId(res.data?.object?.length > 0 ? res.data.object[0]?.id : '');
        })
        .catch((err) => console.log(err));
    }
  }, [parkingLotId]);

  // handle close form
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('userId = ', userId);
    console.log('parkingLotId = ', parkingLotId);
    console.log('licensePlate = ', license);
    console.log('vehicleId = ', vehicleId);

    const response = axiosPrivate.post(
      '/api/checkin/submit-license-plate',
      JSON.stringify({
        checkInData: {
          userId,
          parkingLotId,
        },
        vehicleData: {
          licensePlate: license,
          vehicleTypeId: vehicleId,
        },
      }),
    );
    response
      .then((res) => {
        console.log(res);
        toast.success(res.data?.message);
        onClose();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  const renderVehicleType = () =>
    vehicleTypes.map((vehicleType) => (
      <option key={vehicleType.id} value={vehicleType.id}>
        {vehicleType.typeName}
      </option>
    ));

  return (
    <Modal isOpen={isOpen}>
      <form
        className={cx('container', {
          open: isOpen,
        })}
        onSubmit={handleSubmit}
      >
        <div className={cx('header')}>
          <h3 className={cx('heading')}>Nhập thông tin check in</h3>
        </div>
        <div className={cx('form')}>
          <div className={cx('group')}>
            <label htmlFor="license">Biển số xe</label>
            <div className={cx('field', 'field_v1')}>
              <input
                className={cx('field__input')}
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                id="license"
              />
            </div>
            <label htmlFor="vehicleType">Chọn loại xe</label>
            <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} className={cx('input')}>
              {renderVehicleType()}
            </select>
          </div>
        </div>
        <div className={cx('controls')}>
          <Button danger onClick={handleClose}>
            Đóng
          </Button>
          <Button success>Xác nhận</Button>
        </div>
      </form>
    </Modal>
  );
}

export default CheckIn;

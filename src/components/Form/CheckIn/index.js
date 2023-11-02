/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import Modal from '~/components/Modal';
import Button from '~/components/Button';
import styles from '../Form.module.scss';
import hooks from '~/hooks';
import config from '~/config';

const cx = classNames.bind(styles);

function CheckIn({ isOpen, onClose, userId, parkingLotId }) {
  const axiosPrivate = hooks.useAxiosPrivate();
  const [vehicleTypes, setVehicleTypes] = useState([]);

  useEffect(() => {
    if (parkingLotId) {
      const response = axiosPrivate.post(
        config.constants.VEHICLE_TYPES_BY_ID_URL,
        JSON.stringify({ id: parkingLotId }),
      );

      response
        .then((res) => {
          setVehicleTypes(res.data?.object);
        })
        .catch((err) => console.log(err));
    }
  }, [parkingLotId]);

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
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
      >
        <div className={cx('header')}>
          <h3 className={cx('heading')}>Nhập thông tin check in</h3>
        </div>
        <div className={cx('form')}>
          <div className={cx('group')}>
            <div className={cx('field', 'field_v1')}>
              <label htmlFor="license" className={cx('ha-screen-reader')}>
                Biển số xe
              </label>
              <input id="license" className={cx('input', 'field__input')} />
              <span className={cx('field__label-wrap')} aria-hidden="true">
                <span className={cx('field__label')}>Biển số xe</span>
              </span>
            </div>
            <label htmlFor="vehicleType">Chọn loại xe</label>
            <select className={cx('input')}>{renderVehicleType()}</select>
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

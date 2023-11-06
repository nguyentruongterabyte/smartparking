import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import icons from '~/assets/icons';
import config from '~/config';
import hooks from '~/hooks';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function ParkingLotResult({ data, totalCurrentTime = undefined }) {
  const timeOpen = data.timeOpen === '00:00' ? '23:59' : data.timeOpen;
  const timeClose = data.timeClose === '00:00' ? '23:59' : data.timeClose;
  const setParkingLot = hooks.useLocalStorage('parkingLotId', '')[1];
  const navigate = useNavigate();
  const from = config.routes.parkingLotCard;

  let totalTimeOpen;
  let totalTimeClose;
  if (totalCurrentTime) {
    let [hour, minute] = (Boolean(timeClose) && Boolean(timeOpen) && timeOpen.split(':').map(Number)) || [7, 30];
    totalTimeOpen = hour * 60 + minute;
    [hour, minute] = (Boolean(timeClose) && Boolean(timeOpen) && timeClose.split(':').map(Number)) || [7, 30];
    totalTimeClose = hour * 60 + minute;
  }

  const handleParkingLotClick = (id) => {
    setParkingLot(id);
    navigate(from, { replace: true });
    toast('Đã chuyển tới trang thông tin bãi đỗ xe! Đóng menu và xem', { position: 'bottom-right' });
  };

  return (
    <div className={cx('parking-lot-item')} onClick={() => handleParkingLotClick(data.id)}>
      <h1 className={cx('parking-lot-name')}>{data.parkingLotName}</h1>
      {totalCurrentTime && totalTimeClose === totalTimeOpen ? (
        <span className={cx('status', 'open')}>
          <FontAwesomeIcon icon={icons.faCircle} /> Mở cả ngày
        </span>
      ) : totalCurrentTime > totalTimeOpen && totalCurrentTime < totalTimeClose ? (
        <span className={cx('status', 'open')}>
          <FontAwesomeIcon icon={icons.faCircle} /> Đang mở cửa
        </span>
      ) : (
        <span className={cx('status', 'close')}>
          <FontAwesomeIcon icon={icons.faCircle} /> Đóng cửa
        </span>
      )}{' '}
      -{' '}
      {data.numberSlotRemaining === 0 ? (
        <span className={cx('status', 'close')}>
          <FontAwesomeIcon icon={icons.faCircle} /> Hết chỗ
        </span>
      ) : (
        <span className={cx('status', 'open')}>
          <FontAwesomeIcon icon={icons.faCircle} /> Còn chỗ
        </span>
      )}
      <p
        className={cx('parking-lot-address')}
      >{`${data.number}, ${data.street}, ${data.ward}, ${data.district}, ${data.city}`}</p>
    </div>
  );
}

export default ParkingLotResult;

import classNames from 'classnames/bind';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function ParkingLotResult({ data }) {
  return (
    <div className={cx('parking-lot-item')} key={data.id}>
      <h1 className={cx('parking-lot-name')}>{data.parkingLotName}</h1>
      <p
        className={cx('parking-lot-address')}
      >{`${data.number}, ${data.street}, ${data.ward}, ${data.district}, ${data.city}`}</p>
    </div>
  );
}

export default ParkingLotResult;

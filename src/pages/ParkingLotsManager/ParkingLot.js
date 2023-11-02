import classNames from 'classnames/bind';

import Image from '~/components/Image';
import styles from './ParkingLotManager.module.scss';
import Button from '~/components/Button';
import icons from '~/assets/icons';
import hooks from '~/hooks';
import config from '~/config';

const cx = classNames.bind(styles);

function ParkingLot({ data, onDelete, onEdit }) {
  const axiosPrivate = hooks.useAxiosPrivate();

  const handleDelete = (id) => {
    const ok = window.confirm('Bạn có muốn xóa bãi đỗ xe này?');

    if (ok) {
      axiosPrivate.post(config.constants.DELETE_PARKING_URL, JSON.stringify({ id }));
      onDelete();
    }
  };

  return (
    <div className={cx('parking-lot__wrapper', 'col l-4 m-6 c-12')}>
      <div className={cx('parking-lot')}>
        <div className={cx('parking-lot__img-wrapper')}>
          <Image src={`data:image/jpeg;base64,${data.image}`} className={cx('parking-lot__img')} />
        </div>
        <div className={cx('parking-lot__information')}>
          <h1 className={cx('parking-lot__name')}>{data.parkingLotName}</h1>
          <p
            className={cx('parking-lot__vehicles-quantity', {
              full: data.numberSlotRemaining === 0,
            })}
          >
            Đang phục vụ {data.numberSlot - data.numberSlotRemaining} xe
          </p>
          <br />
          <p className={cx('parking-lot__address')}>
            {data.number}, {data.street}, {data.ward}, {data.district}, {data.city}
          </p>
          <br />
          <p>
            Giờ mở cửa:{' '}
            {data.timeOpen.length > 0 && data.timeOpen.length > 0 ? `${data.timeOpen} - ${data.timeClose}` : 'Cả ngày'}
          </p>
        </div>
        <div className={cx('parking-lot__buttons')}>
          <Button leftIcon={icons.faPencil} primary onClick={() => onEdit(data.id)}>
            Cập nhật
          </Button>
          <Button danger onClick={() => handleDelete(data.id)}>
            Xóa
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ParkingLot;

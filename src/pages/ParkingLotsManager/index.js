import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';

import styles from './ParkingLotManager.module.scss';
import hooks from '~/hooks';
import config from '~/config';
import ParkingLot from './ParkingLot';

const cx = classNames.bind(styles);

function ParkingLotsManager() {
  const user = hooks.useLocalStorage('user', '')[0];
  const [parkingLots, setParkingLots] = useState([]);
  const [merchantId, setMerchantId] = useState(undefined);

  const axiosPrivate = hooks.useAxiosPrivate();

  useEffect(() => {
    const response = axiosPrivate.post(config.constants.MERCHANT_INFO_URL, JSON.stringify({ username: user }), {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    response
      .then((res) => {
        setMerchantId(res?.data?.object?.id);
      })
      .catch((err) => {
        toast.error('Không lấy được thông tin merchant!');
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (merchantId) {
      const response = axiosPrivate.get(config.constants.PARKING_LOTS_URL + `?merchantId=${merchantId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      response
        .then((res) => {
          const parkingLots = res?.data.map((prev) => {
            const parkingLot = {
              ...prev,
              image: prev.images[0].data,
            };

            delete parkingLot.images;

            return parkingLot;
          });
          setParkingLots(parkingLots);
        })
        .catch((err) => {
          toast.error('Không thể tải thông tin bãi đỗ xe!');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [merchantId]);
  // console.log(parkingLots);
  return (
    <>
      {parkingLots.length > 0 ? (
        <div className={cx('wrapper', 'grid')}>
          <div className={cx('parking-lot__list', 'row')}>{showParkingLots(parkingLots)}</div>
        </div>
      ) : (
        <h1>No parking lots to show!</h1>
      )}
    </>
  );
}

function showParkingLots(parkingLots) {
  return parkingLots.map((parkingLot) => <ParkingLot key={parkingLot.id} data={parkingLot} />);
}

export default ParkingLotsManager;

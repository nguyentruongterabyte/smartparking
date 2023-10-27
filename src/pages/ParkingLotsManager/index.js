import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';

import styles from './ParkingLotManager.module.scss';
import hooks from '~/hooks';
import config from '~/config';
import ParkingLot from './ParkingLot';
import Loading from '~/components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '~/assets/icons';
import Form from '~/components/Form';

const cx = classNames.bind(styles);

function ParkingLotsManager() {
  const user = hooks.useLocalStorage('user', '')[0];
  const [parkingLots, setParkingLots] = useState([]);
  const [merchantId, setMerchantId] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const axiosPrivate = hooks.useAxiosPrivate();

  const handleAddBtnClick = () => {
    setIsAddFormOpen(true);
  };

  const handleCloseAddForm = () => {
    setIsAddFormOpen(false);
  };

  useEffect(() => {
    if (!merchantId) {
      let isMounted = true;
      const response = axiosPrivate.post(config.constants.MERCHANT_INFO_URL, JSON.stringify({ username: user }), {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      response
        .then((res) => {
          isMounted && setMerchantId(res?.data?.object?.id);
        })
        .catch((err) => {
          console.log(err);
          toast.error('Không lấy được thông tin merchant!');
          setIsLoaded(true);
        });
      return () => {
        isMounted = false;
      };
    }

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
          const parkingLots = res?.data?.map((prev) => {
            const parkingLot = {
              ...prev,
              image: prev.images[0]?.data || '',
            };

            delete parkingLot.images;

            return parkingLot;
          });
          setParkingLots(parkingLots);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.log(err);
          toast.error('Không thể tải thông tin bãi đỗ xe!');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [merchantId]);
  return (
    <>
      {parkingLots.length === 0 && !isLoaded ? (
        <Loading />
      ) : parkingLots.length === 0 ? (
        <div className={cx('wrapper', 'grid')}>
          <h1 className={cx('nothing')}>Không có bãi đỗ xe nào!</h1>
        </div>
      ) : (
        <div className={cx('wrapper', 'grid')}>
          <div className={cx('parking-lot__list', 'row')}>{showParkingLots(parkingLots)}</div>
          <button className={cx('add-btn')} onClick={handleAddBtnClick}>
            <span>
              <FontAwesomeIcon icon={icons.faPlus} />
            </span>
          </button>
          <Form.AddParkingLot isOpen={isAddFormOpen} onClose={handleCloseAddForm} />
        </div>
      )}
    </>
  );
}

function showParkingLots(parkingLots) {
  return parkingLots.map((parkingLot) => <ParkingLot key={parkingLot.id} data={parkingLot} />);
}

export default ParkingLotsManager;

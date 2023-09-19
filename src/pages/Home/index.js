import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';

import styles from './Home.module.scss';
import images from '~/assets/images';
import { faSimplybuilt, faWatchmanMonitoring } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

const APP_ADVANTAGES = [
  {
    title: 'Nhanh chóng',
    icon: <FontAwesomeIcon icon={faClock} />,
    description: 'Thanh toán nhanh bằng Zalopay',
  },
  {
    title: 'Tiện lợi',
    icon: <FontAwesomeIcon icon={faMoneyBill1} />,
    description: 'Không cần thẻ xe, chỉ cần chiếc điện thoại của bạn',
  },
  {
    title: 'Đơn giản',
    icon: <FontAwesomeIcon icon={faSimplybuilt} />,
    description: 'Sử dụng QR code để checkin và checkout',
  },
  {
    title: 'An toàn',
    icon: <FontAwesomeIcon icon={faWatchmanMonitoring} />,
    description: 'Không sợ bị mất vé giữ xe gây nhiều phiền toái',
  },
];

function Home() {
  return (
    <div className={cx('wrapper')}>
      <div
        className={cx('content-image-behind-header')}
        style={{
          backgroundImage: `url(${images.backgroundBehindHeader})`,
        }}
      >
        <div className={cx('slogan')}>
          <h1>
            Giải pháp thanh toán đỗ xe
            <br />
            thông minh
          </h1>
        </div>
        <div className={cx('sub-slogan')}>
          <p>Nhanh chóng - Đơn giản - Tiện lợi - An toàn</p>
        </div>
      </div>
      <div className={cx('advantages-app')}>
        <section className={cx('advantages-app-wrapper')}></section>
      </div>
    </div>
  );
}

export default Home;

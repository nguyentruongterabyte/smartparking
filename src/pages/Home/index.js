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
    icon: faClock,
    description: 'Thanh toán nhanh bằng Zalopay không cần tiền mặt',
  },
  {
    title: 'Tiện lợi',
    icon: faMoneyBill1,
    description: 'Không cần thẻ xe, chỉ cần chiếc điện thoại của bạn',
  },
  {
    title: 'Đơn giản',
    icon: faSimplybuilt,
    description: 'Sử dụng QR code để checkin và checkout',
  },
  {
    title: 'An toàn',
    icon: faWatchmanMonitoring,
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
        <section className={cx('advantages-app-wrapper')}>
          <div className={cx('advantages-app-left')}>
            <div className={cx('app-useful')}>
              {APP_ADVANTAGES.map((advantage, index) => {
                return (
                  <div key={index} className={cx('app-useful-item')}>
                    <FontAwesomeIcon icon={advantage.icon} className={cx('app-useful-icon')} />
                    <h4 className={cx('app-useful-title')}>{advantage.title}</h4>
                    <p className={cx('app-useful-description')}>{advantage.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={cx('advantages-app-right')}>
            <div className={cx('advantages-app-right-wrapper')}>
              <div className={cx('right-banner-img-wrapper')}>
                <img src={images.rightBanner} alt="partner-benefit" className={cx('right-banner-img')} />
              </div>
              <div className={cx('partner-benefit')}>
                <h5 className={cx('partner-benefit-title')}>Lợi Ích Khi Trở Thành Đối Tác</h5>
                <p className={cx('partner-benefit-description')}>
                  ConvenientParking là một ứng dụng được thiết kế tinh chỉnh, thân thiện, hiện đại. Cho phép người dùng
                  làm thủ tục gửi xe và thanh toán một cách nhanh chóng, an toàn và tiện lợi. Chủ nhà xe có thể chia sẻ
                  nhà xe để tiếp cận với người dùng một cách dễ dàng.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;

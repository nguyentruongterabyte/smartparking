import classNames from 'classnames/bind';
import images from '~/assets/images';
import Image from '~/components/Image';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('card')}>
        <Image
          src="https://picsum.photos/300/200"
          className={cx('user-avatar')}
          alt="user-avatar"
          fallback={images.noImage}
        />
        <h1>No information</h1>
        <p className={cx('title')}>No information</p>
        <p></p>
      </div>
    </div>
  );
}

export default Profile;

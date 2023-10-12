import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, isOpenLinkText }) {
  return (
    <NavLink to={data.path} className={cx('link')}>
      <div className={cx('icon')}>
        <FontAwesomeIcon icon={data.icon} />
      </div>
      <div
        className={cx('link-text', {
          hide: !isOpenLinkText,
        })}
      >
        {data.name}
      </div>
    </NavLink>
  );
}

export default MenuItem;

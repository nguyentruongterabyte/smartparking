import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ data, isOpenLinkText }) {
  return isOpenLinkText ? (
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
  ) : (
    <Tippy delay={[0, 20]} content={data.name} placement="right-end">
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
    </Tippy>
  );
}

export default MenuItem;

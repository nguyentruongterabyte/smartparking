import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import config from '~/config';
import styles from './SideBar.module.scss';
import hooks from '~/hooks';
import MenuItem from './MenuItem';
import icons from '~/assets/icons';

const cx = classNames.bind(styles);

function SideBar({ children, className }) {
  const [isOpen, toggleIsOpen] = hooks.useToggle('menu-open', true);
  const ROLES = config.constants.ROLES;
  const { role } = hooks.useJWTDecode();

  const classes = cx('container', { [className]: className });

  const menuItems =
    role && role === ROLES.admin
      ? config.constants.SIDEBAR_ADMIN_MENU
      : role === ROLES.merchant
      ? config.constants.SIDEBAR_MERCHANT_MENU
      : role === ROLES.user
      ? config.constants.SIDEBAR_USER_MENU
      : role === ROLES.employee
      ? config.constants.SIDEBAR_EMPLOYEE_MENU
      : [];
  return (
    <div className={cx(classes)}>
      <div
        className={cx('sidebar', 'hide-on-mobile-tablet', {
          toggle: !isOpen,
        })}
      >
        <div className={cx('top-section')}>
          <h1
            className={cx('logo', {
              hide: !isOpen,
            })}
          >
            Menu
          </h1>
          <div className={cx('bars')} onClick={toggleIsOpen}>
            <FontAwesomeIcon icon={icons.faBars} />
          </div>
        </div>
        {menuItems.map((item, index) => (
          <MenuItem data={item} key={index} isOpenLinkText={isOpen} />
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
}

export default SideBar;

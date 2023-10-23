import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';

import images from '~/assets/images';
import config from '~/config';
import styles from './Header.module.scss';
import Button from '~/components/Button';
import hooks from '~/hooks';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import icons from '~/assets/icons';
import NavItem from './NavItem';

const cx = classNames.bind(styles);

const ACCOUNT_MENU_ITEMS = config.constants.ACCOUNT_MENU_ITEMS;

const defaultFn = () => {};

function Header({ className, headerSearch }) {
  const { auth } = hooks.useAuth();
  const logout = hooks.useLogout();
  const navigate = useNavigate();
  const ROLES = config.constants.ROLES;
  const { role } = hooks.useJWTDecode();

  const Search = headerSearch || undefined;

  const classes = cx('header-wrapper', { [className]: className });

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

  // handle menu change
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      // handle logout
      case 'logout': {
        logout();
        break;
      }
      // handle view profile
      case 'viewProfile':
        navigate(config.routes.profile, { replace: true });
        break;
      default:
        defaultFn();
    }
  };
  return (
    <div className={cx(classes)}>
      <Navbar expand="lg" data-bs-theme="dark" className={cx('bg-body-tertiary', 'header-nav')}>
        <Container className={cx('header-container')}>
          <Navbar.Brand className={cx('brand')}>
            <Link
              to={auth.accessToken ? config.routes.homeHasLoggedIn : config.routes.home}
              className={cx('logo-link')}
            >
              <FontAwesomeIcon className={cx('logo')} icon={icons.faSquareParking} />
            </Link>
            <span className={cx('hide-on-mobile')}>Convenient Parking</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className={cx('navbar-collapse')}>
            {headerSearch ? (
              <Nav>
                <Search />
              </Nav>
            ) : (
              <></>
            )}
            <Nav>
              {auth.accessToken ? (
                <>
                  {menuItems.map((item, index) => (
                    <NavItem data={item} key={index} />
                  ))}
                  <Menu items={ACCOUNT_MENU_ITEMS} hideOnClick={true} onChange={handleMenuChange}>
                    <div>
                      <Tippy delay={[0, 50]} content="Account" placement="bottom">
                        <Image
                          src="https://picsum.photos/200/300"
                          className={cx('user-avatar', 'hide-on-mobile-tablet')}
                          alt="user-avatar"
                          fallback={images.noImage}
                        />
                      </Tippy>
                      <Button outline className={cx('account-btn', 'hide-on-pc')}>
                        Tài khoản
                      </Button>
                    </div>
                  </Menu>
                </>
              ) : (
                // <Nav.Link href={config.routes.login}>
                <Button primary to={config.routes.login}>
                  Đăng nhập
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;

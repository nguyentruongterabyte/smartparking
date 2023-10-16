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

const cx = classNames.bind(styles);

const MENU_ITEMS = config.constants.ACCOUNT_MENU_ITEMS;

const defaultFn = () => {};

function Header() {
  const { auth } = hooks.useAuth();
  const logout = hooks.useLogout();
  const navigate = useNavigate();

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
    <div className={cx('header-wrapper')}>
      <Navbar expand="lg" data-bs-theme="dark" className={cx('bg-body-tertiary', 'header-nav')}>
        <Container className={cx('header-container')}>
          <Navbar.Brand className={cx('brand')}>
            <Link to={config.routes.home} className={cx('logo-link')}>
              <FontAwesomeIcon className={cx('logo')} icon={icons.faSquareParking} />
            </Link>
            <span>Convenient Parking</span>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav" className={cx('navbar-collapse')}>
            <Nav className={cx('nav-links')}>
              {auth.accessToken ? (
                <>
                  <Menu items={MENU_ITEMS} hideOnClick={true} onChange={handleMenuChange}>
                    <Tippy delay={[0, 50]} content="Account" placement="bottom">
                      <Image src="" className={cx('user-avatar')} alt="user-avatar" fallback={images.noImage} />
                    </Tippy>
                  </Menu>
                </>
              ) : (
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

import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faEarthAsia, faKeyboard, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import images from '~/assets/images';
import config from '~/config';
import styles from '~/layouts/DefaultLayout/DefaultLayout.module.scss';
import Button from '~/components/Button';
import hooks from '~/hooks';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: 'English',
    children: {
      title: 'Languages',
      data: [
        {
          title: 'English',
          type: 'language',
          code: 'en',
        },
        {
          title: 'Tiếng Việt',
          type: 'language',
          code: 'vi',
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcut',
  },
  {
    icon: <FontAwesomeIcon icon={faRightFromBracket} />,
    title: 'Log out',
  },
];

function Header() {
  const { auth, setAuth } = hooks.useAuth();
  const handleLogout = () => {
    setAuth({});
  };
  return (
    <div className={cx('header-wrapper')}>
      <Navbar expand="lg" data-bs-theme="dark" className={cx('bg-body-tertiary', 'header-nav')}>
        <Container className={cx('header-container')}>
          <Navbar.Brand className={cx('brand')}>
            <Link to={config.routes.home} className={cx('logo-link')}>
              <img alt="P" src={images.logo} />
            </Link>
            <span>Convenient Parking</span>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav" className={cx('navbar-collapse')}>
            <Nav className={cx('nav-links')}>
              {auth.user ? (
                <Menu items={MENU_ITEMS}>
                  <Image
                    src="https://picsum.photos/200/300"
                    className={cx('user-avatar')}
                    alt="user-avatar"
                    fallback={images.noImage}
                  />
                </Menu>
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

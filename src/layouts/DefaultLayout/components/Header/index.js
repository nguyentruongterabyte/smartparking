import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouzz } from '@fortawesome/free-brands-svg-icons';

import images from '~/assets/images';
import config from '~/config';
import styles from '~/layouts/DefaultLayout/DefaultLayout.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Header() {
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
              <Link to={config.routes.home} className={cx('nav-link', 'nav-link-item')}>
                <FontAwesomeIcon icon={faHouzz} className={cx('nav-icon')} />
                Trang chủ
              </Link>
              <Button primary href={config.routes.login}>
                Đăng nhập
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;

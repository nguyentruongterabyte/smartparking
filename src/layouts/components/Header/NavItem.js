import Nav from 'react-bootstrap/Nav';
import classNames from 'classnames/bind';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function NavItem({ data }) {
  return (
    <div className={cx('nav-item', 'hide-on-pc')}>
      <Nav.Link className={cx('nav-link', 'hide-on-pc')} href={data.path}>
        {data.name}
      </Nav.Link>
    </div>
  );
}

export default NavItem;

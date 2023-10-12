import classNames from 'classnames/bind';

import SideBar from '../components/SideBar';
import Header from '../components/Header';
import styles from './HasSideBarLayout.module.scss';

const cx = classNames.bind(styles);
function HasSideBarLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <SideBar>
          <div className={cx('content')}>{children}</div>
        </SideBar>
      </div>
    </div>
  );
}

export default HasSideBarLayout;

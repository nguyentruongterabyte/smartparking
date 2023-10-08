import classNames from 'classnames/bind';

import config from '~/config';
import styles from './Missing.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const Missing = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('notfound')}>
        <div className={cx('notfound-404')}>
          <h1>
            4<span>0</span>4
          </h1>
        </div>
        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
        <Button outline to={config.routes.home}>
          Home page
        </Button>
      </div>
    </div>
  );
};

export default Missing;

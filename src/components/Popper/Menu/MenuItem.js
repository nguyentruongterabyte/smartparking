import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Menu.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MenuItem({ data, onClick }) {
  const classes = cx('menu-item', {
    separate: data.separate,
  });

  return (
    <Button className={classes} to={data.to} leftIcon={<FontAwesomeIcon icon={data.icon} />} onClick={onClick}>
      {data.title}
    </Button>
  );
}

export default MenuItem;

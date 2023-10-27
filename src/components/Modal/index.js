import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ children, isOpen }) {
  return (
    <div
      className={cx('wrapper', {
        open: isOpen,
      })}
    >
      <div className={cx('overlay')}></div>
      <div className={cx('body')}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  // children: PropTypes.arrayOf(PropTypes.element).isRequired,
  isOpen: PropTypes.bool,
};

export default Modal;

import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  primary = false,
  outline = false,
  text = false,
  rounded = false,
  small = false,
  large = false,
  danger = false,
  disabled = false,
  children,
  className,
  leftIcon,
  rightIcon,
  onClick,
  ...passProps
}) {
  let Comp = 'button';

  const props = {
    ...passProps,
    onClick,
  };

  // Remove event listeners when button is disabled
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }

  const classes = cx('wrapper', {
    [className]: className,
    primary,
    outline,
    text,
    rounded,
    small,
    large,
    danger,
    disabled,
  });

  return (
    <Comp className={cx(classes)} {...props}>
      {leftIcon && (
        <span className={cx('icon')}>
          <FontAwesomeIcon icon={leftIcon} />
        </span>
      )}
      <span className={cx('title')}>{children}</span>
      {rightIcon && (
        <span className={cx('icon')}>
          <FontAwesomeIcon icon={rightIcon} />
        </span>
      )}
    </Comp>
  );
}

export default Button;

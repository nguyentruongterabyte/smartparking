import classNames from 'classnames/bind';

import styles from './Error.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Error({
  errorCode = 404,
  message = 'The page you are looking for might have been removed had its name changed or is temporarily unavailable.',
  goBack = defaultFn,
  goBackTitle = 'Go back',
}) {
  let errorCodeStr = errorCode.toString();
  return (
    <div className={cx('wrapper')}>
      <div className={cx('error')}>
        <div className={cx('error-block')}>
          <h1>
            {errorCodeStr[0]}
            <span>{errorCodeStr[1]}</span>
            {errorCodeStr[2]}
          </h1>
        </div>
        <p>{message}</p>
        <Button outline onClick={goBack}>
          {goBackTitle}
        </Button>
      </div>
    </div>
  );
}

export default Error;

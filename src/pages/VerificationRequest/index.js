import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import hooks from '~/hooks';
import styles from './VerificationRequest.module.scss';
import Button from '~/components/Button';
import config from '~/config';
import axios from '~/utils/axios';
const cx = classNames.bind(styles);

function VerificationRequest() {
  const navigate = useNavigate();
  const from = config.routes.verification;
  const [user] = hooks.useLocalStorage('user', '');

  const sendVerifyCode = async () => {
    try {
      const response = await axios.get(config.constants.EMAIL_VERIFICATION_URL + `?username=${user}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      return response?.data?.message;
    } catch (e) {
      console.log(e.message);
      return { error: e.message };
    }
  };

  const handleVerify = async () => {
    const ok = window.confirm('bạn có muốn gửi mail xác thực?');
    if (ok) {
      const response = await toast.promise(sendVerifyCode(), {
        pending: 'Đang gửi mã xác thực...',
      });

      if (response.error) {
        // Hiển thị thông báo nếu có lỗi
        toast.error(response.error);
      } else {
        toast.success(response);
        navigate(from, { replace: true });
      }
    }
  };
  return (
    <div className={cx('wrapper')}>
      <p>{user} thân mến,</p>
      <br />
      <p>
        Chúng tôi rất vui vì bạn đã đăng ký người dùng website {config.constants.APP_NAME}. Để bắt đầu khám phá, vui
        lòng xác nhận địa chỉ email của bạn.
      </p>
      <br />
      <Button className={cx('verify-btn')} onClick={handleVerify}>
        Xác minh ngay
      </Button>
      <br />
      <p>
        Chào mừng đến với {config.constants.APP_NAME}!
        <br />
        The {config.constants.APP_NAME} Team
      </p>
    </div>
  );
}

export default VerificationRequest;

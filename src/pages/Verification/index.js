import classNames from 'classnames/bind';
import { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Button from '~/components/Button';
import hooks from '~/hooks';
import config from '~/config';
import styles from '~/pages/Login/Login.module.scss';
import axios from '~/utils/axios';

const cx = classNames.bind(styles);

function Verification() {
  const errRef = useRef();
  const verificationRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [username] = hooks.useLocalStorage('user', '');
  const [verificationCode, setVerificationCode] = useState('');
  const from = config.routes.login;
  const navigate = useNavigate();
  useEffect(() => {
    verificationRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [verificationCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        config.constants.EMAIL_VERIFICATION_URL,
        JSON.stringify({ username, verificationCode }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      toast.success(response?.data?.message);
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Không có phản hồi từ máy chủ');
      } else {
        setErrMsg(err?.response?.data?.message);
      }
      errRef.current?.focus();
    }
  };

  return (
    <div className={cx('wrapper')}>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
        {errMsg}
      </p>
      <h1>Nhập Mã Xác Thực</h1>
      <form onClick={handleSubmit} className={cx('form')}>
        <label htmlFor="verificationCode">Mã xác thực:</label>
        <input
          type="text"
          id="verificationCode"
          ref={verificationRef}
          spellCheck="false"
          autoComplete="off"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
        <Button className={cx('login-btn')}>Xác nhận</Button>
      </form>
    </div>
  );
}

export default Verification;

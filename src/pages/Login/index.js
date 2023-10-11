import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Login.module.scss';
import axios from '~/utils/axios';
import Button from '~/components/Button';
import config from '~/config';
import hooks from '~/hooks';

const cx = classNames.bind(styles);

function Login() {
  const { setAuth } = hooks.useAuth();

  const navigate = useNavigate();
  const from = config.routes.home; // from = location.state?.from?.pathname || config.routes.home

  const userRef = useRef();
  const errRef = useRef();

  const [user, resetUser, userAttribs] = hooks.useInput('user', '');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [check, toggleCheck] = hooks.useToggle('persist', false);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(config.constants.LOGIN_URL, JSON.stringify({ username: user, password: pwd }), {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      const accessToken = response?.data?.object?.accessToken;
      const refreshToken = response?.data?.object?.refreshToken;
      setAuth({ accessToken, refreshToken });
      if (check) {
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
      } else {
        localStorage.removeItem('refreshToken');
      }
      // console.log(refreshToken);
      // setUser('');
      resetUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Không có phản hồi từ máy chủ');
      } else if (err.response?.status === 401 || err.response?.status === 400) {
        setErrMsg(err?.response.data.message);
      } else {
        setErrMsg('Đăng nhập thất bại');
      }
      errRef.current?.focus();
    }
  };

  // const togglePersist = () => {
  //   setPersist((prev) => {
  //     if (prev) {
  //
  //     }
  //     return !prev;
  //   });
  // };

  // useEffect(() => {
  //   localStorage.setItem('persist', persist);
  // }, [persist]);

  return (
    <section className={cx('wrapper')}>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
        {errMsg}
      </p>
      <h1>Đăng Nhập</h1>
      <form onSubmit={handleSubmit} className={cx('form')}>
        <label htmlFor="username">Tên đăng nhập:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          spellCheck="false"
          autoComplete="off"
          {...userAttribs}
          required
        />

        <label htmlFor="password">Mật khẩu:</label>
        <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
        <Button className={cx('login-btn')}>Đăng nhập</Button>
        <div className={cx('persistCheck')}>
          <input type="checkbox" id="persist" onChange={toggleCheck} checked={check} />
          <label htmlFor="persist">Lưu thông tin</label>
        </div>
      </form>
      <p className={cx('need-account')}>
        Cần một tài khoản?
        <br />
        <span className="line">
          {/*put router link here*/}
          <a href="/register">Đăng kí</a>
        </span>
      </p>
    </section>
  );
}

export default Login;

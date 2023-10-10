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
  const { setAuth, persist, setPersist } = hooks.useAuth();

  const navigate = useNavigate();
  const from = config.routes.home; // from = location.state?.from?.pathname || config.routes.home

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

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

      const role = response?.data?.object?.role;
      const accessToken = response?.data?.object?.accessToken;
      const refreshToken = response?.data?.object?.refreshToken;
      setAuth({ user, pwd, role, accessToken, refreshToken });
      if (persist) {
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
        localStorage.setItem('role', role);
      }
      // console.log(refreshToken);
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 401 || err.response?.status === 400) {
        setErrMsg(err?.response.data.message);
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current?.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => {
      if (prev) {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('role');
      }
      return !prev;
    });
  };

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  return (
    <section className={cx('wrapper')}>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className={cx('form')}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required />
        <Button className={cx('login-btn')}>Sign In</Button>
        <div className={cx('persistCheck')}>
          <input type="checkbox" id="persist" onChange={togglePersist} checked={persist} />
          <label htmlFor="persist">Trust This Device</label>
        </div>
      </form>
      <p className={cx('need-account')}>
        Need an Account?
        <br />
        <span className="line">
          {/*put router link here*/}
          <a href="/register">Sign Up</a>
        </span>
      </p>
    </section>
  );
}

export default Login;

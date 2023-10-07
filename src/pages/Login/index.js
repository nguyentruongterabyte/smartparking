import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const from = location.state?.from?.pathname || config.routes.home;

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

      const role = response?.data?.role;
      const accessToken = response?.data?.accessToken;
      console.log(accessToken);

      setAuth({ user, pwd, role, accessToken });
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
      </form>
      <p>
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

/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

import hooks from '~/hooks';
import Loading from '~/components/Loading';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = hooks.useRefreshToken();
  const { auth } = hooks.useAuth();
  const [persist] = hooks.useLocalStorage('persist', false);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist avoids unwanted call to verifyRefreshToken
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    // console.log(`isLoading: ${isLoading}`);
    // console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);
  return <>{!persist ? <Outlet /> : isLoading ? <Loading /> : <Outlet />}</>;
}

export default PersistLogin;

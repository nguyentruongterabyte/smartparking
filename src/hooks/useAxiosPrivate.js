import { axiosPrivate } from '~/utils/axios';
import { useEffect } from 'react';

import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

function useAxiosPrivate() {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
          config.headers['ngrok-skip-browser-warning'] = true;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          // Bearer
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          prevRequest.headers['ngrok-skip-browser-warning'] = true;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);
  return axiosPrivate;
}

export default useAxiosPrivate;

import axios from '~/utils/axios';
import useAuth from './useAuth';
import config from '~/config';

// used for refresh token generation
function useRefreshToken() {
  const { auth, setAuth } = useAuth();

  const { user, pwd } = auth;

  const refresh = async () => {
    const response = await axios.post(config.constants.LOGIN_URL, JSON.stringify({ username: user, password: pwd }), {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    setAuth((prev) => {
      // console.log(JSON.stringify(prev));
      // console.log(response?.data?.object?.accessToken);
      return { ...prev, accessToken: response.data.object.accessToken };
    });
    return response.data.object.accessToken;
  };

  // const refresh = async () => {
  //   const response = await axios.get('/', {
  //     withCredentials: true,
  //   });
  //   setAuth((prev) => {
  //     return { ...prev, accessToken: response.data.object.accessToken };
  //   });
  //   return response.data.object.accessToken;
  // };

  return refresh;
}

export default useRefreshToken;

import axios from '~/utils/axios';
import useAuth from './useAuth';
import config from '~/config';

// used for refresh token generation
function useRefreshToken() {
  const { auth, setAuth } = useAuth();

  const refreshToken = auth?.refreshToken || JSON.parse(localStorage.getItem('refreshToken'));
  const role = auth?.role || JSON.parse(localStorage.getItem('role'));
  // console.log(role);
  const refresh = async () => {
    const response = await axios.post(config.constants.REFRESH_URL, JSON.stringify({ refreshToken }), {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    setAuth((prev) => {
      // console.log(JSON.stringify(prev));
      // console.log(response.data.object);
      return { ...prev, accessToken: response.data.object, role };
    });
    return response.data.object;
  };

  return refresh;
}

export default useRefreshToken;

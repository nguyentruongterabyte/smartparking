import axios from '~/utils/axios';
import useAuth from './useAuth';
import config from '~/config';
// used for refresh token generation
function useRefreshToken() {
  const { auth, setAuth } = useAuth();

  const refreshToken = auth?.refreshToken || JSON.parse(localStorage.getItem('refreshToken'));
  // const role = auth?.role || JSON.parse(localStorage.getItem('role'));
  // console.log(role);
  const refresh = async () => {
    const response = await axios.post(config.constants.REFRESH_URL, JSON.stringify({ refreshToken }), {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    const accessToken = response?.data?.object?.accessToken;
    const role = response?.data?.object?.role;
    setAuth((prev) => {
      // console.log(JSON.stringify(prev));
      // console.log(response.data.object);
      return { ...prev, accessToken, role };
    });
    return response.data.object;
  };

  return refresh;
}

export default useRefreshToken;

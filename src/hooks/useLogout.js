import useAuth from './useAuth';
// import config from '~/config';
// import axios from '~/utils/axios';

function useLogout() {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    // try {
    //   const response = await axios.get(config.constants.LOGOUT_URL, {
    //     withCredentials: true,
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  };
  return logout;
}

export default useLogout;

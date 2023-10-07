import config from '~/config';
import axios from '~/utils/axios';

export const logout = async () => {
  try {
    const response = await axios.get(config.constants.LOGOUT_URL);
    console.log(response?.data?.message);
    return response?.data;
  } catch (err) {
    console.log(err);
  }
};

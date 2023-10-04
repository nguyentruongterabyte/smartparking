import config from '~/config';
import httpRequest from '~/utils/httpRequest';

export const logout = async () => {
  try {
    const response = await httpRequest.get(config.constants.LOGOUT_URL);
    console.log(response?.data?.message);
    return response?.data;
  } catch (err) {
    console.log(err);
  }
};

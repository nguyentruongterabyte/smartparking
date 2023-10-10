import axios from '~/utils/axios';
import config from '~/config';

export const login = async (username, password) => {
  try {
    const response = await axios.post(config.constants.LOGIN_URL, JSON.stringify({ username, password }), {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    // console.log(response.data);
    return {
      success: true,
      data: response?.data,
    };
  } catch (err) {
    if (!err?.response) {
      return { errMsg: 'No Server Response' };
    } else if (err.response?.status === 401 || err.response?.status === 400) {
      // console.log(err.response.data.message);
      return { errMsg: err.response.data.message };
    } else {
      return { errMsg: 'Login Failed' };
    }
  }
};

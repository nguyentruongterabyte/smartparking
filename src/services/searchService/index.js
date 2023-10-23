import hooks from '~/hooks';
import config from '~/config';

export const searchParkingLot = async (keyword) => {
  const axiosPrivate = hooks.useAxiosPrivate();
  const response = await axiosPrivate.get(config.constants.SEARCHING_LOTS_URL + `?keyword=${keyword}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return response;
};

import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';

import config from '~/config';
import hooks from '~/hooks';

function EmployeeCheckIn() {
  const checkInLink = config.constants.SERVER_BASE_URL;
  const [username] = hooks.useLocalStorage('user', '');
  const axiosPrivate = hooks.useAxiosPrivate();
  const [parkingLotId, setParkingLotId] = useState('');

  useEffect(() => {
    let isMounted = true;

    const getParkingLotId = async () => {
      try {
        const response = await axiosPrivate.post(
          config.constants.PARKING_LOT_ID_BY_USERNAME_URL,
          JSON.stringify({ username: username }),
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          },
        );
        isMounted && setParkingLotId(response?.data?.object?.id);
      } catch (e) {}
    };
    getParkingLotId();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        // margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <QRCodeSVG
        style={{ width: '200px', height: '200px' }}
        value={`${checkInLink} /check-in?parkingLotId=+ ${parkingLotId}`}
      />
    </div>
  );
}

export default EmployeeCheckIn;

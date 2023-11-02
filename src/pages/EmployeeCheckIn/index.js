/* eslint-disable react-hooks/exhaustive-deps */
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import CryptoJS from 'crypto-js';
import Form from '~/components/Form';

import config from '~/config';
import hooks from '~/hooks';
import { toast } from 'react-toastify';

var stompClient = null;
function EmployeeCheckIn() {
  const [username] = hooks.useLocalStorage('user', '');
  const axiosPrivate = hooks.useAxiosPrivate();
  const [parkingLotId, setParkingLotId] = useState(undefined);
  const [parkingLotIdEncode, setParkingLotIdEncode] = useState('');
  const [payload, setPayload] = useState(undefined);
  const [isCheckInFormOpen, setIsCheckInFormOpen] = useState(false);
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    let isMounted = true;
    const getParkingLotId = async () => {
      try {
        const response = await axiosPrivate.post(
          config.constants.PARKING_LOT_ID_BY_USERNAME_URL,
          JSON.stringify({ username: username }),
        );
        isMounted && setParkingLotId(response?.data?.object?.id);
      } catch (err) {
        console.log(err);
      }
    };
    getParkingLotId();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (parkingLotId) {
      registerUser();
      const encryptedText = CryptoJS.AES.encrypt(
        'parkingLotId=' + parkingLotId,
        config.constants.SECRET_KEY,
      ).toString();
      setParkingLotIdEncode(encryptedText);
    }
  }, [parkingLotId]);

  const registerUser = () => {
    let Sock = new SockJS(config.constants.WEB_SOCKET, {
      headers: {},
    });
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onError = (err) => {
    console.log(err);
  };

  const onConnected = () => {
    stompClient.subscribe(config.constants.WEB_SOCKET_SUBSCRIBE_CHANNEL_URL + parkingLotId, onPublicMessageReceived);
  };

  const onPublicMessageReceived = (payload) => {
    setPayload(payload);
  };

  // handle check in form close
  const handleCloseCheckInForm = () => {
    setIsCheckInFormOpen(false);
  };

  useEffect(() => {
    if (payload) {
      setIsCheckInFormOpen(true);
      setUserId(JSON.parse(payload.body)?.checkInData?.userId);
      toast('Đã quét mã QR, đang mở form nhập biển số!');
    }
  }, [payload]);

  console.log(userId);
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
      <QRCodeSVG style={{ width: '200px', height: '200px' }} value={parkingLotIdEncode} />
      <Form.CheckIn
        parkingLotId={isCheckInFormOpen ? parkingLotId : undefined}
        userId={isCheckInFormOpen ? userId : undefined}
        isOpen={isCheckInFormOpen}
        onClose={handleCloseCheckInForm}
      />
    </div>
  );
}

export default EmployeeCheckIn;

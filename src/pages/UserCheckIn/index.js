/* eslint-disable react-hooks/exhaustive-deps */
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

import config from '~/config';
import hooks from '~/hooks';
import { toast } from 'react-toastify';

function UserCheckIn() {
  const [scannerResult, setScannerResult] = useState(undefined);
  const [parkingLotId, setParkingLotId] = useState(undefined);
  const [userId, setUserId] = useState(undefined);
  const username = hooks.useLocalStorage('user', '')[0];
  const axiosPrivate = hooks.useAxiosPrivate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
      disableFlip: false,
    });

    const success = (result) => {
      scanner.clear();
      setScannerResult(result);
    };

    const error = (e) => {
      console.log(e);
    };

    scanner.render(success, error);

    // fetch user information

    const response = axiosPrivate.post(config.constants.USER_INFO_URL, JSON.stringify({ username }));
    response
      .then((res) => {
        setUserId(res.data?.object?.id);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (scannerResult) {
      const decryptedBytes = CryptoJS.AES.decrypt(scannerResult, config.constants.SECRET_KEY);
      const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

      setParkingLotId(Number(decryptedText.replace('parkingLotId=', '')));
    }
  }, [scannerResult]);

  useEffect(() => {
    if (!parkingLotId || !userId) return;
    const response = axiosPrivate.post(
      config.constants.CHECK_IN_URL,
      JSON.stringify({
        userId,
        parkingLotId,
      }),
    );
    response
      .then((res) => {
        console.log(res);
        if (res.response?.status === 302) {
          toast.warn(res.response?.data?.message || 'Đã quá hạn nhập biển số xe. Vui lòng quét mã QR lại');
        }
        setUserId(undefined);
      })
      .catch((err) => console.log(err));
  }, [parkingLotId]);

  return (
    <div>
      <h1>QR Check In Scanning</h1>
      <div id="reader"></div>
    </div>
  );
}

export default UserCheckIn;

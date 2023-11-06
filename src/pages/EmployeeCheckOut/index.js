/* eslint-disable react-hooks/exhaustive-deps */
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

import config from '~/config';
import hooks from '~/hooks';
import Form from '~/components/Form';
import { toast } from 'react-toastify';

function EmployeeCheckOut() {
  const [scannerResult, setScannerResult] = useState(undefined);
  const [id, SetId] = useState(undefined);
  const axiosPrivate = hooks.useAxiosPrivate();
  const [licensePlate, setLicensePlate] = useState(undefined);
  const [price, setPrice] = useState(undefined);
  const [isOpenFormCheckoutConfirm, setIsOpenFormCheckoutConfirm] = useState(false);

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
  }, []);

  useEffect(() => {
    if (scannerResult) {
      const decryptedBytes = CryptoJS.AES.decrypt(scannerResult, config.constants.SECRET_KEY);
      const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
      // console.log(decryptedText);
      SetId(JSON.parse(decryptedText).id);
    }
  }, [scannerResult]);

  useEffect(() => {
    if (id) {
      const response = axiosPrivate.post(config.constants.PRE_CHECK_OUT_URL, JSON.stringify({ id }));
      response
        .then((res) => {
          if (res.request?.status === 208) {
            toast.success('Vé đã Check Out rồi!');
            return;
          }
          console.log(res);
          setLicensePlate(res.data?.object?.licensePlate);
          setPrice(res.data?.object?.price);
          setIsOpenFormCheckoutConfirm(true);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const handleCloseForm = () => {
    setIsOpenFormCheckoutConfirm(false);
  };

  return (
    <div>
      <h1>QR Check Out Scanning</h1>
      {<div id="reader"></div>}
      <Form.CheckOutConfirm
        data={{ licensePlate, price, id }}
        onClose={handleCloseForm}
        isOpen={isOpenFormCheckoutConfirm}
      />
    </div>
  );
}

export default EmployeeCheckOut;

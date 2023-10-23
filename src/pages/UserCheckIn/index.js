import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';

function UserCheckIn() {
  const [scannerResult, setScannerResult] = useState(null);

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
  return (
    <div>
      <h1>QR Check In Scanning</h1>
      {scannerResult ? <div>Success: {scannerResult}</div> : <div id="reader"></div>}
    </div>
  );
}

export default UserCheckIn;

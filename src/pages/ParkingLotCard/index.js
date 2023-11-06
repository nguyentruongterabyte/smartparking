/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

import Modal from '~/components/Modal';
import config from '~/config';
import hooks from '~/hooks';
import Image from '~/components/Image';

function ParkingLotCard() {
  const axiosPrivate = hooks.useAxiosPrivate();
  const id = hooks.useLocalStorage('parkingLotId')[0];
  let parkingLot;

  useEffect(() => {
    // fetch api parking lot information by id
    const response = axiosPrivate.post(config.constants.PARKING_LOTS_URL, JSON.stringify({ id }));

    response.then((res) => {
      parkingLot = res.data?.object;
      // console.log(parkingLot);
    });
  }, []);

  return (
    <Modal>
      <Card>
        {/* <Card.Img
          variant="top"
          src={parkingLot?.images?.length > 0 ? `data:image/jpeg:base64,${parkingLot.images[0]}` : ''}
        /> */}
      </Card>
    </Modal>
  );
}

export default ParkingLotCard;

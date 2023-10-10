import { useState, useEffect } from 'react';
import config from '~/config';
import hooks from '~/hooks';

function ParkingLots() {
  const [ParkingLots, setParkingLots] = useState();
  const axiosPrivate = hooks.useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getParkingLots = async () => {
      try {
        const response = await axiosPrivate.get(config.constants.PARKING_LOTS_URL, {
          signal: controller.signal,
        });
        isMounted && setParkingLots(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getParkingLots();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h1>ParkingLots List</h1>
      {ParkingLots?.length ? (
        <ul>
          {ParkingLots.map((parkingLot) => (
            <li key={parkingLot?.id}>{parkingLot?.parkingLotName} </li>
          ))}
        </ul>
      ) : (
        <p>No ParkingLots to display</p>
      )}
    </article>
  );
}

export default ParkingLots;

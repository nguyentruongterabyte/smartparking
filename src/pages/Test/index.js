import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

function Test() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDNI_ZWPqvdS6r6gPVO50I4TlYkfkZdXh8',
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

export default Test;

function Map() {
  return (
    <GoogleMap zoom={10} center={{ lat: 10.848022, lng: 106.786449 }} mapContainerClassName="map-container"></GoogleMap>
  );
}

import { useJsApiLoader } from '@react-google-maps/api';
import config from '~/config';

function Test() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: config.constants.GOOGLE_MAP_API_KEYS,
  });

  if (!isLoaded) {
    console.log('Failed');
  }
  return;
}

export default Test;

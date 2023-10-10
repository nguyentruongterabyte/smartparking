import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import Error from '~/components/Error';
function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return <Error errorCode={401} message="You do not have access to the requested page." goBack={() => goBack()} />;
}

export default Unauthorized;

import { Link } from 'react-router-dom';
import config from '~/config';
const Missing = () => {
  return (
    <article style={{ padding: '100px' }}>
      <h1>Oops!</h1>
      <p>Page Not Found</p>
      <div className="flexGrow">
        <Link to={config.routes.home}>Visit Our Homepage</Link>
      </div>
    </article>
  );
};

export default Missing;

import { useLocation, Navigate, Outlet } from 'react-router-dom';
import hooks from '~/hooks';
import config from '~/config';

function RequireAuth() {
  const { auth } = hooks.useAuth();
  const location = useLocation();

  return auth?.user ? <Outlet /> : <Navigate to={config.routes.login} state={{ from: location }} replace />;
}

export default RequireAuth;

import { useLocation, Navigate, Outlet } from 'react-router-dom';
import hooks from '~/hooks';
import config from '~/config';

function RequireAuth({ allowedRoles }) {
  const { auth } = hooks.useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to={config.routes.unauthorized} state={{ from: location }} replace />
  ) : (
    <Navigate to={config.routes.login} state={{ from: location }} replace />
  );
}

export default RequireAuth;

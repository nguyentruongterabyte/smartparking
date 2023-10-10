import { useLocation, Navigate, Outlet } from 'react-router-dom';
import hooks from '~/hooks';
import config from '~/config';

function RequireAuth({ allowedRoles }) {
  const { auth } = hooks.useAuth();
  const location = useLocation(); // get the current location from the React Router

  return allowedRoles?.includes(auth?.role) ? (
    // Check if the user's role is included in the allowedRoles
    <Outlet />
  ) : auth?.accessToken ? ( // changed from user to accessToken to persist login after refresh
    // The 'replace' prop is used to replace the current URL in the browser with the new URL
    <Navigate to={config.routes.unauthorized} state={{ from: location }} replace />
  ) : (
    // If both conditions in step 1 and step 2 are 'false', it means
    // the user is not authorized. In this case, render <Navigate />
    // to redirect the user to a login page
    <Navigate to={config.routes.login} state={{ from: location }} replace />
  );
}

export default RequireAuth;

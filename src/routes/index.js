import config from '~/config';

import { layouts } from '~/layouts';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Unauthorized from '~/pages/Unauthorized';

const ROLES = config.constants.ROLES;

// public routes
const publicRoutes = [
  { path: config.routes.login, component: Login, layout: layouts.LoginLayout },
  { path: config.routes.logout, component: Login, layout: layouts.LoginLayout },
  { path: config.routes.unauthorized, component: Unauthorized, layout: null },
  // any more
];

// private routes
const privateRoutes = [
  {
    path: config.routes.home,
    component: Home,
    allowedRoles: [ROLES.admin, ROLES.merchant, ROLES.employee, ROLES.user],
  },
];
export { publicRoutes, privateRoutes };

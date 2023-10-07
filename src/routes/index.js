import config from '~/config';

import { layouts } from '~/layouts';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Unauthorized from '~/pages/Unauthorized';
import Admin from '~/pages/Admin';

const ROLES = config.constants.ROLES;

// public routes
const publicRoutes = [
  { path: config.routes.login, component: Login, layout: layouts.LoginLayout },
  { path: config.routes.unauthorized, component: Unauthorized, layout: null },
  { path: config.routes.home, component: Home },
  // any more
];

// private routes
const privateRoutes = [
  // {
  //   path: config.routes.home,
  //   component: Home,
  //   allowedRoles: [ROLES.admin, ROLES.merchant, ROLES.employee, ROLES.user],
  // },
  {
    path: config.routes.admin,
    component: Admin,
    allowedRoles: [ROLES.admin],
  },
];
export { publicRoutes, privateRoutes };

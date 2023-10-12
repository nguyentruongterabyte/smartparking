import config from '~/config';

import { layouts } from '~/layouts';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Unauthorized from '~/pages/Unauthorized';
import Admin from '~/pages/Admin';
import Merchant from '~/pages/Merchant';
import Accounts from '~/pages/Accounts';

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
  {
    path: config.routes.homeHasLoggedIn,
    component: Home,
    allowedRoles: [ROLES.admin, ROLES.merchant, ROLES.employee, ROLES.user],
    layout: layouts.HasSideBarLayout,
  },
  {
    path: config.routes.admin,
    component: Admin,
    allowedRoles: [ROLES.admin],
    layout: layouts.HasSideBarLayout,
  },
  {
    path: config.routes.merchant,
    component: Merchant,
    allowedRoles: [ROLES.admin, ROLES.merchant],
    layout: layouts.HasSideBarLayout,
  },
  {
    path: config.routes.accounts,
    component: Accounts,
    allowedRoles: [ROLES.admin],
    layout: layouts.HasSideBarLayout,
  },
];
export { publicRoutes, privateRoutes };

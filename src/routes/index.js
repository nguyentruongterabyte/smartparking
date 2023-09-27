import config from '~/config';

import { layouts } from '~/layouts';
import Home from '~/pages/Home';
import Login from '~/pages/Login';

console.log(layouts);
// public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: Login, layout: layouts.LoginLayout },
  // any more
];

// private routes
const privateRoutes = [];
export { publicRoutes, privateRoutes };

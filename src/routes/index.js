import config from '~/config';

import { layouts } from '~/layouts';
import Home from '~/pages/Home';
import LoginPage from '~/pages/LoginPage';

console.log(layouts);
// public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: LoginPage, layout: layouts.LoginLayout },
  // any more
];

// private routes
const privateRoutes = [];
export { publicRoutes, privateRoutes };

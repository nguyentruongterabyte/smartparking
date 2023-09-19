import config from '~/config';

import Home from '~/pages/Home';
import Login from '~/pages/Login';

// public routes
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: Login },
  // any more
];

// private routes
const privateRoutes = [];
export { publicRoutes, privateRoutes };

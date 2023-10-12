import icons from '~/assets/icons';
import routes from './routes';

export const APP_NAME = 'ConvenientParking';
export const END_USER_BASE_URL = '';
export const APP_ID = 999888;
// Server base url
export const SERVER_BASE_URL = 'http://localhost:8080/';

// Login api url
export const LOGIN_URL = 'api/auth/login';
// Logout api url
export const LOGOUT_URL = 'api/auth/logout';
// Refresh token url
export const REFRESH_URL = 'api/auth/refresh';
// Get parking lots url
export const PARKING_LOTS_URL = 'api/parkingLots';

// Menu sidebar
export const SIDEBAR_ADMIN_MENU = [
  {
    path: routes.homeHasLoggedIn,
    name: 'Trang chủ',
    icon: icons.faHome,
  },
  {
    path: routes.accounts,
    name: 'Tài khoản',
    icon: icons.faUser,
  },
  {
    path: routes.parkingLots,
    name: 'Bãi đỗ xe',
    icon: icons.faParking,
  },
];

export const SIDEBAR_MERCHANT_MENU = [
  {
    path: routes.homeHasLoggedIn,
    name: 'Trang chủ',
    icon: icons.faHome,
  },
  {
    path: routes.parkingLots,
    name: 'Bãi đỗ xe',
    icon: icons.faParking,
  },
];

export const SIDEBAR_USER_MENU = [
  {
    path: routes.homeHasLoggedIn,
    name: 'Trang chủ',
    icon: icons.faHome,
  },
  {
    path: routes.parkingLots,
    name: 'Bãi đỗ xe',
    icon: icons.faParking,
  },
];

export const SIDEBAR_EMPLOYEE_MENU = [
  {
    path: routes.homeHasLoggedIn,
    name: 'Trang chủ',
    icon: icons.faHome,
  },
  {
    path: routes.parkingLots,
    name: 'Bãi đỗ xe',
    icon: icons.faParking,
  },
];

// Roles
export const ROLES = {
  admin: 52456,
  merchant: 40152,
  employee: 20002,
  user: 30001,
};

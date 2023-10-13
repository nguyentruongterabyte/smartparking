import icons from '~/assets/icons';
import routes from './routes';

export const APP_NAME = 'Convenient Parking';
export const END_USER_BASE_URL = '';
export const APP_ID = 999888;
// Server base url
// http://localhost:8080/
export const SERVER_BASE_URL = 'http://localhost:8080/';

// Login api url
export const LOGIN_URL = 'api/auth/login';
// Logout api url
export const LOGOUT_URL = 'api/auth/logout';
// Refresh token url
export const REFRESH_URL = 'api/auth/refresh';
// Register api url
export const REGISTER_URL = 'api/auth/register';
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

// Regex pattern
export const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
export const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

// Roles
export const ROLES = {
  admin: 52456,
  merchant: 40152,
  employee: 20002,
  user: 30001,
};

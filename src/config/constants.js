import icons from '~/assets/icons';
import routes from './routes';

export const APP_NAME = 'Convenient Parking';
export const END_USER_BASE_URL = '';
export const APP_ID = 999888;
// Server base url
//https://5e05-116-110-43-56.ngrok-free.app
export const SERVER_BASE_URL = 'https://e346-116-110-40-98.ngrok-free.app';
// Login api url
export const LOGIN_URL = 'api/auth/login';
// Logout api url
export const LOGOUT_URL = 'api/auth/logout';
// Refresh token url
export const REFRESH_URL = 'api/auth/refresh';
// Register api url
export const REGISTER_URL = 'api/auth/register';
// Get parking lots url
export const PARKING_LOTS_URL = 'api/parkinglot';
// Search parking lot url
export const SEARCHING_LOTS_URL = 'api/parkinglot/search';
// Send email verification url
export const EMAIL_VERIFICATION_URL = 'api/auth/verification';
// Get parking lot id by username url
export const PARKING_LOT_ID_BY_USERNAME_URL = 'api/employee/parkinglot-by-username';
// Get information by username url
export const USER_INFO_URL = 'api/user/information';
// Get merchant information by username url
export const MERCHANT_INFO_URL = 'api/merchant/information';

// Account menu items
export const ACCOUNT_MENU_ITEMS = [
  {
    icon: icons.faEarthAsia,
    title: 'Tiếng việt',
    children: {
      title: 'Ngôn ngữ',
      data: [
        {
          title: 'English',
          type: 'language',
          code: 'en',
          separate: true,
        },
        {
          title: 'Tiếng Việt',
          type: 'language',
          code: 'vi',
        },
      ],
    },
  },
  {
    icon: icons.faKeyboard,
    title: 'Phím tắt',
  },
  {
    icon: icons.faAddressCard,
    title: 'Hồ sơ của tôi',
    type: 'viewProfile',
  },
  {
    icon: icons.faCircleQuestion,
    title: 'Phản hồi và trợ giúp',
    to: '/feedback',
  },
  {
    icon: icons.faRightFromBracket,
    title: 'Đăng xuất',
    type: 'logout',
    separate: true,
  },
];

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
    path: routes.parkingLotsManager,
    name: 'Bãi đỗ xe',
    icon: icons.faParking,
  },
  {
    path: routes.merchant,
    name: 'Merchant',
    icon: icons.faStore,
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
  {
    path: routes.userCheckIn,
    name: 'Check in',
    icon: icons.faQrcode,
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
  {
    path: routes.employeeCheckIn,
    name: 'Check In',
    icon: icons.faQrcode,
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

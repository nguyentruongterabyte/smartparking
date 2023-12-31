import config from '~/config';

import { layouts } from '~/layouts';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Unauthorized from '~/pages/Unauthorized';
import Admin from '~/pages/Admin';
import Merchant from '~/pages/Merchant';
import Accounts from '~/pages/Accounts';
import Register from '~/pages/Register';
import Verification from '~/pages/Verification';
import VerificationRequest from '~/pages/VerificationRequest';
import Profile from '~/pages/Profile';
import Test from '~/pages/Test';
import UserCheckIn from '~/pages/UserCheckIn';
import UserCheckOut from '~/pages/UserCheckOut';
import EmployeeCheckIn from '~/pages/EmployeeCheckIn';
import EmployeeCheckOut from '~/pages/EmployeeCheckOut';
import ParkingLotsManager from '~/pages/ParkingLotsManager';
import ParkingLots from '~/pages/ParkingLots';
import ParkingLotCard from '~/pages/ParkingLotCard';

import { SearchParkingLotByMerchantId, SearchParkingLot } from '~/components/Search';

const ROLES = config.constants.ROLES;

// public routes
const publicRoutes = [
  { path: config.routes.login, component: Login, layout: layouts.LoginLayout },
  { path: config.routes.unauthorized, component: Unauthorized, layout: null },
  { path: config.routes.home, component: Home },
  { path: config.routes.register, component: Register, layout: layouts.LoginLayout },
  { path: config.routes.verification, component: Verification, layout: layouts.LoginLayout },
  { path: config.routes.verificationRequest, component: VerificationRequest, layout: layouts.LoginLayout },
  { path: config.routes.test, component: Test, layout: layouts.HasSideBarLayout },
  // any more
];

// private routes
const privateRoutes = [
  // {
  //   path: config.routes.test,
  //   component: Test,
  //   allowedRoles: [ROLES.admin, ROLES.merchant, ROLES.employee, ROLES.user],
  //   layout: layouts.HasSideBarLayout,
  // },
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
  {
    path: config.routes.profile,
    component: Profile,
    allowedRoles: [ROLES.admin, ROLES.user, ROLES.employee, ROLES.merchant],
    layout: layouts.HasSideBarLayout,
  },
  {
    path: config.routes.userCheckIn,
    component: UserCheckIn,
    allowedRoles: [ROLES.user],
    layout: layouts.HasSideBarLayout,
  },
  {
    path: config.routes.userCheckOut,
    component: UserCheckOut,
    allowedRoles: [ROLES.user],
    layout: layouts.HasSideBarLayout,
  },
  {
    path: config.routes.employeeCheckIn,
    component: EmployeeCheckIn,
    allowedRoles: [ROLES.employee],
    layout: layouts.HasSideBarLayout,
  },
  {
    path: config.routes.employeeCheckOut,
    component: EmployeeCheckOut,
    allowedRoles: [ROLES.employee],
    layout: layouts.HasSideBarLayout,
  },
  {
    path: config.routes.parkingLotsManager,
    component: ParkingLotsManager,
    allowedRoles: [ROLES.merchant],
    layout: layouts.HasSideBarLayout,
    headerSearch: SearchParkingLotByMerchantId,
  },
  {
    path: config.routes.parkingLots,
    component: ParkingLots,
    allowedRoles: [ROLES.user],
    layout: layouts.HasSideBarLayout,
    headerSearch: SearchParkingLot,
  },
  {
    path: config.routes.parkingLotCard,
    component: ParkingLotCard,
    allowedRoles: [ROLES.user, ROLES.merchant],
    layout: layouts.HasSideBarLayout,
    headerSearch: SearchParkingLot,
  },
];
export { publicRoutes, privateRoutes };

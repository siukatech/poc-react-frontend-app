import ProtectedResource from './components/ProtectedResource';

import { IUser, IUserPermission } from './models';

import Login from './pages/Login';
import Logout from './pages/Logout';

import {
  restoreTokens,
  restoreUser,
  saveTokens,
  saveUser,
  doAuthLogin,
  doRefreshToken,
  doAuthLogout,
  doCheckTimeout,
  doCheckPermissionByRegex,
  // doCheckPermissionByMap,
  DoAuthLoginPayload,
} from './services/LoginService';

import AuthContext, { AuthContextProvider } from './stores/AuthContext';

export {
  ProtectedResource,
  Login,
  Logout,
  restoreTokens,
  restoreUser,
  saveTokens,
  saveUser,
  doAuthLogin,
  doRefreshToken,
  doAuthLogout,
  doCheckTimeout,
  doCheckPermissionByRegex,
  AuthContext,
  AuthContextProvider,
};
export type { IUser, IUserPermission, DoAuthLoginPayload };

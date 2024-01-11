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
  STORAGE_KEY_TOKENS,
  STORAGE_KEY_USER,
} from './services/LoginService';

import AuthContext, { AuthContextProvider, useAuthContext } from './stores/AuthContext';

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
  useAuthContext,
  STORAGE_KEY_TOKENS,
  STORAGE_KEY_USER,
};
export type { IUser, IUserPermission, DoAuthLoginPayload };

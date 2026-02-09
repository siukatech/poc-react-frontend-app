
import ProtectedResource, {
  ProtectedResourceAccessBy, ProtectedResourceDisplayType
} from './components/ProtectedResource';

import { AuthContext, AuthContextObj } from './contexts/AuthContext';
import { AuthContextProvider } from './contexts/AuthContextProvider';

import { useAuthContext } from './hooks/useAuthContext';
import { useLoginService } from './hooks/useLoginService';

import { 
  IUser, 
  IUserPermission, 
  DoAuthLoginPayload,
  STORAGE_KEYS, 
  STORAGE_KEY_TOKENS, 
  STORAGE_KEY_USER,
} from './models';

import { LoginService, DoCheckPermissionByRegex } from './services/LoginService';

import authSliceReducer, {
  authSlice,
  bindAuth,
  clearAuth,
  selectAuthUser,
  useAuthSelector
} from './stores/authSlice';

export type {
  IUser, 
  IUserPermission, 
  DoAuthLoginPayload, 
  AuthContextObj, 
  LoginService,
  DoCheckPermissionByRegex,
}
export {
  ProtectedResource,
  ProtectedResourceAccessBy,
  ProtectedResourceDisplayType,
  AuthContext,
  AuthContextProvider,
  useAuthContext,
  useLoginService,
  authSliceReducer,
  authSlice,
  bindAuth,
  clearAuth,
  selectAuthUser,
  useAuthSelector,
  STORAGE_KEYS, 
  STORAGE_KEY_TOKENS, 
  STORAGE_KEY_USER,
}

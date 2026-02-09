import { AxiosError } from "axios";
import { IUser } from "../models";
import { createContext } from "react";
import { DoCheckPermissionByRegex as DoCheckPermission } from '../services/LoginService';

type AuthContextObj = {
  user?: IUser;
  // doLogin: (payload: DoAuthLoginPayload) => void;
  doLogout: () => void;
  checkTimeout: () => void;
  checkPermission: DoCheckPermission;
  postLogin: (user?: IUser) => void;
  timeoutErr?: AxiosError;
};

const AuthContext = createContext<AuthContextObj>({
  // user: undefined,
  // doLogin: () => {},
  doLogout: () => {},
  checkTimeout: () => {},
  checkPermission: () => false,
  postLogin: () => {},
  // timeoutErr: AxiosError,
});

export type {
  AuthContextObj
}
export {
  AuthContext
}

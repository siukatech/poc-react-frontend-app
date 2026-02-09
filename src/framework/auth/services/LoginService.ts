import { IUser, IUserPermission, DoAuthLoginPayload } from "../models";
import { restoreJsonStr, saveJsonObj } from '../../utils/storage';

interface DoCheckPermissionByRegex {
  (
    user: undefined | IUser,
    resourceName: undefined | string,
    accessRights: undefined | string | string[]
  ): boolean;
}

interface LoginService {
  getStorageKeyTokens(): string;
  restoreTokens(): any;
  restoreUser(): IUser;
  saveTokens(tokens: any): void;
  saveUser(user: IUser): void;
  clearStorageItems(): void;
  composePermissionPhrase(
    appResourceId: string,
    accessRight: string
  ): string;
  parseResourceName(resourceName: string): string[];
  marshalPermissions(userPermissions: IUserPermission[]): any;
  refreshUserInfo(user: any): Promise<void>;
  doCheckTimeout(): Promise<any>;
  doAuthLogin(payload: DoAuthLoginPayload): Promise<IUser>;
  doRefreshToken(): Promise<any>;
  doAuthLogout(): Promise<void>;
  getAuthLoginUrl(): string;
  doAuthToken(code: string): Promise<IUser>;
  doCheckPermissionByRegex: DoCheckPermissionByRegex;
  // doCheckPermissionByMap(
  //   user: undefined | IUser,
  //   resourceName: undefined | string,
  //   accessRights: undefined | string | string[]
  // ): boolean

}

export type {
  LoginService
  , DoCheckPermissionByRegex
}

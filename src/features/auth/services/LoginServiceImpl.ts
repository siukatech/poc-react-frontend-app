
import jwt_decode from 'jwt-decode';
import CryptoJS from 'crypto-js';
import Randomstring from 'randomstring';
import { uuidv4 } from 'uuidv7';
import axios, { AxiosError } from 'axios';
import { 
  // User, 
  // UserPermission, 
  // DoAuthLoginPayload,
  // LoginService,
  // DoCheckPermissionByRegex,
  STORAGE_KEYS, 
  STORAGE_KEY_TOKENS, 
  STORAGE_KEY_USER,
  AbstractLoginService,
} from '../../../core/auth';
import type { 
  User, 
  UserPermission, 
  DoAuthLoginPayload,
  LoginService,
  DoCheckPermissionByRegex,
} from '../../../core/auth';
import { axiosService } from '../../../core/axios';
import {
  restoreJsonStr,
  restoreRawStr,
  saveJsonObj,
  saveRawStr,
} from '../../../core/utils';
import { base64URLEncode } from '../../../core/utils';
import { envConfig } from '../../../core/config';


// const APP_NAME = envConfig.APP_NAME as string;

const API_MY_USER_INFO: string =
  (envConfig.API_PATH_MY_PREFIX as string) +
  (envConfig.API_PATH_V1_PROTECTED as string) +
  (envConfig.API_PATH_MY_USER_INFO as string);

const API_MY_PERMISSION_INFO: string =
  (envConfig.API_PATH_MY_PREFIX as string) +
  (envConfig.API_PATH_V1_PROTECTED as string) +
  (envConfig.API_PATH_MY_PERMISSION_INFO as string);

const API_OAUTH_AUTHORIZE: string =
  (envConfig.API_PATH_MY_PREFIX as string) +
  (envConfig.API_PATH_V1_PUBLIC as string) +
  (envConfig.API_OAUTH_AUTHORIZE as string);

const API_OAUTH_REFRESH_TOKEN: string =
  (envConfig.API_PATH_MY_PREFIX as string) +
  (envConfig.API_PATH_V1_PUBLIC as string) +
  (envConfig.API_OAUTH_REFRESH_TOKEN as string);

const API_OAUTH_LOGOUT: string =
  (envConfig.API_PATH_MY_PREFIX as string) +
  (envConfig.API_PATH_V1_PUBLIC as string) +
  (envConfig.API_OAUTH_LOGOUT as string);

const API_OAUTH_TOKEN: string =
  (envConfig.API_PATH_MY_PREFIX as string) +
  (envConfig.API_PATH_V1_PUBLIC as string) +
  (envConfig.API_OAUTH_TOKEN as string);


class LoginServiceImpl extends AbstractLoginService {

  getStorageKeyTokens(): string {
    const [STORAGE_KEY_TOKENS, STORAGE_KEY_USER] = STORAGE_KEYS;
    return STORAGE_KEY_TOKENS;
  }
  getStorageKeyUser(): string {
    return STORAGE_KEY_USER;
  }
  getStorageKeys(): string[] {
    return STORAGE_KEYS;
  }
  getApiMyUserInfo(): string {
    return API_MY_USER_INFO;
  }
  getApiMyPermissionInfo(): string {
    return API_MY_PERMISSION_INFO;
  }
  getAppName(): string {
    return envConfig.APP_NAME;
  }
  getApiOauthAuthorize(): string {
    return API_OAUTH_AUTHORIZE;
  }
  getApiOauthClientName(): string {
    return envConfig.API_OAUTH_CLIENT_NAME as string;
  }
  getApiOauthRefreshToken(): string {
    return API_OAUTH_REFRESH_TOKEN;
  }
  getApiOauthLogout(): string {
    return API_OAUTH_LOGOUT;
  }
  getApiOauthToken(): string {
    return API_OAUTH_TOKEN;
  }

  // async getUser() {
  //   return { id: "1", name: "Karl" };
  // }
}

export {
  LoginServiceImpl
}

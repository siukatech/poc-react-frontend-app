import jwt_decode from 'jwt-decode';
import axios, { AxiosError } from 'axios';
import axiosService from '../../../frameworks/axios/services/axios-service';
import { restoreJsonStr, saveJsonObj } from '../../../frameworks/app/utils/storage';
import { IUser, IUserPermission } from '../models';

const APP_NAME = process.env.REACT_APP_APP_NAME as string;

const STORAGE_KEYS = ['tokens', 'user'];
const [STORAGE_KEY_TOKENS, STORAGE_KEY_USER] = STORAGE_KEYS;

const API_MY_USER_INFO: string =
  (process.env.REACT_APP_API_PATH_PREFIX as string) +
  (process.env.REACT_APP_API_PATH_V1_PROTECTED as string) +
  (process.env.REACT_APP_API_PATH_MY_USER_INFO as string);

const API_MY_USER_PERMISSIONS: string =
  (process.env.REACT_APP_API_PATH_PREFIX as string) +
  (process.env.REACT_APP_API_PATH_V1_PROTECTED as string) +
  (process.env.REACT_APP_API_PATH_MY_PERMISSIONS as string);

const API_API_OAUTH_AUTHORIZE: string =
  (process.env.REACT_APP_API_PATH_PREFIX as string) +
  (process.env.REACT_APP_API_PATH_V1_PUBLIC as string) +
  (process.env.REACT_APP_API_OAUTH_AUTHORIZE as string);

const API_API_OAUTH_REFRESH_TOKEN: string =
  (process.env.REACT_APP_API_PATH_PREFIX as string) +
  (process.env.REACT_APP_API_PATH_V1_PUBLIC as string) +
  (process.env.REACT_APP_API_OAUTH_REFRESH_TOKEN as string);

const API_API_OAUTH_LOGOUT: string =
  (process.env.REACT_APP_API_PATH_PREFIX as string) +
  (process.env.REACT_APP_API_PATH_V1_PUBLIC as string) +
  (process.env.REACT_APP_API_OAUTH_LOGOUT as string);

const restoreTokens = () => {
  return restoreJsonStr(STORAGE_KEY_TOKENS);
};
const restoreUser = () => {
  // if (sessionStorage.getItem('tokens')) {
  //   let tokens = JSON.parse(sessionStorage.getItem('tokens'));
  //   return jwt_decode(tokens.access_token);
  // }
  const user = restoreJsonStr(STORAGE_KEY_USER);
  console.debug(`restoreUser, user: `, user);
  return user;
};

const saveTokens = (tokens: {}) => {
  saveJsonObj(STORAGE_KEY_TOKENS, tokens);
};
const saveUser = (user: {}) => {
  saveJsonObj(STORAGE_KEY_USER, user);
};
const clearStorageItems = () => {
  for (const storageKey of STORAGE_KEYS) {
    sessionStorage.removeItem(storageKey);
  }
};

const composePermissionPhrase = (
  resourceMid: string,
  accessRight: string
): string => {
  const permissionPhrase = `${resourceMid}:${accessRight}`;
  return permissionPhrase;
};

const parseResourceName = (resourceName: string): string[] => {
  const resourceParts = resourceName.split('.');
  return resourceParts;
};

const marshalPermissions = (userPermissions: IUserPermission[]) => {
  let permissions: any = {};
  for (let ppp = 0; ppp < userPermissions.length; ppp++) {
    const userPermission = userPermissions[ppp];
    const permissionPhrase = composePermissionPhrase(
      userPermission.resourceMid,
      userPermission.accessRight
    );
    // const resourceParts = parseResourceName(userPermission.resourceMid);
    // permissions[resourceParts[0]] =
    //   permissions[resourceParts[0]] == null
    //     ? {}
    //     : permissions[resourceParts[0]];
    // permissions[resourceParts[0]][permissionPhrase] = userPermission;
    permissions[userPermission.appMid] =
      permissions[userPermission.appMid] == null
        ? {}
        : permissions[userPermission.appMid];
    permissions[userPermission.appMid][permissionPhrase] = userPermission;
  }
  return permissions;
};

const refreshUserInfo = async (user: any) => {
  try {
    if (user != null) {
      //
      // tokens MUST be saved to the sessionStorage before my-user-info api called
      // extract the result.data and rename to myUserInfo
      const { data: myUserInfo } = await axiosService.get(API_MY_USER_INFO);
      // const myUserInfo = myUserInfoRes.data;
      //
      const { data: myUserPermissions } = await axiosService.get(
        API_MY_USER_PERMISSIONS
      );
      for (const key in myUserInfo) {
        user[key] = myUserInfo[key];
      }
      user['permissions'] = marshalPermissions(myUserPermissions);
      saveUser(user);
    } else {
      new AxiosError('Invalid login', AxiosError.ERR_BAD_REQUEST);
    }
  } catch (err) {
    console.error(`LoginService - refreshUserInfo - err: `, err);
    clearStorageItems();
    throw err;
  }
};

const doCheckTimeout = async () => {
  const tokens = restoreTokens();
  // console.debug('LoginService - doCheckTimeout - start - tokens: ', tokens);
  if (tokens != null) {
    try {
      let user = restoreUser();
      await refreshUserInfo(user);
      user = restoreUser();
    } catch (err) {
      // console.error('LoginService - doCheckTimeout - err: ', err);
      // clearStorageItems();
      // throw new AxiosError('Login timeout', AxiosError.ERR_CANCELED);
      // return Promise.reject(new AxiosError('Login timeout', AxiosError.ERR_CANCELED));
      return new AxiosError('Login timeout', AxiosError.ERR_CANCELED);
    }
  } else {
    // clearStorageItems();
    // throw new AxiosError('Access denied', AxiosError.ERR_BAD_REQUEST);
    // return Promise.reject(new AxiosError('Access denied', AxiosError.ERR_BAD_REQUEST));
    return new AxiosError('Access denied', AxiosError.ERR_BAD_REQUEST);
  }
  // console.debug('LoginService - doCheckTimeout - end');
};

type DoAuthLoginPayload = {
  username?: string;
  password?: string;
};

const doAuthLogin = async (payload: DoAuthLoginPayload): Promise<IUser> => {
  let oauthAuthorizeApi = API_API_OAUTH_AUTHORIZE;

  // oauthAuthorizeApi += '/realms/react-backend-realm/protocol/openid-connect/token?client_id={client_id}&redirect_uri=http://localhost:3000/redirect&grant_type={grant_type}&code_verifier=${codeVerifier}&method=SHA-256';
  oauthAuthorizeApi = oauthAuthorizeApi.replace(
    '{0}',
    process.env.REACT_APP_API_OAUTH_CLIENT_NAME as string
  );
  // console.debug(
  //   'LoginService - doAuthLoginToStorage - oauthAuthorizeApi: [' +
  //     oauthAuthorizeApi +
  //     ']'
  // );
  const apiResponse = await axios.post(oauthAuthorizeApi, payload);
  const tokens = apiResponse.data;
  saveTokens(tokens);
  // console.debug('LoginService - doAuthLoginToStorage - tokens: ', tokens);
  //
  let user: any = jwt_decode(tokens.access_token);
  await refreshUserInfo(user);
  user = restoreUser();
  return user;
};

const doRefreshToken = async (): Promise<any> => {
  const tokens = restoreTokens();
  const payload = {
    access_token: tokens?.access_token,
    refresh_token: tokens?.refresh_token,
  };

  let oauthRefreshTokenApi = API_API_OAUTH_REFRESH_TOKEN;
  oauthRefreshTokenApi = oauthRefreshTokenApi.replace(
    '{0}',
    process.env.REACT_APP_API_OAUTH_CLIENT_NAME as string
  );
  // console.debug(
  //   'LoginService - doRefreshToken - oauthRefreshTokenApi: [' +
  //     oauthRefreshTokenApi +
  //     ']'
  // );
  try {
    const apiResponse = await axios.post(oauthRefreshTokenApi, payload);
    // console.debug('LoginService - doRefreshToken - apiResponse: ', apiResponse);
    const tokensRefreshed = apiResponse.data;
    // console.debug(
    //   'LoginService - doRefreshToken - tokensRefreshed 1: ',
    //   tokensRefreshed
    // );
    saveTokens(tokensRefreshed);
    // console.debug(
    //   'LoginService - doRefreshToken - tokensRefreshed 2: ',
    //   tokensRefreshed
    // );
    return tokensRefreshed;
  } catch (err) {
    console.error('LoginService - doRefreshToken - err: ', err);

    clearStorageItems();

    // return err as AxiosError;
    throw err;
  }
};

const doAuthLogout = async (): Promise<void> => {
  // console.debug('LoginService - doAuthLogout - start');
  const tokens = restoreTokens();
  if (tokens != null) {
    try {
      let apiResponse = await axios.post(
        API_API_OAUTH_LOGOUT,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        }
      );
      // console.debug('LoginService - doAuthLogout - apiResponse: ', apiResponse);
      clearStorageItems();
    } catch (err) {
      // console.debug('LoginService - doAuthLogout - err: ', err);
      clearStorageItems();
    }
  }
};

/**
 * @description using iteration of the userPermissions' keys, performance will be an issue.
 * this is because the total number of userPermission depends on the permission granted of user, no guarantee.
 * so there is a split to group the userPermission by resourcePart[0], e.g. application.xxx.yyy, 'application' is the group.
 *
 * @example <caption>Test code of regex template 1.</caption>
 * // true
 * const regexTmpl = `ip-enduser-app.*.submissions:*`
 * .replaceAll(`.`, `\\.`)
 * .replaceAll(`*`, `[\\w\\W]+`);
 * const regexTester = new RegExp(regexTmpl, 'g');
 * const regexResult = regexTester.test('ip-enduser-app.mainMeun.submissions:view');
 * console.debug(`regexTmpl: [${regexTmpl}], regexResult: [${regexResult}]`);
 * @example <caption>Test code of regex template 2.</caption>
 * // false
 * const regexTmpl = `ip-enduser-app.*.submissions:create`
 * .replaceAll(`.`, `\\.`)
 * .replaceAll(`*`, `[\\w\\W]+`);
 * const regexTester = new RegExp(regexTmpl, 'g');
 * const regexResult = regexTester.test('ip-enduser-app.mainMeun.submissions:view');
 * console.debug(`regexTmpl: [${regexTmpl}], regexResult: [${regexResult}]`);
 *
 * @param user
 * @param resourceName
 * @param accessRights
 * @returns
 */
const doCheckPermissionByRegex = (
  user: undefined | IUser,
  resourceName: undefined | string,
  accessRights: undefined | string | string[]
): boolean => {
  let hasPermission = false;
  if (user != null && resourceName != null && accessRights != null) {
    accessRights =
      typeof accessRights === 'string' ? [accessRights] : accessRights;
    const matchedPermissions: any[] = [];
    for (let ccc = 0; ccc < accessRights.length; ccc++) {
      const accessRight = accessRights[ccc];
      const resourcePhrase = composePermissionPhrase(resourceName, accessRight); // e.g. 'application.group.item:view'
      const userPermissions = user.permissions == null ? {} : user.permissions;
      // for...in - array
      // for...of - object
      // const resourceParts = parseResourceName(resourceName);
      // const resourcePartPermissions =
      //   userPermissions[resourceParts[0]] == null
      //     ? {}
      //     : userPermissions[resourceParts[0]];
      const resourcePartPermissions =
        userPermissions[APP_NAME] == null ? {} : userPermissions[APP_NAME];
      // console.debug(
      //   `LoginService - doCheckPermissionByRegex - APP_NAME: [${APP_NAME}], resourceName: [${resourceName}], accessRight: [${accessRight}], resourcePartPermissions: `,
      //   resourcePartPermissions
      // );
      for (const permissionPhrase in resourcePartPermissions) {
        const userPermission = resourcePartPermissions[permissionPhrase];
        const regexTmpl = permissionPhrase
          .replaceAll(`.`, `\\.`)
          .replaceAll(`*`, `[\\w\\W]+`);
        const regexTester = new RegExp(regexTmpl, 'g');
        const regexResult = regexTester.test(resourcePhrase);
        // console.debug(
        //   `LoginService - doCheckPermissionByRegex - resourcePhrase: [${resourcePhrase}], regexTmpl: [${regexTmpl}], regexResult: [${regexResult}]`
        // );
        if (regexResult) {
          matchedPermissions.push({
            resourcePhrase,
            permissionPhrase,
            regexTmpl,
            userPermission,
          });
        }
      }
    }
    hasPermission = matchedPermissions.length > 0;
  }
  // console.debug(
  //   `LoginService - doCheckPermissionByRegex - hasPermission: [${hasPermission}], resourceName: [${resourceName}], accessRight: [${accessRights}]`
  // );
  return hasPermission;
};

// //parseResourceName
// const doCheckPermissionByMap = (
//   user: undefined | IUser,
//   resourceName: undefined | string,
//   accessRights: undefined | string | string[]
// ): boolean => {
//   let hasPermission = false;
//   if (user != null && resourceName != null && accessRights != null) {
//     accessRights =
//       typeof accessRights === 'string' ? [accessRights] : accessRights;
//     const matchedPermissions: any[] = [];
//     for (let ccc = 0; ccc < accessRights.length; ccc++) {
//       const accessRight = accessRights[ccc];
//       const resourcePhrase = composePermissionPhrase(resourceName, accessRight); // e.g. 'application.group.item:view'
//       const userPermissions = user.permissions == null ? {} : user.permissions;
//       // const resourceParts = parseResourceName(resourceName);
//       // 2 to the 2 power.
//       // application.group
//       // application.*
//       // *.group
//       // *.*
//       //
//       // 2 to the 3 power.
//       // application.group.item
//       // application.group.*
//       // application.*.item
//       // application.*.*
//       // *.group.item
//       // *.group.*
//       // *.*.item
//       // *.*.*
//       //
//       // 2 to the 4 power.
//       // application.type.group.item
//       // application.type.group.*
//       // application.type.*.item
//       // application.type.*.*
//       // application.*.group.item
//       // application.*.group.*
//       // application.*.*.item
//       // application.*.*.*
//       // *.type.group.item
//       // *.type.group.*
//       // *.type.*.item
//       // *.type.*.*
//       // *.*.group.item
//       // *.*.group.*
//       // *.*.*.item
//       // *.*.*.*
//       //
//       // for...in - array
//       // for...of - object
//       //
//       const resourceParts = ['application', 'menu', 'items'];
//       const possibleResourceNames = [];
//       for (let rrr1 = 0; rrr1 < resourceParts.length; rrr1++) {
//         const refinedParts1 = [];
//         const refinedParts2 = [];
//         const refinedParts3 = [];
//         const resourcePart1 = resourceParts[rrr1];
//         for (let rrr2 = 0; rrr2 < rrr1; rrr2++) {
//           const resourcePart2 = resourceParts[rrr2];
//           refinedParts1.push(resourcePart2);
//           refinedParts2.push(resourcePart2);
//           refinedParts3.push(`*`);
//         }
//         refinedParts1.push(resourcePart1);
//         refinedParts2.push(`*`);
//         refinedParts3.push(`*`);
//         for (let rrr3 = rrr1 + 1; rrr3 < resourceParts.length; rrr3++) {
//           const resourcePart3 = resourceParts[rrr3];
//           refinedParts1.push(resourcePart3);
//           refinedParts2.push(`*`);
//           refinedParts3.push(`*`);
//         }
//         possibleResourceNames.push(`${refinedParts1.join('.')}:*`);
//         possibleResourceNames.push(`${refinedParts2.join('.')}:*`);
//       }
//       console.debug(
//         `LoginService - doCheckPermissionByMap - possibleResourceNames: `,
//         possibleResourceNames
//       );

//       // const resourceParts: string[] = ['menu', 'items'];
//       // const possibleResourceNames: string[] = [];
//       // for (let rrr1 = 0; rrr1 < resourceParts.length; rrr1++) {
//       //   const refinedParts: string[] = [];
//       //   const resourcePart1 = resourceParts[rrr1];
//       //   for (let rrr2 = 0; rrr2 < rrr1; rrr2++) {
//       //     const resourcePart2 = resourceParts[rrr2];
//       //     refinedParts.push(resourcePart2);
//       //   }
//       //   refinedParts.push(`*`);
//       //   for (let rrr3 = rrr1; rrr3 < resourceParts.length; rrr3++) {
//       //     const resourcePart3 = resourceParts[rrr3];
//       //     refinedParts.push(resourcePart3);
//       //   }
//       //   possibleResourceNames.push(`${refinedParts.join('.')}:${accessRight}`);
//       //   possibleResourceNames.push(`${refinedParts.join('.')}:*`);
//       // }
//       // console.debug(`LoginService - doCheckPermissionByMap - possibleResourceNames: `, possibleResourceNames);
//     }
//     hasPermission = matchedPermissions.length > 0;
//   }
//   console.debug(
//     `LoginService - doCheckPermissionByMap - hasPermission: [${hasPermission}]`
//   );
//   return hasPermission;
// };

export {
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

  STORAGE_KEY_TOKENS, 
  STORAGE_KEY_USER,
};

export type { DoAuthLoginPayload };

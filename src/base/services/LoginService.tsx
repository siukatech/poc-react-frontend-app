import jwt_decode from 'jwt-decode';
import axios from 'axios';
import axiosService from '../axios/axios-service';

const STORAGE_KEY_TOKENS = 'tokens';
const STORAGE_KEY_USER = 'user';

const API_MY_USER_INFO: string =
  (process.env.REACT_APP_API_DOMAIN_PREFIX as string) +
  (process.env.REACT_APP_API_V1_PROTECTED_URI as string) +
  (process.env.REACT_APP_MY_USER_INFO_URI as string);

const API_OAUTH_AUTHORIZE: string =
  (process.env.REACT_APP_API_DOMAIN_PREFIX as string) +
  (process.env.REACT_APP_API_V1_PUBLIC_URI as string) +
  (process.env.REACT_APP_OAUTH_AUTHORIZE_URI as string);

const API_OAUTH_REFRESH_TOKEN: string =
  (process.env.REACT_APP_API_DOMAIN_PREFIX as string) +
  (process.env.REACT_APP_API_V1_PUBLIC_URI as string) +
  (process.env.REACT_APP_OAUTH_REFRESH_TOKEN_URI as string);

const API_OAUTH_LOGOUT: string =
  (process.env.REACT_APP_API_DOMAIN_PREFIX as string) +
  (process.env.REACT_APP_API_V1_PUBLIC_URI as string) +
  (process.env.REACT_APP_OAUTH_LOGOUT as string);

const restoreJsonStr = (storageKey: string) => {
  const jsonStr = sessionStorage.getItem(storageKey);
  if (jsonStr) {
    let jsonObj = JSON.parse(jsonStr);
    return jsonObj;
  }
  return null;
};
const restoreTokens = () => {
  return restoreJsonStr(STORAGE_KEY_TOKENS);
};
const restoreUser = () => {
  // if (sessionStorage.getItem('tokens')) {
  //   let tokens = JSON.parse(sessionStorage.getItem('tokens'));
  //   return jwt_decode(tokens.access_token);
  // }
  return restoreJsonStr(STORAGE_KEY_USER);
};

const saveJsonObj = (storageKey: string, jsonObj: {}) => {
  if (jsonObj != null) {
    sessionStorage.setItem(storageKey, JSON.stringify(jsonObj));
  }
};
const saveTokens = (tokens: {}) => {
  saveJsonObj(STORAGE_KEY_TOKENS, tokens);
};
const saveUser = (user: {}) => {
  saveJsonObj(STORAGE_KEY_USER, user);
};

type DoAuthLoginPayload = {
  username?: string;
  password?: string;
};

const doAuthLogin = async (payload: DoAuthLoginPayload): Promise<any> => {
  let oauthAuthorizeApi = API_OAUTH_AUTHORIZE;

  // oauthAuthorizeApi += '/realms/react-backend-realm/protocol/openid-connect/token?client_id={client_id}&redirect_uri=http://localhost:3000/redirect&grant_type={grant_type}&code_verifier=${codeVerifier}&method=SHA-256';
  oauthAuthorizeApi = oauthAuthorizeApi.replace(
    '{0}',
    process.env.REACT_APP_OAUTH_CLIENT_NAME as string
  );
  console.log(
    'LoginService - doAuthLoginToStorage - oauthAuthorizeApi: [' +
      oauthAuthorizeApi +
      ']'
  );
  const apiResponse = await axios.post(oauthAuthorizeApi, payload);
  const tokens = apiResponse.data;
  saveTokens(tokens);
  //
  // tokens MUST be saved to the sessionStorage before my-user-info api called
  const myUserInfoRes = await axiosService.post(API_MY_USER_INFO);
  const myUserInfo = myUserInfoRes.data;
  //
  let user: any = jwt_decode(tokens.access_token);
  console.log(
    'LoginService - doAuthLogin - user: [' +
      JSON.stringify(user) +
      '], myUserInfo: [' +
      JSON.stringify(myUserInfo) +
      ']'
  );
  for (let key in myUserInfo) {
    user[key] = myUserInfo[key];
  }
  saveUser(user);
  return user;
};

const doRefreshToken = async (): Promise<any> => {
  const tokens = restoreTokens();
  const payload = {
    access_token: tokens?.access_token,
    refresh_token: tokens?.refresh_token,
  };

  let oauthRefreshTokenApi = API_OAUTH_REFRESH_TOKEN;
  oauthRefreshTokenApi = oauthRefreshTokenApi.replace(
    '{0}',
    (process.env.REACT_APP_OAUTH_CLIENT_NAME as string)
  );
  console.log(
    'LoginService - doRefreshToken - oauthRefreshTokenApi: [' +
      oauthRefreshTokenApi +
      ']'
  );
  try {
    let apiResponse = await axios.post(oauthRefreshTokenApi, payload);
    const tokensRefreshed = apiResponse.data;
    saveTokens(tokensRefreshed);
    return tokensRefreshed;
  } catch (err) {
    console.error('LoginService - doRefreshToken - err: ', err);

    sessionStorage.removeItem(STORAGE_KEY_TOKENS);
    sessionStorage.removeItem(STORAGE_KEY_USER);

    return null;
  }
};

const doAuthLogout = async (): Promise<void> => {
  const tokens = restoreTokens();
  if (tokens != null) {
    try {
      let apiResponse = await axios.post(
        API_OAUTH_LOGOUT,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        }
      );
      console.log('LoginService - doAuthLogout - apiResponse: ', apiResponse);
    } catch (err) {
      console.log('LoginService - doAuthLogout - err: ', err);
    }
  }
  sessionStorage.removeItem(STORAGE_KEY_TOKENS);
  sessionStorage.removeItem(STORAGE_KEY_USER);
};

export {
  restoreTokens,
  restoreUser,
  saveTokens,
  saveUser,
  doAuthLogin,
  doRefreshToken,
  doAuthLogout,
};

export type {
  DoAuthLoginPayload,
}
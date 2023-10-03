import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import axios from 'axios';

import axiosService from '../axios/axios-service';
import {
  restoreUser,
  doAuthLogin,
  doAuthLogout,
  doCheckTimeout,
} from '../services/LoginService';
import type { DoAuthLoginPayload } from '../services/LoginService';

type AuthContextObj = {
  user: any;
  doLogin: (payload: DoAuthLoginPayload) => void;
  doLogout: () => void;
  checkTimeout: () => void;
};

const AuthContext = createContext<AuthContextObj>({
  user: null,
  doLogin: () => {},
  doLogout: () => {},
  checkTimeout: () => {},
});

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState(() => {
    // // if (sessionStorage.getItem('tokens')) {
    // //   let tokens = JSON.parse(sessionStorage.getItem('tokens'));
    // //   return jwt_decode(tokens.access_token);
    // // }
    // const userStr = sessionStorage.getItem('user');
    // if (userStr) {
    //   let user = JSON.parse(userStr);
    //   return user;
    // }
    // return null;
    return restoreUser();
  });

  const navigate = useNavigate();

  const doLogin = (payload: DoAuthLoginPayload) => {
    // let authCodeLoginUrl =
    //   process.env.REACT_APP_API_DOMAIN_PREFIX +
    //   process.env.REACT_APP_API_V1_PUBLIC_URI +
    //   process.env.REACT_APP_OAUTH_AUTHORIZE_URI;
    // // authCodeLoginUrl += '/realms/react-backend-realm/protocol/openid-connect/token?client_id={client_id}&redirect_uri=http://localhost:3000/redirect&grant_type={grant_type}&code_verifier=${codeVerifier}&method=SHA-256';
    // authCodeLoginUrl = authCodeLoginUrl.replace(
    //   '{0}',
    //   process.env.REACT_APP_OAUTH_CLIENT_NAME
    // );
    // console.log(
    //   'AuthContextProvider - login - authCodeLoginUrl: [' +
    //     authCodeLoginUrl +
    //     ']'
    // );
    // const apiResponse = await axios.post(authCodeLoginUrl, payload);
    // const tokens = apiResponse.data;
    // sessionStorage.setItem('tokens', JSON.stringify(tokens));
    // //
    // // tokens MUST be saved to the sessionStorage before my-user-info api called
    // let myUserInfoUrl = process.env.REACT_APP_API_DOMAIN_PREFIX +
    // process.env.REACT_APP_API_V1_PROTECTED_URI +
    // process.env.REACT_APP_MY_USER_INFO_URI;
    // const myUserInfoRes = await axiosService.post(myUserInfoUrl);
    // const myUserInfo = myUserInfoRes.data;
    // //
    // let user = jwt_decode(tokens.access_token);
    // console.log(
    //   'AuthContextProvider - login - user: [' + JSON.stringify(user) + '], myUserInfo: [' + JSON.stringify(myUserInfo) + ']'
    // );
    // for (let key in myUserInfo) {
    //   user[key] = myUserInfo[key];
    // }
    // sessionStorage.setItem('user', JSON.stringify(user));
    const user = doAuthLogin(payload);
    console.log(
      'AuthContextProvider - login - user: [' + JSON.stringify(user) + ']'
    );
    setUser(user);
    navigate('/');
  };

  // const doLogout = async (): Promise<void> => {
  //   // invoke the logout API call, for our NestJS API no logout API
  //   await doAuthLogout();

  //   //
  //   setUser(null);
  //   navigate('/');
  // };
  const doLogout = () => {
    doAuthLogout();
    setUser(null);
  };

  // const checkTimeout = async (): Promise<void> => {
  //   try {
  //     await doCheckTimeout();
  //   }
  //   catch (err) {
  //     console.error('AuthContext - checkTimeout - err: ', err);
  //     // return Promise.reject(err);
  //     throw err;
  //   }
  // }
  const checkTimeout = () => {
    const checkTimeoutErr = doCheckTimeout();
    if ( checkTimeoutErr != null ) {
      // return Promise.reject(checkTimeoutErr);
      throw checkTimeoutErr;
    }
    // return Promise.resolve();
  };

  return (
    <AuthContext.Provider value={{ user, doLogin, doLogout, checkTimeout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export type { AuthContextObj };

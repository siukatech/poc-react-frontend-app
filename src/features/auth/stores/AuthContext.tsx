import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import axios, { AxiosError } from 'axios';

import axiosService from '../../../frameworks/axios/services/axios-service';
import {
  restoreUser,
  doAuthLogin,
  doAuthLogout,
  doCheckTimeout,
  doCheckPermissionByRegex as doCheckPermission,
  // doCheckPermissionByMap as doCheckPermission,
} from '../services/LoginService';
import type { DoAuthLoginPayload } from '../services/LoginService';
import { IUser } from '../models';

type AuthContextObj = {
  user?: IUser;
  doLogin: (payload: DoAuthLoginPayload) => void;
  doLogout: () => void;
  checkTimeout: () => void;
  checkPermission: typeof doCheckPermission;
  timeoutErr?: AxiosError;
};

const AuthContext = createContext<AuthContextObj>({
  // user: undefined,
  doLogin: () => {},
  doLogout: () => {},
  checkTimeout: () => {},
  checkPermission: () => false,
  // timeoutErr: AxiosError,
});

const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const navigate = useNavigate();
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
  const [timeoutErr, setTimeoutErr] = useState<any>(null);

  useEffect(() => {
    if (user != null) {
      const fetchData = async () => {
        try {
          // // await checkTimeout();
          await checkTimeout();
          // try {
          //   checkTimeout();
          // } catch (err) {
          //   console.error('ProtectedResource - useEffect - err 1: ', err);
          //   setTimeoutErr(err);
          // }
        } catch (err) {
          console.error('ProtectedResource - useEffect - 2 - err: ', err);
          setTimeoutErr(err);
        }
      };
      fetchData();
      // .catch((reject) => {
      //   console.error('ProtectedResource - useEffect - reject 2: ', reject);
      //   (reject as Promise<AxiosError>).then((err) => setTimeoutErr(err));
      //   // setTimeoutErr(err);
      // })
      // try {
      //   checkTimeout();
      // } catch (err) {
      //   console.error('ProtectedResource - useEffect - err: ', err);
      //   setTimeoutErr(err);
      // }
    }
  }, [user]);

  const doLogin = async (payload: DoAuthLoginPayload) => {
    // let authCodeLoginUrl =
    //   process.env.REACT_APP_API_PATH_PREFIX +
    //   process.env.REACT_APP_API_PATH_V1_PUBLIC +
    //   process.env.REACT_APP_API_OAUTH_AUTHORIZE;
    // // authCodeLoginUrl += '/realms/react-backend-realm/protocol/openid-connect/token?client_id={client_id}&redirect_uri=http://localhost:3000/redirect&grant_type={grant_type}&code_verifier=${codeVerifier}&method=SHA-256';
    // authCodeLoginUrl = authCodeLoginUrl.replace(
    //   '{0}',
    //   process.env.REACT_APP_API_OAUTH_CLIENT_NAME
    // );
    // console.debug(
    //   'AuthContextProvider - login - authCodeLoginUrl: [' +
    //     authCodeLoginUrl +
    //     ']'
    // );
    // const apiResponse = await axios.post(authCodeLoginUrl, payload);
    // const tokens = apiResponse.data;
    // sessionStorage.setItem('tokens', JSON.stringify(tokens));
    // //
    // // tokens MUST be saved to the sessionStorage before my-user-info api called
    // let myUserInfoUrl = process.env.REACT_APP_API_PATH_PREFIX +
    // process.env.REACT_APP_API_PATH_V1_PROTECTED +
    // process.env.REACT_APP_API_PATH_MY_USER_INFO;
    // const myUserInfoRes = await axiosService.post(myUserInfoUrl);
    // const myUserInfo = myUserInfoRes.data;
    // //
    // let user = jwt_decode(tokens.access_token);
    // console.debug(
    //   'AuthContextProvider - login - user: [' + JSON.stringify(user) + '], myUserInfo: [' + JSON.stringify(myUserInfo) + ']'
    // );
    // for (const key in myUserInfo) {
    //   user[key] = myUserInfo[key];
    // }
    // sessionStorage.setItem('user', JSON.stringify(user));
    const user = await doAuthLogin(payload);
    // console.debug(
    //   'AuthContextProvider - login - user: [' + JSON.stringify(user) + ']'
    // );
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
    // console.debug('AuthContext - doLogout - start');
    doAuthLogout();
    setUser(null);
    // console.debug('AuthContext - doLogout - end');
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
  const checkTimeout = async () => {
    const timeoutErr = await doCheckTimeout();
    if (timeoutErr != null) {
      // return Promise.reject(timeoutErr);
      throw timeoutErr;
    }
    // return Promise.resolve();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        doLogin,
        doLogout,
        checkTimeout,
        checkPermission: doCheckPermission,
        timeoutErr,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const authContext = useContext(AuthContext);
  if (authContext == null) {
    throw new Error(`AuthContext must be used with AuthContextProvider`);
  }
  return authContext;
};

export default AuthContext;
export { AuthContextProvider, useAuthContext };
export type { AuthContextObj };

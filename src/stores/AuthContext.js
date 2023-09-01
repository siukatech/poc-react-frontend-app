import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import axios from 'axios';

import axiosService from '../axios/axios-service';


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // if (sessionStorage.getItem('tokens')) {
    //   let tokens = JSON.parse(sessionStorage.getItem('tokens'));
    //   return jwt_decode(tokens.access_token);
    // }
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      let user = JSON.parse(userStr);
      return user;
    }
    return null;
  });

  const navigate = useNavigate();

  const login = async (payload) => {
    let authCodeLoginUrl =
      process.env.REACT_APP_API_DOMAIN_PREFIX +
      process.env.REACT_APP_API_V1_PUBLIC_URI +
      process.env.REACT_APP_OAUTH_AUTHORIZE_URI;
    // authCodeLoginUrl += '/realms/react-backend-realm/protocol/openid-connect/token?client_id={client_id}&redirect_uri=http://localhost:3000/redirect&grant_type={grant_type}&code_verifier=${codeVerifier}&method=SHA-256';
    authCodeLoginUrl = authCodeLoginUrl.replace(
      '{0}',
      process.env.REACT_APP_OAUTH_CLIENT_NAME
    );
    console.log(
      'AuthContextProvider - login - authCodeLoginUrl: [' +
        authCodeLoginUrl +
        ']'
    );
    const apiResponse = await axios.post(authCodeLoginUrl, payload);
    const tokens = apiResponse.data;
    sessionStorage.setItem('tokens', JSON.stringify(tokens));
    //
    // tokens MUST be saved to the sessionStorage before my-user-info api called
    let myUserInfoUrl = process.env.REACT_APP_API_DOMAIN_PREFIX +
    process.env.REACT_APP_API_V1_PROTECTED_URI +
    process.env.REACT_APP_MY_USER_INFO_URI;
    const myUserInfoRes = await axiosService.post(myUserInfoUrl);
    const myUserInfo = myUserInfoRes.data;
    //
    let user = jwt_decode(tokens.access_token);
    console.log(
      'AuthContextProvider - login - user: [' + JSON.stringify(user) + '], myUserInfo: [' + JSON.stringify(myUserInfo) + ']'
    );
    for (let key in myUserInfo) {
      user[key] = myUserInfo[key];
    }
    sessionStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    navigate('/');
  };
  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

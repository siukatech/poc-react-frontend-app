/**
 * Reference
 * https://www.learmoreseekmore.com/2022/09/reactjs-v18-authentication-with-jwt-accesstoken-and-refresh-token.html
 *
 */

import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import useHttp from '../hooks/use-http';
import { getPublicKey } from '../services/MyService';

const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if (sessionStorage.getItem('tokens')) {
      // let tokens = JSON.parse(sessionStorage.getItem("tokens"));
      // return jwt_decode(tokens.access_token);
      return null;
    }
    return null;
  });

  const {
    sendRequest: getRequest,
    status: getStatus,
    data: loadedObj,
    error: getError,
  } = useHttp(getPublicKey, true);

  // const navigate = useNavigate();

  const loginAction = async (payload) => {
    // const apiResponse = await axios.post(
    //   process.env.REACT_APP_API_V1_AUTH_URI,
    //   payload
    // );
    // sessionStorage.setItem("tokens",  JSON.stringify(apiResponse.data));
    // setUser(jwt_decode(apiResponse.data.access_token));

    getRequest();

    if (getStatus === 'completed') {
      const publicKeyBase64 = loadedObj;
      console.log('Home - public-key: [' + publicKeyBase64 + ']');
      sessionStorage.setItem('publicKeyBase64', publicKeyBase64);
    }

    // navigate("/");
  };
  return (
    <AuthContext.Provider value={{ user, loginAction }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

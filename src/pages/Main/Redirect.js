import React, { useEffect, useState } from 'react';

import { useParam, useSearchParams, useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';

import authorize from '../../links/authorize';
import token from '../../links/token';

const Redirect = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [authCode, setAuthCode] = useState(null);

  // http://localhost:3000/redirect?error=invalid_scope&error_description=Invalid+scopes%3A+openid%2Cprofile%2Cemail
  const code = searchParams?.get('code');
  const error = searchParams?.get('error');
  const errorDescription = searchParams?.get('error_description');
  const clientName = process.env.REACT_APP_OAUTH_CLIENT_NAME;

  useEffect(() => {
    if (error == null) {
      if (code) {
        console.log(
          'Redirect - useEffect - searchParams - code: [' + code + ']'
        );

        // // sessionStorage.setItem('code', code);
        // const client_id = 'react-backend-client-01';
        // const client_secret = 'vZQoj1n3Gu4qx4964CaIH9PZxDNjd72N';
        // const headers = new Headers();
        // //headers.set('Content-Type', 'application/json');
        // headers.set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        // headers.set('Authorization', `Basic ${Buffer.from(`${client_id}:${client_secret}`)}`);
        // let tokenUrl = token();
        // tokenUrl = 'http://localhost:38180/realms/react-backend-realm/protocol/openid-connect/token'
        // // + '?'
        // // + 'grant_type=' + 'authorization_code'
        // // + '&'
        // // + 'client_id=' + client_id
        // // + '&'
        // // + 'client_secret=' + client_secret
        // // + '&'
        // // + 'redirect_uri=' + 'http://localhost:3000/redirect'
        // // + '&'
        // // + 'code=' + code
        // ;
        // //https://stackoverflow.com/a/37562814
        // const formObj = {
        //   client_id: client_id
        //   , client_secret: client_secret
        //   , redirect_uri: 'http://localhost:3000/redirect'
        //   , code: code
        //   , grant_type: 'authorization_code'
        //   // , grant_type: 'password'
        //   // , username: 'app-user-01'
        //   // , password: 'admin01'
        // }

        // let formBody = [];
        // for (let property in formObj) {
        //   let encodedKey = encodeURIComponent(property);
        //   let encodedValue = encodeURIComponent(formObj[property]);
        //   formBody.push(encodedKey + "=" + encodedValue);
        // }
        // formBody = formBody.join("&");

        // const tokenFetch = async () => {
        //   const response = await fetch(tokenUrl, {
        //     method: 'POST'
        //     , mode: 'cors'
        //     , headers
        //     // , body: JSON.stringify({
        //     //   grant_type: 'authorization_code'
        //     //   , client_id: client_id
        //     //   , client_secret: client_secret
        //     //   , redirect_uri: 'http://localhost:3000/redirect'
        //     //   , code: code
        //     // })
        //     , body: formBody
        //   });
        //   if (response.ok) {
        //     const data = await response.json();
        //     const access_token = data.access_token;
        //     const refresh_token = data.refresh_token;
        //     sessionStorage.setItem('access_token', access_token);
        //     sessionStorage.setItem('refresh_token', refresh_token);
        //     setAuthCode(code);
        //   }
        // };

        const tokenUrl = token(clientName, code);
        const tokenFetch = async () => {
          const response = await fetch(tokenUrl, {
            method: 'POST',
            mode: 'cors',
          });
          if (response.ok) {
            const data = await response.json();
            const access_token = data.access_token;
            const refresh_token = data.refresh_token;
            sessionStorage.setItem('access_token', access_token);
            sessionStorage.setItem('refresh_token', refresh_token);
            setAuthCode(code);

            console.log(
              'Redirect - useEffect - tokenUrl: [' +
                tokenUrl +
                '], sessionStorage.getItem(access_token): [' +
                sessionStorage.getItem('access_token') +
                ']'
            );

            navigate('/');
          }
        };

        tokenFetch();
      } else if (!code) {
        const authorizeUrl = authorize(clientName);
        console.log(
          'Redirect - useEffect - authorizeUrl: [' + authorizeUrl + ']'
        );
        window.location.href = authorizeUrl;
      }
    } else {
      // do nothing
    }
  }, [authCode]);

  return (
    <>
      {error == null && <p>Redirecting...</p>}
      {error != null && <p>{errorDescription}</p>}
    </>
  );
};

export default Redirect;

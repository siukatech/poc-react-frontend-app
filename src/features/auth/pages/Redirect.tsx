import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { doAuthToken, getAuthLoginUrl } from '../services/LoginService';
import { axiosService } from '../../../frameworks/axios';
import { IUser } from '../models';
import { useAuthContext } from '../contexts/AuthContext';
import { bindAuth } from '../stores/authSlice';
import { useAppDispatch } from '../../../frameworks/app/stores/hooks';

const Redirect = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // This cannot be called because that generates a new codeVerifier and makes the verification failure (new codeVerifier against old codeChallenge)
  // const authLoginUrl = getAuthLoginUrl();

  // http://localhost:3000/redirect?error=invalid_scope&error_description=Invalid+scopes%3A+openid%2Cprofile%2Cemail
  const code = searchParams?.get('code');
  const error = searchParams?.get('error');
  const errorDescription = searchParams?.get('error_description');
  console.debug(
    'Redirect - searchParams - code: [' +
      code +
      '], error: [' +
      error +
      '], errorDescription: [' +
      errorDescription +
      ']'
  );

  const [authCode, setAuthCode] = useState(() => {
    // return code;
    return null;
  });
  const [user, setUser] = useState<null | IUser>(null);

  const authContext = useAuthContext();
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      if (authCode == null && code != null) {
        const fetchToken = async () => {
          const user = await doAuthToken(code);
          // setUser(user);

          dispatch(bindAuth({ user: user }));
          authContext.postLogin(user);
        };
        fetchToken();
      }
    },
    // , [authCode]
    []
  );

  // if (user != null) {
  //   navigate('/');
  // }

  return (
    <>
      {error == null && (
        <>
          <p>
            Redirecting... code: [{code}], error: [{error}]
          </p>
          {/* <a href={authLoginUrl}>Click here</a> */}
        </>
      )}
      {error != null && <p>{errorDescription}</p>}
    </>
  );
};

export default Redirect;


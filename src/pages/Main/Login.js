import React, { useContext } from 'react';

import { Link } from 'react-router-dom';

import { useTranslation, Trans } from 'react-i18next';
import AuthContext from '../../stores/auth-context';


const Login = (props) => {
  const { t, i18n } = useTranslation();

  const { loginAction } = useContext(AuthContext);

  const loginSubmit = async () => {
    await loginAction({});
  };

  return (
    <>
      <Link to={'/redirect'}>{t('link.login')}</Link>
      <button onClick={loginSubmit}>{t('button.login')}</button>
    </>
  );
};

export default Login;

import { useRef, useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { Box, Button } from '@mui/material';

import { useAppDispatch } from '../../../framework/app/stores/hooks';
import { useAuthContext, clearAuth } from '../../../framework/auth';


const Logout = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { doLogout } = useAuthContext();
  const dispatch = useAppDispatch();

  const logout = () => {
    doLogout();
    dispatch(clearAuth({}));
  };
  logout();

  return (
    <>
      <Navigate to="/" />
      <Box>
        <Button variant="outlined" onClick={() => logout()}>
          {t('Logout')}
        </Button>
      </Box>
    </>
  );
};

export default Logout;

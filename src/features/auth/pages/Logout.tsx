import { useRef, useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { useAuthContext } from '../contexts/AuthContext';

import { Box, Button } from '@mui/material';
import { clearAuth } from '../stores/authSlice';
import { useAppDispatch } from '../../../frameworks/app/stores/hooks';

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

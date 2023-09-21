import { useRef, useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import AuthContext from '../../../base/stores/AuthContext';

import { Box, Button } from '@mui/material';

const Logout = () => {
  const { t, i18n } = useTranslation();
  const { doLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  doLogout();

  return (
    <>
      <Navigate to="/" />
      <Box>
        <Button variant="outlined" onClick={() => doLogout()}>
          {t('Logout')}
        </Button>
      </Box>
    </>
  );
};

export default Logout;

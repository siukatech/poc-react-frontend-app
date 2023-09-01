import { useRef, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import AuthContext from '../../../base/stores/AuthContext';

import { Box, Button } from '@mui/material';

const Logout = () => {
  const { t, i18n } = useTranslation();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  logout();

  return (
    <>
      {/* <Box>
        <Button variant="outlined" onClick={() => logout()}>{t('Logout')}</Button>
      </Box> */}
    </>
  );
};

export default Logout;

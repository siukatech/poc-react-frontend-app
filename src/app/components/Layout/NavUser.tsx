import { useState, useContext, useEffect } from 'react';

import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

import AuthContext from '../../../base/stores/AuthContext';

import {
  Box,
  IconButton,
  Typography,
  Divider,
  Paper,
  Menu,
  MenuList,
  MenuItem,
  Tooltip,
  Avatar,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import {
  AssignmentInd as AssignmentIndIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

// type SettingType = {
//   i18n?: string;
//   link?: string;
//   icon: React.ReactNode;
//   divider: boolean;
// }
const settings =
  // : SettingType[]
  [
    {
      i18n: 'menu.user.profile',
      link: '/user/profile',
      icon: <AssignmentIndIcon />,
      divider: false,
    },
    {
      i18n: 'menu.user.account',
      link: '/user/account',
      icon: <PersonIcon />,
      divider: false,
    },
    {
      i18n: 'menu.user.dashboard',
      link: '/user/dashboard',
      icon: <DashboardIcon />,
      divider: false,
    },
    {
      i18n: 'menu.user.settings',
      link: '/user/settings',
      icon: <SettingsIcon />,
      divider: false,
    },
    { icon: <Divider />, divider: true },
    {
      i18n: 'menu.user.logout',
      link: '/logout',
      icon: <LogoutIcon />,
      divider: false,
    },
  ];

const NavUser = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const openUserMenuHandler = (evt: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(evt.currentTarget);
  };
  const closeUserMenuHandler = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {!user && (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title={t('menu.login.tooltip')}>
            <IconButton
              onClick={() => navigate('/login')}
              size="large"
              aria-label={t('menu.login')}
              aria-controls="menu-login"
              aria-haspopup="true"
              color="inherit"
              sx={{ p: 1 }}
            >
              <LoginIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      {user && (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title={t('menu.user.tooltip')}>
            <IconButton
              onClick={openUserMenuHandler}
              size="large"
              aria-label={t('menu.user')}
              aria-controls="menu-user"
              aria-haspopup="true"
              color="inherit"
              sx={{ p: 1 }}
            >
              <Avatar
                alt={user?.loginId}
                src="/static/images/avatar/2.jpg"
                sx={{ width: 24, height: 24 }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-user"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={closeUserMenuHandler}
          >
            {settings.map((setting, idx) => (
              <div key={idx}>
                {!setting.divider && (
                  <MenuItem
                    onClick={() => {
                      closeUserMenuHandler();
                      navigate(`${setting.link}`);
                    }}
                  >
                    <ListItemIcon>{setting.icon}</ListItemIcon>
                    <ListItemText>{t(`${setting.i18n}`)}</ListItemText>
                  </MenuItem>
                )}
                {setting.divider && <Divider key={idx} />}
              </div>
            ))}
          </Menu>
        </Box>
      )}
    </>
  );
};

export default NavUser;

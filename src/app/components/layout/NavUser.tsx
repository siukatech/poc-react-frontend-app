import { useState, useContext, useEffect } from 'react';

import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

import AuthContext from '../../../base/stores/AuthContext';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

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

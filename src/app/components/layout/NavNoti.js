import { useState, useContext, useEffect } from 'react';

import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

import AuthContext from '../../../base/stores/AuthContext';
import { formatDate, formatDatetime } from '../../../base/utils/date';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import MailIcon from '@mui/icons-material/Mail';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';

const NavNoti = () => {
  const { t, i18n } = useTranslation();
  const [notis, setNotis] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let notisTemp = new Array();
    for (let i = 0; i < 20; i++) {
      notisTemp.push({
        message: `Notification Item ${i + 1} Notification Item ${
          i + 1
        } Notification Item ${i + 1}`,
        href: `/notification/${i + 1}`,
        datetime: new Date(),
      });
    }
    setNotis(notisTemp);
  }, []);

  const [anchorElNoti, setAnchorElNoti] = useState(null);

  const openNotiMenuHandler = (event) => {
    setAnchorElNoti(event.currentTarget);
  };
  const closeNotiMenuHandler = () => {
    setAnchorElNoti(null);
  };

  const [notiDialogOpen, setNotiDialogOpen] = useState(false);
  const openNotiDialogHandler = () => {
    setNotiDialogOpen(true);
  };
  const closeNotiDialogHandler = () => {
    setNotiDialogOpen(false);
  };
  const clickNotiOneHandler = (noti) => {
    navigate(noti.href);
  };
  const clearNotiAllHandler = () => {};

  return (
    <>
      {user && (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title={t('menu.noti.tooltip')}>
            <IconButton
              // id="long-button"
              onClick={openNotiMenuHandler}
              size="large"
              aria-label={t('menu.noti')}
              aria-controls="menu-noti"
              aria-haspopup="true"
              color="inherit"
              sx={{ p: 1 }}
            >
              <Badge color="secondary" badgeContent={notis.length} max={9}>
                {/* <MailIcon /> */}
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            // sx={{ mt: '45px', maxHeight: '400px' }}
            sx={{ mt: '45px', maxWidth: 300 }}
            id="menu-noti"
            // MenuListProps={{
            //   'aria-labelledby': 'long-button',
            // }}
            anchorEl={anchorElNoti}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            // keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElNoti)}
            onClose={closeNotiMenuHandler}
            // Popover={{
            //   style: {
            //     // maxHeight: notis.length * 4.5,
            //     maxHeight: '400px',
            //     width: '20ch',
            //   },
            // }}
          >
            <MenuItem>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {t('menu.noti.title')}
              </Typography>
            </MenuItem>
            <MenuItem sx={{ padding: 0 }}>
              <Box
                sx={{
                  mt: 0,
                  overflow: 'hidden auto',
                  maxHeight: 290,
                  // minWidth: 250,
                }}
              >
                <MenuList sx={{ maxWidth: 285 }}>
                  {notis.map((noti, idx) => (
                    <MenuItem
                      key={`type-1-${idx}`}
                      onClick={() => {
                        closeNotiMenuHandler();
                      }}
                    >
                      <Typography textAlign="left" sx={{ overflowX: 'hidden' }}>
                        {noti.message}
                      </Typography>
                    </MenuItem>
                  ))}

                  {notis.map((noti, idx) => (
                    <MenuItem
                      key={`type-2-${idx}`}
                      onClick={() => {
                        closeNotiMenuHandler();
                      }}
                      sx={{ paddingLeft: 1 }}
                    >
                      <Box sx={{ overflowX: 'hidden' }}>
                        <IconButton size="small">
                          {/* import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout'; */}
                          <AssignmentIndIcon />
                        </IconButton>
                        <Typography
                          variant="span"
                          textAlign="left"
                          // sx={{ overflowX: 'hidden' }}
                        >
                          {noti.message}
                        </Typography>
                        <Typography textAlign="right">
                          {formatDatetime(noti.datetime)}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </MenuList>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem>
              {/* <Typography textAlign="center">
                {t('button.mark.as.read')}
              </Typography> */}
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: '100%',
                  // justifyContent: 'right',
                }}
              >
                {t('button.mark.as.read')}
              </Button>
            </MenuItem>
          </Menu>

          {/* <Tooltip title={t('menu.noti.tooltip')}>
            <IconButton
              onClick={openNotiMenuHandler}
              size="large"
              aria-label={t('menu.noti')}
              aria-controls="menu-noti-2"
              aria-haspopup="true"
              color="inherit"
              sx={{ p: 1 }}
            >
              <Badge color="secondary" badgeContent={notis.length} max={9}>
                <MailIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px', maxWidth: 250 }}
            id="menu-noti-2"
            anchorEl={anchorElNoti}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            // keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElNoti)}
            onClose={closeNotiMenuHandler}
          >
            <MenuItem>
              <Typography textAlign="center">{t('menu.noti.title')}</Typography>
            </MenuItem>
            <Box
              sx={{
                mt: 0,
                overflow: 'hidden auto',
                maxHeight: 290,
              }}
            >
              {notis.map((noti, idx) => (
                <MenuItem
                  key={idx}
                  onClick={() => {
                    closeNotiMenuHandler();
                  }}
                >
                  <Typography textAlign="center">{noti.message}</Typography>
                </MenuItem>
              ))}
            </Box>
            <Divider />
            <MenuItem>
              <Button
                color="primary"
                sx={{
                  width: '100%',
                  // justifyContent: 'right',
                }}
              >
                {t('button.mark.as.read')}
              </Button>
            </MenuItem>
          </Menu> */}

          {/* <Tooltip title={t('menu.noti.tooltip')}>
            <IconButton
              onClick={openNotiDialogHandler}
              size="large"
              aria-label={t('menu.noti')}
              aria-controls="menu-noti-dialog"
              aria-haspopup="true"
              color="inherit"
              sx={{ p: 1 }}
            >
              <Badge color="secondary" badgeContent={notis.length} max={9}>
                <MailIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Dialog
            onClose={closeNotiDialogHandler}
            open={notiDialogOpen}
            fullWidth={true}
            // https://stackoverflow.com/a/69231667
            PaperProps={{
              sx: {
                width: '60%',
                maxHeight: 350,
                position: 'relative',
              },
            }}
          >
            <DialogTitle>{t('menu.noti.title')}</DialogTitle>
            <DialogContent>
              <List sx={{ pt: 0 }}>
                {notis.map((noti, idx) => (
                  <ListItem disableGutters key={idx}>
                    <ListItemButton onClick={() => clickNotiOneHandler(noti)}>
                      <ListItemText primary={noti.message} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                sx={{
                  width: '100%',
                  // justifyContent: 'right',
                }}
                onClick={clearNotiAllHandler}
              >
                {t('button.mark.as.read')}
              </Button>
            </DialogActions>
          </Dialog> */}
        </Box>
      )}
    </>
  );
};

export default NavNoti;

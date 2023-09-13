import { useState, useContext, useEffect } from 'react';

import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

import AuthContext from '../../../base/stores/AuthContext';
import { formatDate, formatDatetime } from '../../../base/utils/date';

import { Theme, styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Tooltip,
  Icon,
  IconButton,
  Badge,
  Menu,
  MenuList,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem as ListItemMui,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
  Popper,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from '@mui/material';

import {
  Mail as MailIcon,
  AssignmentInd as AssignmentIndIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  CloseOutlined as CloseOutlinedIcon,
} from '@mui/icons-material';

const notificationIcons = [
  <MailIcon />,
  <AssignmentIndIcon />,
  <PersonIcon />,
  <DashboardIcon />,
  <LoginIcon />,
  <LogoutIcon />,
  <NotificationsIcon />,
  <CloseOutlinedIcon />,
];

const ListItem = styled(ListItemMui)(({ theme }) => ({
  '&:hover': {
    cursor: 'pointer',
    // backgroundColor: theme.palette.primary.main,
    // backgroundColor: '#f1f1f1',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const NavNoti = () => {
  const { t, i18n } = useTranslation();
  const [notis, setNotis] = useState<any[]>([]);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    let notisTemp: any[] = [];
    for (let i = 0; i < 20; i++) {
      notisTemp.push({
        message: `Notification Item ${i + 1} Notification Item ${
          i + 1
        } Notification Item ${i + 1}`,
        href: `/notification/${i + 1}`,
        datetime: new Date(),
        icon: notificationIcons[i % notificationIcons.length],
      });
    }
    setNotis(notisTemp);
  }, []);

  const [anchorElNoti, setAnchorElNoti] = useState<null | HTMLElement>(null);
  const [anchorNotiMenuOpen, setAnchorNotiMenuOpen] = useState(false);

  const openNotiMenuHandler = (evt: React.MouseEvent<HTMLElement>) => {
    // setAnchorElNoti(evt.currentTarget);
    openNotiElementHandler(evt.currentTarget);
  };
  // const closeNotiMenuHandler = () => {
  //   setAnchorElNoti(null);
  // };
  const openNotiElementHandler = (currentTarget: null | HTMLElement) => {
    setAnchorElNoti((prevState) => {
      if (prevState == null) return currentTarget;
      else return null;
    });
  };

  const [notiDialogOpen, setNotiDialogOpen] = useState(false);
  const openNotiDialogHandler = () => {
    setNotiDialogOpen(true);
  };
  const closeNotiDialogHandler = () => {
    setNotiDialogOpen(false);
  };
  const clickNotiOneHandler = (noti: any) => {
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
              aria-describedby="menu-noti"
              color="inherit"
              sx={{ p: 1 }}
            >
              <Badge color="secondary" badgeContent={notis.length} max={9}>
                {/* <MailIcon /> */}
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          {/* <Menu
            // sx={{ mt: 45, maxHeight: '400px' }}
            sx={{ mt: 45, maxWidth: 300 }}
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
                          <AssignmentIndIcon />
                        </IconButton>
                        <Typography
                          component="span"
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
          </Menu> */}

          <Popper
            sx={{ p: 0, width: 350 }}
            id="menu-noti"
            // placement={matchesXs ? 'bottom' : 'bottom-end'}
            placement={'bottom-end'}
            // placement={'bottom'}
            // placement={'auto-end'}
            open={anchorElNoti != null}
            anchorEl={anchorElNoti}
            // role={undefined}
            // transition
            // disablePortal
            popperOptions={{
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    // offset: [matchesXs ? -5 : 0, 9],
                    // offset: [0, 9],
                    offset: [0, 19],
                    zIndex: 1,
                  },
                },
              ],
            }}
          >
            <Card variant="outlined">
              <CardHeader
                sx={{ p: 1 }}
                title={
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      textAlign: 'center',
                      '&:hover': { cursor: 'pointer' },
                    }}
                    onClick={() => navigate('/notis')}
                  >
                    {t('menu.noti.title')}
                  </Typography>
                }
                action={
                  <IconButton
                    onClick={() => {
                      openNotiElementHandler(anchorElNoti);
                    }}
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                }
              />
              <Divider />
              <CardContent
                sx={{
                  maxHeight: 350,
                  overflowX: 'hidden',
                  overflowY: 'auto',
                  pt: 0,
                  pb: 0,
                  // pl: 2,
                  // pr: 1,
                  pl: 0,
                  pr: 0,
                }}
                color="text.secondary"
              >
                <List>
                  {notis.map((noti, idx) => (
                    <>
                      <ListItem
                        key={`type-3-${idx}`}
                        sx={{ pt: 0, pb: 0, pl: 2, pr: 2, overflowX: 'hidden' }}
                      >
                        {/* <ListItemIcon>
                          <IconButton size="small">
                            {noti.icon}
                          </IconButton>
                        </ListItemIcon> */}
                        <ListItemText
                          primary={
                            <Typography
                              // component="div"
                              variant="subtitle1"
                              textAlign="left"
                              // sx={{ whiteSpace: 'nowrap', overflowX: 'hidden' }}
                            >
                              {noti.message}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              // component="body"
                              variant="body1"
                              textAlign="right"
                              fontSize={'0.85rem'}
                            >
                              {formatDatetime(noti.datetime)}
                            </Typography>
                          }
                        />
                        <ListItemButton>
                          <IconButton size="small">{noti.icon}</IconButton>
                        </ListItemButton>
                      </ListItem>
                      {idx < notis.length - 1 && <Divider />}
                    </>
                  ))}
                </List>
              </CardContent>
              <Divider />
              <CardActions>
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
              </CardActions>
            </Card>
          </Popper>

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

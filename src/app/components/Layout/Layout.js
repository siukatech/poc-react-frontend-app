import { useState, useContext, useEffect } from 'react';

import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

import PropTypes from 'prop-types';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBarMui from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import AdbIcon from '@mui/icons-material/Adb';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EventIcon from '@mui/icons-material/Event';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import AuthContext from '../../../base/stores/AuthContext';

import NavLang from './NavLang';
import NavNoti from './NavNoti';
import NavUser from './NavUser';
import ScrollTop from './ScrollTop';


const drawerWidth = 240;

const MainMd = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));
// const MainXs = styled('main', {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(3),
//   transition: theme.transitions.create('margin', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   // marginLeft: `-${drawerWidth}px`,
//   ...(open && {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   }),
// }));
const MainXs = styled(MainMd, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  marginLeft: 'auto',
}));

const AppBarMd = styled(AppBarMui, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
//  sx: { display: { xs: 'none', md: 'flex' } },
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const AppBarXs = styled(AppBarMui, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // sx: { display: { xs: 'flex', md: 'none' } },
  ...(open && {
    // width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const DrawerContent = ({
  handleDrawerToggle,
  theme,
  pages,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListBastle,
}) => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem key={page.i18n} disablePadding>
            <ListItemButton onClick={() => navigate(page.link)}>
              <ListItemIcon>
                {/* <HomeIcon /> */}
                {/* <MailIcon /> */}
                {page.icon}
              </ListItemIcon>
              <ListItemText primary={t(`${page.i18n}`)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

const pages = [
  { i18n: 'home', link: '/', icon: <HomeIcon /> },
  { i18n: 'items', link: '/items', icon: <EventIcon /> },
  { i18n: 'shops', link: '/shops', icon: <StorefrontIcon /> },
];

const Layout = (props) => {
  const { children } = props;
  const { t, i18n } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [drawerToggle, setDrawerToggle] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setDrawerToggle(!drawerToggle);
  };

  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleNavMenuOpen = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleNavMenuClose = () => {
    setAnchorElNav(null);
  };

  const drawerContent = (
    <>
      <DrawerHeader>
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem key={page.i18n} disablePadding>
            <ListItemButton onClick={() => navigate(page.link)}>
              <ListItemIcon>{page.icon}</ListItemIcon>
              <ListItemText primary={t(`${page.i18n}`)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarMd
          position="fixed"
          open={drawerToggle}
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          {/* <Container maxWidth="lg"> */}
          <Toolbar>
            {/* <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{ mr: 1, ...(drawerToggle && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton> */}
            <Box sx={{ flexGrow: 1, 
              display: { xs: 'none', md: 'flex' } 
              }}>
              <IconButton
                size="small"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{ mr: 1, ...(drawerToggle && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                href="/"
                sx={{
                  mr: 2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                {t('app.title')} [{`${drawerToggle}`}]
              </Typography>
            </Box>
            {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.i18n}
                  onClick={() => {
                    handleNavMenuClose();
                    navigate(page.link);
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {t(`${page.i18n}`)}
                </Button>
              ))}
            </Box> */}

            {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleNavMenuOpen}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClick={handleNavMenuClose}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page.i18n}
                      onClick={() => {
                        handleNavMenuClose();
                        navigate(page.link);
                      }}
                    >
                      <Typography textAlign="center">
                        {t(`${page.i18n}`)}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box> */}

            <NavLang />
            <NavNoti />
            <NavUser />
          </Toolbar>
          {/* </Container> */}
        </AppBarMd>
        <AppBarXs
          position="fixed"
          open={drawerToggle}
          sx={{ display: { xs: 'flex', md: 'none' } }}
        >
          <Toolbar>
            <Box
              sx={{
                flexGrow: 1,
                alignItems: 'center',
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <MenuIcon
                onClick={handleDrawerToggle}
                edge="start"
                sx={{ mr: 1 }}
              />
              {/* <MenuIcon
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ mr: 1, ...(drawerToggle && { display: 'none' }) }}
            /> */}
              {/* <IconButton
                  size="small"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerToggle}
                  edge="start"
                  sx={{ mr: 1, ...(drawerToggle && { display: 'none' }) }}
                >
                  <MenuIcon/>
                </IconButton> */}
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  textOverflow: 'clip',
                  whiteSpace: 'normal',
                }}
              >
                Frontend App [{`${drawerToggle}`}]
              </Typography>
            </Box>
            <NavLang />
            <NavNoti />
            <NavUser />
          </Toolbar>
        </AppBarXs>
        <Drawer
          sx={{
            display: { xs: 'none', md: 'block' },
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          // variant="temporary"
          anchor="left"
          open={drawerToggle}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          sx={{
            display: { xs: 'block', md: 'none' },
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="temporary"
          anchor="left"
          open={drawerToggle}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawerContent}
        </Drawer>
        <Toolbar id="back-to-top-anchor" />
        <MainMd
          open={drawerToggle}
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        >
          <DrawerHeader />
          <Outlet />
        </MainMd>
        <MainXs
          open={drawerToggle}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          <DrawerHeader />
          <Outlet />
        </MainXs>
      </Box>
      <ScrollTop open={drawerToggle} {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default Layout;


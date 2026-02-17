
import { AppConfigProvider } from '../../core/app';
import { LoginServiceImpl } from '../auth';

import {
  AssignmentInd as AssignmentIndIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { Divider } from '@mui/material';

import { childenRoutes } from './routesConfig';

const appConfig = {
  // userService: new RealUserService(),
  // authService: new RealAuthService(),
  // configService: new RealConfigService(),
  serviceConfig: {
    loginService: new LoginServiceImpl(),
  },
  layoutConfig: {
    menuItems: [
      { i18n: 'menu.home', link: '/', icon: 'HomeOutlined' },
      { i18n: 'menu.items', link: '/items', icon: 'Event' },
      { i18n: 'menu.shops', link: '/shops', icon: 'ShopOutlined' },
      { i18n: 'menu.merchants', link: '/merchants', icon: 'Storefront' },
      { i18n: 'menu.i18n', link: '/i18ns', icon: 'Language' },
    ],
    langItems: [
      { i18n: 'menu.lang.en', lang: 'en' },
      { i18n: 'menu.lang.zh', lang: 'zh-TW' },
      { i18n: 'menu.lang.cn', lang: 'zh-CN' },
    ],
    settingItems: [
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
    ],
  },
  routeConfig: {
    childenRoutes,
  }
};

export {
  appConfig,
}

import DrawerMenu from './layouts/DrawerMenu';
import LayoutLeft from './layouts/LayoutLeft';
import LayoutMini from './layouts/LayoutMini';
import MiniVariantDrawerLeft from './layouts/MiniVariantDrawerLeft';
import NavLang from './layouts/NavLang';
import NavNoti from './layouts/NavNoti';
import NavUser from './layouts/NavUser';
import PersistentDrawerLeft from './layouts/PersistentDrawerLeft';
import ScrollTop from './layouts/ScrollTop';

import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import RouterMain from './pages/RouterMain';

import router from './routes/router';

import shadeColor from './themes/shade-color';
import themeOptions from './themes/theme-options';

import {
  DATE_FORMAT_DEFAULT,
  DATE_TIME_FORMAT_DEFAULT,
  TIMEZONE_DEFAULT,
  formatDate,
  formatDatetime,
  parseDateToUtc,
} from './utils/date';
import { deepMergeObject } from './utils/object';
import { recursiveCloneChildren } from './utils/render';
import { restoreJsonStr, saveJsonObj } from './utils/storage';

export {
  DrawerMenu,
  LayoutLeft,
  LayoutMini,
  MiniVariantDrawerLeft,
  NavLang,
  NavNoti,
  NavUser,
  PersistentDrawerLeft,
  ScrollTop,
  ErrorPage,
  Home,
  NotFound,
  router,
  RouterMain,
  shadeColor,
  themeOptions,
  DATE_FORMAT_DEFAULT,
  DATE_TIME_FORMAT_DEFAULT,
  TIMEZONE_DEFAULT,
  formatDate,
  formatDatetime,
  parseDateToUtc,
  deepMergeObject,
  recursiveCloneChildren,
  restoreJsonStr,
  saveJsonObj,
};

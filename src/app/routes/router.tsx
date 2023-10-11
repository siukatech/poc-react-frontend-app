import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import {
  ThemeProvider,
  Theme,
  createTheme,
  styled,
  useTheme,
} from '@mui/material/styles';

import { AuthContextProvider } from '../../base/stores/AuthContext';
import ProtectedResource, {
  ProtectedResourceAccessBy,
  ProtectedResourceDisplayType,
} from '../../base/components/Security/ProtectedResource';

import Layout from '../components/Layout/Layout';
import PersistentDrawerLeft from '../components/Layout/PersistentDrawerLeft';
import Home from '../pages/Main/Home';
import NotFound from '../pages/Main/NotFound';
import ErrorPage from '../pages/Main/ErrorPage';
import Login from '../pages/Login/Login';
import Logout from '../pages/Login/Logout';

import AllItems from '../pages/Item/AllItems';
import EditItem from '../pages/Item/EditItem';
import ViewItem from '../pages/Item/ViewItem';
import ContentLong from '../pages/Sample/ContentLong';

import theme from '../themes/theme';
import AllMerchants from '../pages/Merchant/AllMerchants';

const router = createBrowserRouter(
  // delfine method 1
  [
    {
      path: '/',
      element: (
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <AuthContextProvider>
              <Layout />
            </AuthContextProvider>
          </LocalizationProvider>
        </ThemeProvider>
      ),
      // element: <AuthContextProvider><PersistentDrawerLeft /></AuthContextProvider>,
      errorElement: <ErrorPage />,
      //render: () => redirect('./toys'),
      children: [
        // { path: '', element: <Home /> },
        { path: '', element: <ContentLong /> },
        { path: '/samples/content-long', element: <ContentLong /> },
        {
          path: '/login',
          element: (
            <ProtectedResource
              accessBy={ProtectedResourceAccessBy.PUBLIC}
              displayType={ProtectedResourceDisplayType.DISABLED}
              resourceName={``}
              accessRights={``}
            >
              <Login />
            </ProtectedResource>
          ),
        },
        {
          path: '/logout',
          element: (
            <ProtectedResource
              accessBy={ProtectedResourceAccessBy.PROTECTED}
              displayType={ProtectedResourceDisplayType.DISABLED}
              resourceName={``}
              accessRights={``}
            >
              <Logout />
            </ProtectedResource>
          ),
        },
        // { path: '/items', exact: true, element: <ProtectedResource accessBy="authenticated" ><AllItems /></ProtectedResource> },
        {
          path: '/items',
          element: (
            <ProtectedResource
              accessBy={ProtectedResourceAccessBy.PROTECTED}
              displayType={ProtectedResourceDisplayType.DISABLED}
              resourceName={``}
              accessRights={``}
            >
              <AllItems />
            </ProtectedResource>
          ),
        },
        {
          path: '/items/:itemId',
          element: (
            <ProtectedResource
              accessBy={ProtectedResourceAccessBy.PROTECTED}
              displayType={ProtectedResourceDisplayType.DISABLED}
              resourceName={``}
              accessRights={``}
            >
              <ViewItem />
            </ProtectedResource>
          ),
        },
        {
          path: '/items/:itemId/edit',
          element: (
            <ProtectedResource
              accessBy={ProtectedResourceAccessBy.PROTECTED}
              displayType={ProtectedResourceDisplayType.DISABLED}
              resourceName={``}
              accessRights={``}
            >
              <EditItem />
            </ProtectedResource>
          ),
        },
        {
          path: '/merchants',
          element: (
            <ProtectedResource
              accessBy={ProtectedResourceAccessBy.PUBLIC}
              displayType={ProtectedResourceDisplayType.DISABLED}
              resourceName={``}
              accessRights={``}
            >
              <AllMerchants />
            </ProtectedResource>
          ),
        },
        // // { path: '/items/new', element: <NewItem /> },
        // { path: '/merchants', exact: true, element: <ProtectedResource accessBy={ProtectedResourceAccessBy.PROTECTED} ><AllItems /></ProtectedResource> },
        // { path: '/shops', exact: true, element: <ProtectedResource accessBy={ProtectedResourceAccessBy.PROTECTED} ><AllItems /></ProtectedResource> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]
);

export default router;

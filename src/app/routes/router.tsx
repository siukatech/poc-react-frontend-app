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
import ProtectedRoute, {
  ProtectedRouteAccessBy,
} from '../../base/components/Route/ProtectedRoute';

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
            <ProtectedRoute accessBy={ProtectedRouteAccessBy.PUBLIC}>
              <Login />
            </ProtectedRoute>
          ),
        },
        {
          path: '/logout',
          element: (
            <ProtectedRoute accessBy={ProtectedRouteAccessBy.PROTECTED}>
              <Logout />
            </ProtectedRoute>
          ),
        },
        // { path: '/items', exact: true, element: <ProtectedRoute accessBy="authenticated" ><AllItems /></ProtectedRoute> },
        {
          path: '/items',
          element: (
            <ProtectedRoute accessBy={ProtectedRouteAccessBy.PROTECTED}>
              <AllItems />
            </ProtectedRoute>
          ),
        },
        {
          path: '/items/:itemId',
          element: (
            <ProtectedRoute accessBy={ProtectedRouteAccessBy.PROTECTED}>
              <ViewItem />
            </ProtectedRoute>
          ),
        },
        {
          path: '/items/:itemId/edit',
          element: (
            <ProtectedRoute accessBy={ProtectedRouteAccessBy.PROTECTED}>
              <EditItem />
            </ProtectedRoute>
          ),
        },
        {
          path: '/merchants',
          element: (
            <ProtectedRoute accessBy={ProtectedRouteAccessBy.PUBLIC}>
              <AllMerchants />
            </ProtectedRoute>
          ),
        },
        // // { path: '/items/new', element: <NewItem /> },
        // { path: '/merchants', exact: true, element: <ProtectedRoute accessBy={ProtectedRouteAccessBy.PROTECTED} ><AllItems /></ProtectedRoute> },
        // { path: '/shops', exact: true, element: <ProtectedRoute accessBy={ProtectedRouteAccessBy.PROTECTED} ><AllItems /></ProtectedRoute> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]
);

export default router;

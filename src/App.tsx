import * as logo from './logo.svg';
import './App.css';

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

import Layout from './app/components/Layout/Layout';
import PersistentDrawerLeft from './app/components/Layout/PersistentDrawerLeft';
import Home from './app/pages/Main/Home';
import NotFound from './app/pages/Main/NotFound';
import ErrorPage from './app/pages/Main/ErrorPage';
import Login from './app/pages/Login/Login';
import Logout from './app/pages/Login/Logout';

import { AuthContextProvider } from './base/stores/AuthContext';
import ProtectedRoute, {
  ProtectedRouteAccessBy,
} from './base/components/Route/ProtectedRoute';

import AllItems from './app/pages/Item/AllItems';
import EditItem from './app/pages/Item/EditItem';
import ViewItem from './app/pages/Item/ViewItem';
import ContentLong from './app/pages/Sample/ContentLong';

const darkTheme = createTheme({
  palette: {
    // mode: 'dark',
    mode: 'light',
  },
});

const router = createBrowserRouter(
  // delfine method 1
  [
    {
      path: '/',
      element: (
        <ThemeProvider theme={darkTheme}>
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
        // // { path: '/items/new', element: <NewItem /> },
        // { path: '/merchants', exact: true, element: <ProtectedRoute accessBy={ProtectedRouteAccessBy.PROTECTED} ><AllItems /></ProtectedRoute> },
        // { path: '/shops', exact: true, element: <ProtectedRoute accessBy={ProtectedRouteAccessBy.PROTECTED} ><AllItems /></ProtectedRoute> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

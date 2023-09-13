import * as logo from './logo.svg';
import './App.css';

import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import Layout from './app/components/layout/Layout';
import PersistentDrawerLeft from './app/components/layout/PersistentDrawerLeft';
import Home from './app/pages/main/Home';
import NotFound from './app/pages/main/NotFound';
import ErrorPage from './app/pages/main/ErrorPage';
import Login from './app/pages/login/Login';
import Logout from './app/pages/login/Logout';

import { AuthContextProvider } from './base/stores/AuthContext';
import ProtectedRoute, {
  ProtectedRouteAccessBy,
} from './base/components/route/ProtectedRoute';
import AllItems from './app/pages/item/AllItems';
import EditItem from './app/pages/item/EditItem';
import ViewItem from './app/pages/item/ViewItem';
import ContentLong from './app/pages/sample/ContentLong';

const router = createBrowserRouter(
  // delfine method 1
  [
    {
      path: '/',
      element: (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthContextProvider>
            <Layout />
          </AuthContextProvider>
        </LocalizationProvider>
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

import logo from './logo.svg';
import './App.css';

import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Layout from './app/components/Layout/Layout';
import PersistentDrawerLeft from './app/components/Layout/PersistentDrawerLeft';
import Home from './app/pages/Main/Home';
import NotFound from './app/pages/Main/NotFound';
import ErrorPage from './app/pages/Main/ErrorPage';
import Login from './app/pages/Login/Login';
import Logout from './app/pages/Login/Logout';

import { AuthContextProvider } from './base/stores/AuthContext';
import ProtectedRoute from './base/components/Route/ProtectedRoute';
//import AllItems from './app/pages/Item/AllItems';
import ContentLong from './app/pages/Sample/ContentLong';

const router = createBrowserRouter(
  // delfine method 1
  [
    {
      path: '/',
      element: <AuthContextProvider><Layout /></AuthContextProvider>,
      // element: <AuthContextProvider><PersistentDrawerLeft /></AuthContextProvider>,
      errorElement: <ErrorPage />,
      //render: () => redirect('./toys'),
      children: [
        // { path: '', element: <Home /> },
        { path: '', element: <ContentLong /> },
        { path: '/samples/content-long', element: <ContentLong/> },
        { path: '/login', element: <ProtectedRoute accessBy="non-authenticated" ><Login /></ProtectedRoute> },
        { path: '/logout', element: <ProtectedRoute accessBy="authenticated" ><Logout /></ProtectedRoute> },
        // { path: '/items', exact: true, element: <ProtectedRoute accessBy="authenticated" ><AllItems /></ProtectedRoute> },
        // // { path: '/items/:itemId', element: <ItemDetail /> },
        // // { path: '/items/:itemId/edit', element: <EditItem /> },
        // // { path: '/items/new', element: <NewItem /> },
        // { path: '/merchants', exact: true, element: <ProtectedRoute accessBy="authenticated" ><AllItems /></ProtectedRoute> },
        // { path: '/shops', exact: true, element: <ProtectedRoute accessBy="authenticated" ><AllItems /></ProtectedRoute> },
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


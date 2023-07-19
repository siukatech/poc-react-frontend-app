import logo from './logo.svg';
import './App.css';

import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Layout from './components/layout/Layout';
import Home from './pages/main/Home';
import NotFound from './pages/main/NotFound';
import ErrorPage from './pages/main/ErrorPage';
import Login from './pages/login/Login';

import { AuthContextProvider } from './stores/AuthContext';
import ProtectedRoute from './components/route/ProtectedRoute';
import AllItems from './pages/item/AllItems';
import ContentLong from './pages/sample/ContentLong';

const router = createBrowserRouter(
  // delfine method 1
  [
    {
      path: '/',
      element: <AuthContextProvider><Layout /></AuthContextProvider>,
      errorElement: <ErrorPage />,
      //render: () => redirect('./toys'),
      children: [
        { path: '', element: <Home /> },
        { path: '/sample/content-long', element: <ContentLong/> },
        { path: '/login', element: <ProtectedRoute accessBy="non-authenticated" ><Login /></ProtectedRoute> },
        { path: '/items', exact: true, element: <ProtectedRoute accessBy="authenticated" ><AllItems /></ProtectedRoute> },
        // { path: '/items/:itemId', element: <ItemDetail /> },
        // { path: '/items/:itemId/edit', element: <EditItem /> },
        // { path: '/items/new', element: <NewItem /> },
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

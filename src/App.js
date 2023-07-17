import logo from './logo.svg';
import './App.css';

import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
  Route,
  Routes,
  BrowserRouter,
  //  Redirect,
  redirect,
  Outlet,
} from 'react-router-dom';

// import { OAuthPopup } from '@tasoskakour/react-use-oauth2';

import { AuthContextProvider } from "./stores/auth-context";

import Layout from './components/Layout/Layout';
import NotFound from './pages/Main/NotFound';
import ErrorPage from './pages/Main/ErrorPage';
import Home from './pages/Main/Home';
import Login from './pages/Main/Login';
import Redirect from './pages/Main/Redirect';

import AllToys from './pages/Toy/AllToys';
import ToyDetail from './pages/Toy/ToyDetail';
import NewToy from './pages/Toy/NewToy';
import EditToy from './pages/Toy/EditToy';
import AllItems from './pages/Item/AllItems';
import ItemDetail from './pages/Item/ItemDetail';
import NewItem from './pages/Item/NewItem';
import EditItem from './pages/Item/EditItem';

const router = createBrowserRouter(
  // delfine method 1
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      //render: () => redirect('./toys'),
      children: [
        //{ path: '', render: () => redirect('./toys') },
        // { path: '/callback', element: <OAuthPopup /> },
        // https://stackoverflow.com/a/69872699
        //{ path: '', element: <Navigate to='/toys' replace /> },
        { path: '', element: <Home /> },
        { path: '/login', element: <Login /> },
        { path: '/redirect', element: <Redirect /> },
        // { path: '/authorized', element: <Redirect /> },
        { path: '/toys', exact: true, element: <AllToys /> },
        { path: '/toys/:toyId', element: <ToyDetail /> },
        { path: '/toys/:toyId/edit', element: <EditToy /> },
        { path: '/toys/new', element: <NewToy /> },
        { path: '/items', exact: true, element: <AllItems /> },
        { path: '/items/:itemId', element: <ItemDetail /> },
        { path: '/items/:itemId/edit', element: <EditItem /> },
        { path: '/items/new', element: <NewItem /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]
  // delfine method 2
  /*
  createRoutesFromElements(
    //</Route><Route path="/" >
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />} >
      <Route path="" element={<Navigate to="/toys" replace />} />
      <Route path="/toys" exact element={<AllToys />} />
      <Route path="/toys/:toyId" element={<ToyDetail />} />
      <Route path="/toys/:toyId/edit" element={<EditToy />} />
      <Route path="/toys/new" element={<NewToy />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
  */
);

function App() {
  /*
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
  */
  return (
    <>
      <AuthContextProvider>
        {/*
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" exact render={() => redirect('./toys')} />
              <Route path="/toys" exact element={<AllToys />} />
              <Route path="/toys/:toyId" element={<ToyDetail />} />
              <Route path="/new-toy" element={<NewToy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        */}
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}

export default App;

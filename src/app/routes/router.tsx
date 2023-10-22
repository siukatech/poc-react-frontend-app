import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import ProtectedResource, {
  ProtectedResourceAccessBy,
  ProtectedResourceDisplayType,
} from '../../base/components/Security/ProtectedResource';

import RootElement from './RootElement';
import NotFound from '../pages/Main/NotFound';
import ErrorPage from '../pages/Main/ErrorPage';
import Login from '../pages/Login/Login';
import Logout from '../pages/Login/Logout';

import AllItems from '../pages/Item/AllItems';
import EditItem from '../pages/Item/EditItem';
import ViewItem from '../pages/Item/ViewItem';
import ContentLong from '../pages/Sample/ContentLong';

import AllMerchants from '../pages/Merchant/AllMerchants';
import ViewMerchant from '../pages/Merchant/ViewMerchant';
import EditMerchant from '../pages/Merchant/EditMerchant';


const router = createBrowserRouter(
  // delfine method 1
  [
    {
      path: '/',
      element: (
        <RootElement />
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
            // <ProtectedResource
            //   accessBy={ProtectedResourceAccessBy.PROTECTED}
            //   displayType={ProtectedResourceDisplayType.DISABLED}
            //   resourceName={``}
            //   accessRights={``}
            // >
            //   <Logout />
            // </ProtectedResource>
              <Logout />
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
        {
          path: '/merchants/:merchantId',
          element: (
            <ProtectedResource
              accessBy={ProtectedResourceAccessBy.PROTECTED}
              displayType={ProtectedResourceDisplayType.DISABLED}
              resourceName={``}
              accessRights={``}
            >
              <ViewMerchant />
            </ProtectedResource>
          ),
        },
        {
          path: '/merchants/:merchantId/edit',
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
        // {
        //   path: '/shops/:shopId',
        //   element: (
        //     <ProtectedResource
        //       accessBy={ProtectedResourceAccessBy.PROTECTED}
        //       displayType={ProtectedResourceDisplayType.DISABLED}
        //       resourceName={``}
        //       accessRights={``}
        //     >
        //       <ViewItem />
        //     </ProtectedResource>
        //   ),
        // },
        // {
        //   path: '/shops/:shopId/edit',
        //   element: (
        //     <ProtectedResource
        //       accessBy={ProtectedResourceAccessBy.PROTECTED}
        //       displayType={ProtectedResourceDisplayType.DISABLED}
        //       resourceName={``}
        //       accessRights={``}
        //     >
        //       <EditItem />
        //     </ProtectedResource>
        //   ),
        // },
        // // { path: '/items/new', element: <NewItem /> },
        // { path: '/merchants', exact: true, element: <ProtectedResource accessBy={ProtectedResourceAccessBy.PROTECTED} ><AllItems /></ProtectedResource> },
        // { path: '/shops', exact: true, element: <ProtectedResource accessBy={ProtectedResourceAccessBy.PROTECTED} ><AllItems /></ProtectedResource> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]
);

export default router;

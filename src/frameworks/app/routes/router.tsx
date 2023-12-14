import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import ProtectedResource, {
  ProtectedResourceAccessBy,
  ProtectedResourceDisplayType,
} from '../../../features/auth/components/ProtectedResource';

import RouterMain from '../pages/RouterMain';
import NotFound from '../pages/NotFound';
import ErrorPage from '../pages/ErrorPage';

// import Login from '../../../features/auth/pages/Login';
// import Logout from '../../../features/auth/pages/Logout';
import { Login, Logout } from '../../../features/auth';

// import AllItems from '../../../features/item/pages/AllItems';
// import EditItem from '../../../features/item/pages/EditItem';
// import ViewItem from '../../../features/item/pages/ViewItem';
import { AllItems, EditItem, ViewItem } from '../../../features/item';

// import ContentLong from '../../../features/sample/pages/ContentLong';
import { ContentLong } from '../../../features/sample';

// import AllMerchants from '../../../features/merchant/pages/AllMerchants';
// import ViewMerchant from '../../../features/merchant/pages/ViewMerchant';
// import EditMerchant from '../../../features/merchant/pages/EditMerchant';
import {
  AllMerchants,
  ViewMerchant,
  EditMerchant,
} from '../../../features/merchant';

const router = createBrowserRouter(
  // delfine method 1
  [
    {
      path: '/',
      element: <RouterMain />,
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
            // <ProtectedResource
            //   accessBy={ProtectedResourceAccessBy.PUBLIC}
            //   displayType={ProtectedResourceDisplayType.DISABLED}
            //   resourceName={``}
            //   accessRights={``}
            // >
            //   <AllMerchants />
            // </ProtectedResource>
            <AllMerchants />
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
              <EditMerchant />
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

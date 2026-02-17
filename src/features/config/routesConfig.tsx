
// import {
//   createBrowserRouter,
//   BrowserRouter,
//   RouterProvider,
// } from 'react-router-dom';

import {
  ProtectedResource,
  ProtectedResourceAccessBy,
  ProtectedResourceDisplayType,
} from '../../framework/auth';

// import RouterMain from '../../framework/layout/pages/RouterMain';
import NotFound from '../../framework/layout/pages/NotFound';
// import ErrorPage from '../../framework/layout/pages/ErrorPage';

// import Login from '../auth/pages/Login';
// import Logout from '../auth/pages/Logout';
// import Redirect from '../auth/pages/Redirect';
import { Login, Logout, Redirect } from '../auth';

// import AllItems from '../item/pages/AllItems';
// import EditItem from '../item/pages/EditItem';
// import ViewItem from '../item/pages/ViewItem';
import { AllItems, EditItem, ViewItem } from '../item';

// import ContentLong from '../sample/pages/ContentLong';
import { ContentLong } from '../sample';

// import AllMerchants from '../merchant/pages/AllMerchants';
// import ViewMerchant from '../merchant/pages/ViewMerchant';
// import EditMerchant from '../merchant/pages/EditMerchant';
import {
  AllMerchants,
  ViewMerchant,
  EditMerchant,
} from '../merchant';


const childenRoutes = [
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
  {
    path: '/redirect', 
    element: (
      <ProtectedResource
        accessBy={ProtectedResourceAccessBy.PUBLIC}
        displayType={ProtectedResourceDisplayType.DISABLED}
        resourceName={``}
        accessRights={``}
      >
        <Redirect />
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
];


export {
  childenRoutes,
};

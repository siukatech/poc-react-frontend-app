import * as logo from './logo.svg';
import './App.css';

import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
} from 'react-router-dom';

// import router from './frameworks/app/routes/router';
import { router } from './frameworks/app';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

import React, { Fragment, useState } from 'react';
import { Outlet } from 'react-router-dom';

import classes from './Layout.module.css';
import TopNavigation from './TopNavigation';
import LeftSideBar from './LeftSideBar';
import MainContent from './MainContent';

const Layout = (props) => {
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const leftSidebarCollapsedHandler = () => {
    setLeftSidebarCollapsed(!leftSidebarCollapsed);
  };

  return (
    <Fragment>
      <TopNavigation onLeftSidebarCollapsed={leftSidebarCollapsedHandler} />
      <div className={classes.content}>
        <LeftSideBar
          onLeftSidebarCollapsed={leftSidebarCollapsedHandler}
          leftSidebarCollapsed={leftSidebarCollapsed}
        />
        <MainContent>
          {
            /*<main>{props.children}</main>*/
            <Outlet />
          }
        </MainContent>
      </div>
    </Fragment>
  );
};

export default Layout;

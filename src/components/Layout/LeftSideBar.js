import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
  MenuItemStyles,
} from 'react-pro-sidebar';
import { useTranslation } from 'react-i18next';

import classes from './LeftSideBar.module.css';

const LeftSideBar = (props) => {
  const { t } = useTranslation();
  const collapsed = props.leftSidebarCollapsed;

  return (
    <>
      <Sidebar style={{height: '100%'}} collapsed={collapsed} collapsedWidth="0px">
        <Menu>
          {/*
          <MenuItem>
            <NavLink to="/toys" className={classes.active}>
              {t('menu.toys.all')}
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/toys/new" className={classes.active}>
              {t('menu.toys.add')}
            </NavLink>
          </MenuItem>
  */}
          <SubMenu label={t('menu.items')}>
            <MenuItem component="div" ><NavLink to="/items" className={classes.active}>{t('menu.items.all')}</NavLink></MenuItem>
            <MenuItem component="div" ><NavLink to="/items/new" className={classes.active}>{t('menu.items.add')}</NavLink></MenuItem>
          </SubMenu>
          <SubMenu label={t('menu.shops')}>
            <MenuItem component="div" ><NavLink to="/shops" className={classes.active}>{t('menu.shops.all')}</NavLink></MenuItem>
            <MenuItem component="div" ><NavLink to="/shops/new" className={classes.active}>{t('menu.shops.add')}</NavLink></MenuItem>
          </SubMenu>
          <MenuItem> Examples</MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};

export default LeftSideBar;

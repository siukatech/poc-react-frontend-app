import { useState, useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Theme, styled } from '@mui/material/styles';
import {
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';

import AuthContext from '../../../base/stores/AuthContext';

import DrawerHeader from '../UI/DrawerHeader';
import ImgComponent from '../UI/ImgComponent';
import IconComponent, { IconNames } from '../UI/IconComponent';

import logo192 from '../../assets/logo192.png';

const pages = [
  { i18n: 'menu.home', link: '/', icon: 'Home' },
  { i18n: 'menu.items', link: '/items', icon: 'Event' },
  { i18n: 'menu.shops', link: '/shops', icon: 'Storefront' },
  { i18n: 'menu.merchants', link: '/merchants', icon: 'Storefront' },
];

type DrawerMenuProps = {
  theme: Theme;
  toggleDrawerHandler: () => void;
  // pages: any[];
};

const DrawerMenu: React.FC<DrawerMenuProps> = ({
  theme,
  toggleDrawerHandler,
  // pages,
}) => {
  const { t, i18n } = useTranslation();
  const { user, doLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <DrawerHeader>
        <ImgComponent
          src={logo192}
          sx={{ width: 45, marginLeft: 'auto', marginRight: 'auto' }}
        />
        <IconButton onClick={toggleDrawerHandler}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {pages.map((page) => (
          <ListItem key={page.i18n} disablePadding>
            <ListItemButton onClick={() => navigate(page.link)}>
              <ListItemIcon>
                <IconComponent name={page.icon as IconNames} />
              </ListItemIcon>
              <ListItemText primary={t(`${page.i18n}`)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default DrawerMenu;

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

import logo192 from '../../../assets/logo192.png';

import {
  ProtectedResource,
  ProtectedResourceAccessBy,
  ProtectedResourceDisplayType,
  useAuthContext,
} from '../../../features/auth';

import DrawerHeader from '../../ui/components/DrawerHeader';
import ImgComponent from '../../ui/components/ImgComponent';
import IconComponent, { IconNames } from '../../ui/components/IconComponent';

const pages = [
  { i18n: 'menu.home', link: '/', icon: 'HomeOutlined' },
  { i18n: 'menu.items', link: '/items', icon: 'Event' },
  { i18n: 'menu.shops', link: '/shops', icon: 'ShopOutlined' },
  { i18n: 'menu.merchants', link: '/merchants', icon: 'Storefront' },
  { i18n: 'menu.i18n', link: '/i18ns', icon: 'Language' },
];

type DrawerMenuProps = {
  theme: Theme;
  handleDrawerToggle: () => void;
  // pages: any[];
};

const DrawerMenu: React.FC<DrawerMenuProps> = ({
  theme,
  handleDrawerToggle,
  // pages,
}) => {
  const { t, i18n } = useTranslation();
  const { user, doLogout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <>
      <DrawerHeader>
        <ImgComponent
          src={logo192}
          sx={{ width: 45, marginLeft: 'auto', marginRight: 'auto' }}
        />
        <IconButton onClick={handleDrawerToggle}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List
        sx={{
          ml: 0.8,
        }}
      >
        {pages.map((page) => (
          <ProtectedResource
            key={page.i18n}
            accessBy={ProtectedResourceAccessBy.PROTECTED}
            displayType={ProtectedResourceDisplayType.DISABLED}
            resourceName={`${page.i18n}`}
            accessRights={`view`}
          >
            <ListItem key={page.i18n} disablePadding>
              <ListItemButton title={t(`${page.i18n}`)} onClick={() => navigate(page.link)}>
                <ListItemIcon >
                  <IconComponent name={page.icon as IconNames} />
                </ListItemIcon>
                <ListItemText primary={t(`${page.i18n}`)} />
              </ListItemButton>
            </ListItem>
          </ProtectedResource>
        ))}
      </List>
    </>
  );
};

export default DrawerMenu;

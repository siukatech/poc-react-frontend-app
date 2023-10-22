import { useState, useContext, useEffect } from 'react';

import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

import AuthContext from '../../../base/stores/AuthContext';

import {
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

import { Language as LanguageIcon } from '@mui/icons-material';

const NavLang = () => {
  const { t, i18n, ready } = useTranslation();

  const langs = [
    { lang: 'en', i18n: 'menu.lang.en' },
    { lang: 'zh-TW', i18n: 'menu.lang.zh' },
    { lang: 'zh-CN', i18n: 'menu.lang.cn' },
  ];

  const handleLanguageChange = (lng: string) => {
    console.log('handleLanguageChange - ready: ', ready);
    if (ready) {
      i18n.changeLanguage(lng);
      localStorage.setItem('i18nlng', lng);
    }
  };

  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);

  const handleLangMenuOpen = (evt: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(evt.currentTarget);
  };
  const handleLangMenuClose = () => {
    setAnchorElLang(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title={t('menu.lang')}>
          <IconButton
            onClick={handleLangMenuOpen}
            size="large"
            aria-label={t('menu.lang')}
            aria-controls="menu-lang"
            aria-haspopup="true"
            color="inherit"
            sx={{ p: 1 }}
          >
            <LanguageIcon />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-lang"
          anchorEl={anchorElLang}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElLang)}
          onClose={handleLangMenuClose}
        >
          {langs.map((lang, idx) => (
            <MenuItem
              key={idx}
              onClick={() => {
                handleLangMenuClose();
                handleLanguageChange(lang.lang);
              }}
            >
              <Typography textAlign="center">{t(`${lang.i18n}`)}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
};

export default NavLang;

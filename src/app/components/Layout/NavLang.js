import { useState, useContext, useEffect } from 'react';

import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

import AuthContext from '../../../base/stores/AuthContext';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import LanguageIcon from '@mui/icons-material/Language';

const NavLang = () => {
  const { t, i18n } = useTranslation();

  const langs = [
    { lang: 'en', i18n: 'menu.lang.en' },
    { lang: 'zh-TW', i18n: 'menu.lang.zh' },
    { lang: 'zh-CN', i18n: 'menu.lang.cn' },
  ];

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nlng', lng);
  };

  const [anchorElLang, setAnchorElLang] = useState(null);

  const handleLangMenuOpen = (event) => {
    setAnchorElLang(event.currentTarget);
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

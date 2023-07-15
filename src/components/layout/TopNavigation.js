import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useTranslation, Trans } from 'react-i18next';

import classes from './TopNavigation.module.css';

import UserCorner from './UserCorner';

const TopNavigation = (props) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nlng', lng);
  };

  return (
    <header className={classes.header}>
      <section className={classes.logo} style={{width: '30%'}}>
        <span style={{padding: '0 10px 0 0'}}><button onClick={props.onLeftSidebarCollapsed}>=</button></span>
        <NavLink to="/" className={classes.active}>
          Toy Records
        </NavLink>
      </section>
      <section style={{width: '60%'}}>

      </section>
      <nav className={`${classes.nav} ${classes['primary-navigation']}`}>
        <ul>
          <li>
            <NavLink to="/about" className={classes.active}>
              {t('menu.about')}
            </NavLink>
            <ul>
              <li>
                <NavLink to="/faq" >
                  {t('menu.faq')}
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" >
                  {t('menu.contact')}
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink className={classes.active}>{t('menu.lang')}</NavLink>
            <ul>
              <li>
                <span
                  onClick={() => {
                    changeLanguage('en');
                  }}
                >
                  {t('menu.lang.en')}
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    changeLanguage('zh-TW');
                  }}
                >
                  {t('menu.lang.zh')}
                </span>
              </li>
              <li>
                <span
                  onClick={() => {
                    changeLanguage('zh-CN');
                  }}
                >
                  {t('menu.lang.cn')}
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <UserCorner />
    </header>
  );
};

export default TopNavigation;

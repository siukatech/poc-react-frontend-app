import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import classes from './UserCorner.module.css';
import styles from './TopNavigation.module.css';

const user = {
  id: 'admin',
  name: 'Admin',
};

const UserCorner = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <nav
        className={`${classes['user-corner']} ${styles.nav} ${styles['primary-navigation']}`}
      >
        <ul>
          <li>
            <NavLink to={'/redirect'}>Login</NavLink>
          </li>
          <li>
            <NavLink className={styles.active}>{user.name}</NavLink>
            <ul>
              <li>
                <NavLink to="/about">{t('menu.about')}</NavLink>
              </li>
              <li>
                <NavLink to="/faq">{t('menu.faq')}</NavLink>
              </li>
              <li>
                <NavLink to="/contact">{t('menu.contact')}</NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default UserCorner;

import { useState, useContext } from 'react';

import { Nav, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Gear, Person, PersonCircle } from 'react-bootstrap-icons';
import { useTranslation, Trans } from 'react-i18next';

import AuthContext from '../../../base/stores/AuthContext';


const NavUser = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      {user && (
        <>
          <NavDropdown
            title={
              <span>
                <PersonCircle /> {user?.loginId}
              </span>
            }
            id="collasible-nav-dropdown"
          >
            <NavDropdown.Item href="/user/profile">
              <Person /> {t('User Profile')}
            </NavDropdown.Item>
            <NavDropdown.Item href="/settings"><Gear /> {t('Setting')}</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item
              onClick={() => {
                logout();
              }}
            >
              <BoxArrowRight /> {t('Logout')}
            </NavDropdown.Item>
          </NavDropdown>
        </>
      )}
    </>
  );
};

export default NavUser;

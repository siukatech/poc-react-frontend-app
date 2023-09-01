import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Book,
  Cart3,
  Envelope,
  EnvelopeExclamation,
  House,
  Inboxes,
  ChatSquareDots,
  Shop,
} from 'react-bootstrap-icons';
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import { useTranslation } from 'react-i18next';

const SideNavMenu = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <>
      <SideNav
        className="sidenav-menu"
        onSelect={(selected) => {
          // selected = eventKey of selected NavItem
          console.log('SideNavMenu - selected: ', selected);
          navigate('/' + selected);
        }}
      >
        <Toggle />
        <Nav defaultSelected="home">
          <NavItem eventKey="home">
            <NavIcon>
              <House />
            </NavIcon>
            <NavText>{t('Home')}</NavText>
          </NavItem>
          <NavItem eventKey="samples">
            <NavIcon>
              <Book />
            </NavIcon>
            <NavText>{t('Content Long')}</NavText>
            <NavItem eventKey="samples/content-long">
              <NavText>{t('Long Content')}</NavText>
            </NavItem>
          </NavItem>
          <NavItem eventKey="messages">
            <NavIcon>
              {/*<Envelope />
               */}
              <ChatSquareDots />
            </NavIcon>
            <NavText>{t('Messages')}</NavText>
          </NavItem>
          <NavItem eventKey="items">
            <NavIcon>
              <Cart3 />
            </NavIcon>
            <NavText>{t('Items')}</NavText>
          </NavItem>
          <NavItem eventKey="merchants">
            <NavIcon>
              <Shop />
            </NavIcon>
            <NavText>{t('Merchants')}</NavText>
            <NavItem eventKey="merchants">
              <NavText>{t('Merchants')}</NavText>
            </NavItem>
            <NavItem eventKey="shops">
              <NavText>{t('Shops')}</NavText>
            </NavItem>
          </NavItem>
        </Nav>
      </SideNav>
    </>
  );
};

export default SideNavMenu;

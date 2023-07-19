import { useState, useContext, useEffect, useTransition } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import {
  Button,
  Container,
  Offcanvas,
  Nav,
  NavDropdown,
  Row,
  Col,
} from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

import AuthContext from '../../stores/AuthContext';

import NavLang from './NavLang';
import NavNoti from './NavNoti';
import NavUser from './NavUser';

//import SidebarMenu from './SidebarMenu';
import SidebarMenu from 'react-bootstrap-sidebar-menu';

const Layout = ({ children }) => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useContext(AuthContext);

  let navContent = (
    <>
      <Nav className="me-auto">
        {user && (
          <>
            <Nav.Link as={Link} to="/merchants">
              {t('menu.merchants.all')}
            </Nav.Link>
            <Nav.Link as={Link} to="/shops">
              {t('menu.shops.all')}
            </Nav.Link>
            <Nav.Link as={Link} to="/items">
              {t('menu.items.all')}
            </Nav.Link>
          </>
        )}
      </Nav>
      <Nav className="me-1">
        <NavLang />
      </Nav>
      <Nav className="me-1">
        {user && (
          <>
            <NavNoti />
          </>
        )}
      </Nav>
      <Nav className="me-1">
        {!user && (
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
        )}
        {user && (
          <>
            <NavUser />
          </>
        )}
      </Nav>
      {/*user && (
        <Button
          variant="outline-secondary"
          type="button"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
        )*/}
    </>
  );

  //"responsive-navbar-nav"
  // className='justify-content-end'

  // should use sticky="top"
  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        bg="dark"
        data-bs-theme="dark"
        collapseOnSelect
      >
        <Container fluid>
          <Navbar.Brand>
            <Nav.Link as={Link} to="/">
              Poc React Bootstrap Demo
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {navContent}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/*
      <SidebarMenu
        defaultExpanded={true}
        exclusiveExpand={true}
        variant="light"
        bg="dark"
        rtl={true}
        hide="md"
      >
        <SidebarMenu.Collapse>
          <SidebarMenu.Header>Sidebar menu</SidebarMenu.Header>
          <SidebarMenu.Toggle />
        </SidebarMenu.Collapse>
        <SidebarMenu.Body>
          <SidebarMenu.Nav>
            <SidebarMenu.Nav.Link href="/items">
              {t('menu.items.all')}
            </SidebarMenu.Nav.Link>
          </SidebarMenu.Nav>
        </SidebarMenu.Body>
        <SidebarMenu.Footer>{t('Footer')}</SidebarMenu.Footer>
      </SidebarMenu>
  */}
      <Navbar expand="false" fixed="bottom" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand>
            <Nav.Link as={Link} to="/">
              Poc React Bootstrap Demo
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <>
                {/*
                <Nav className="ms-auto">
                  {user && (
                    <>
                      {notificationItems && (
                        <NavDropdown
                          title={
                            <span>
                              <img /> Notification
                            </span>
                          }
                        >
                          {notificationItems.map((notification, i) => {
                            <NavDropdown.Item href={notification.href}>
                              {notification.content}
                            </NavDropdown.Item>;
                          })}
                        </NavDropdown>
                      )}
                    </>
                  )}
                </Nav>
                        */}
                {navContent}
              </>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {/*<Container>{children}</Container>
       */}
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;

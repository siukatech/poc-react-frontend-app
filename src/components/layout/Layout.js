import { useContext } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

import { Link, Outlet } from 'react-router-dom';

import AuthContext from '../../stores/AuthContext';

const Layout = ({ children }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand>
          <Nav.Link as={Link} to="/">
            Auth Demo
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            {user && (
              <Nav.Link as={Link} to="/items" >
                Items All
              </Nav.Link>
            )}
          </Nav>
          <Nav className="ms-auto">
            {!user && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
            {user && <Nav.Link href="#">{user?.userId}</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
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

import { Container, Row, Navbar, Nav, Offcanvas, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


/*
      <Container fluid>
        <Row className="flex-nowrap">
          <Col className="col-auto px-0">

          </Col>
        </Row>
      </Container>
*/
const SidebarMenu = () => {
  return (
    <>
            <Navbar
              bg="light"
              data-bs-theme="light"
            >
              <Navbar.Brand>
                <Nav.Link as={Link} to="/">
                  Sidebar
                </Nav.Link>
              </Navbar.Brand>
              <Navbar.Toggle />
              <Nav className="mb-auto flex-column">
                <Nav.Item>
                  <Nav.Link href="/" >Item 1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/" >Item 2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/" >Item 3</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/" >Item 4</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar>

      {/*
      <Offcanvas show={true} backdrop={false} scroll={true}>
        <Offcanvas.Header>
          <Offcanvas.Title>Sidebar Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav variant='pills' className="flex-column">

          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
*/}
    </>
  );
};

export default SidebarMenu;

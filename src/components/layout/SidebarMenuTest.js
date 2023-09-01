import { Container, NavbarBrand, Row } from 'react-bootstrap';

import classes from './SidebarMenuRaw.css';
import { ChevronBarLeft, Microsoft, Speedometer, Toggles } from 'react-bootstrap-icons';

const SidebarMenuTest = () => {
  let divClasses = "";
  divClasses = "bg-dark col-auto min-vh-100 d-flex justify-content-between flex-column";
  return (
    <>
      <div style={{height: '100%'}} >
        <div className={divClasses} style={{height: '100%'}}>
          <div>
            <a className="text-decoration-none d-none d-sm-inline d-flex align-itemcenter ms-3 mt-3">
              <span className="ms-1 fs-4 text-white d-none d-sm-inline">
                Brand
                {/*<ChevronBarLeft />*/}
              </span>
            </a>
            <hr className="text-secondary d-none d-sm-block" />
            <ul
              className="nav nav-pills flex-column mt-3 mmt-sm-0"
              id="parentM"
            >
              <li className="nav-item fs-4 my-1 py-2 py-sm-0">
                <a
                  href="#"
                  className="nav-link active fs-5"
                  aria-current="page"
                >
                  <Microsoft title='Dashboard' />
                  <span className="ms-3 text-white d-none d-sm-inline">
                    Dashboard
                  </span>
                </a>
              </li>
              <li className="nav-item fs-4 my-1 py-2 py-sm-0">
                <a href="#" className="nav-link fs-5" aria-current="page">
                  <span className="ms-3 text-white d-none d-sm-inline">
                    Link
                  </span>
                </a>
              </li>
              <li className="nav-item fs-4 my-1 py-2 py-sm-0">
                <a
                  href="#submenu"
                  className="nav-link text-white fs-5"
                  aria-current="page"
                  data-bs-toggle="collapse"
                >
                  <i className="bi bi-grid"></i>
                  <span className="ms-3 text-white d-none d-sm-inline">
                    Products
                  </span>
                  <i className="bi bi-arrow-down-short ms-3 ms-sm-3"></i>
                </a>
                <ul
                  className="nav collapse-bak ms-2 flex-column"
                  id="submenu"
                  data-bs-parent="parentM"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link text-white"
                      href="#"
                      aria-current="page"
                    >
                      <span className="d-none d-sm-inline">Item 1</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link text-white"
                      href="#"
                      aria-current="page"
                    >
                      <span className="d-none d-sm-inline">Item 2</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <NavbarBrand>Brand</NavbarBrand>
          <Nav>
            <Nav.L
          </Nav>
          <div className="dropdown open" >
            <a
              className="text-decoration-non text-white dropdown-toggle p-3"
              type="button"
              id="triggerId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="ms-2 d-none d-sm-inline">Dropdown Anchor</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="triggerId">
              <a className="dropdown-item" href="#">
                <span className="d-sm-inline">1</span>
                <span className="d-none d-sm-block">Action</span>
              </a>
              <a className="dropdown-item disabled" href="#">
                <span className="d-sm-inline">2</span>
                <span className="d-none d-sm-block">Disabled action</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMenuTest;

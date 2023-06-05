import { Link } from "react-router-dom";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { checkAuthentication, getUsername } from '../utils/auth';
import React, { useState, useEffect } from 'react';

const AuthNavbar = ({ handleLogout }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const navigate = checkAuthentication();
    if (navigate) {
      return navigate;
    }

    const fetchUsername = async () => {
      const username = await getUsername();
      setUsername(username);
    };

    fetchUsername();
  }, []);

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    <img
                      alt="..."
                      src={require("../../assets/img/brand/argon-react.png")}
                    />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nav-link-icon" to="/dashboard" tag={Link}>
                  <i className="ni ni-planet" />
                  <span className="nav-link-inner--text">Dashboard</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  onClick={handleLogout}
                  to="/login"
                  tag={Link}
                >
                  <i className="ni ni-user-run" />
                  <span className="nav-link-inner--text">Logout</span>
                </NavLink>
              </NavItem>
              <NavItem>
          <NavLink
            className="nav-link-icon"
            to="/admin/user-profile"
            tag={Link}
          >
            <i className="ni ni-single-02" />
            <span className="nav-link-inner--text">{username}</span>
          </NavLink>
        </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AuthNavbar;
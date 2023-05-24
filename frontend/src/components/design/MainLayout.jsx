import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/MainLayout.css';

const MainLayout = ({ children, username, handleLogout }) => {
    return (
      <div className="main-layout">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home">My Admin Panel</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#dashboard">Dashboard</Nav.Link>
              <NavDropdown title="Users" id="basic-nav-dropdown">
                <NavDropdown.Item href="#users">All Users</NavDropdown.Item>
                <NavDropdown.Item href="#add-user">Add User</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
            <Navbar.Text>{username}</Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <Container fluid className="content-container">
          {children}
        </Container>
      </div>
    );
  };

export default MainLayout;
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const AdminNavbar = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    console.log(`Navigating to ${page}`); // Debugging log
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    if (!token) {
      // Redirect to login if token is missing
      alert("Please log in to access this page.");
      navigate('/login');
      return;
    }

    navigate(page);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/admin-dashboard">Admin Panel</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/admin-dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/admin-assigned-orders">Assigned Orders</Nav.Link>
          <Nav.Link as={Link} to="/admin-products">Products</Nav.Link>
          <Nav.Link as={Link} to="/admin-users">Users</Nav.Link>
        </Nav>
        <Button variant="outline-light" className="mr-2" onClick={() => handleNavigation('/admin-settings')}>Settings</Button>
        <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
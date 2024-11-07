import React from 'react';
import './Navbar.css';
import { FaBox } from 'react-icons/fa';

const Navbar = () => {
  const handleNavigation = (page) => {
    if (page === 'order-form') {
      window.location.href = '/order-form'; // Direct URL navigation for Order Form
    } else if (page === 'my-orders') {
      window.location.href = '/my-orders'; // Direct URL navigation for My Orders
    } else if (page === 'logout') {
      // Handle logout logic here
      window.location.href = '/logout'; // Direct URL navigation for Logout
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top thin-navbar">
      <div className="container">
        <header className="header">
          <h1>Delivery Service <FaBox /></h1>
          <p>Reliable and fast delivery at your fingertips</p>
        </header>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavigation('order-form')}>Order Form</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavigation('my-orders')}>My Orders</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={() => handleNavigation('logout')}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import './Navbar.css';
import { FaBox } from 'react-icons/fa';

const Navbar = ({ handleLogout }) => {
  const handleNavigation = (page) => {
    console.log(`Navigating to ${page}`); // Debugging log
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    if (!token) {
      // Redirect to login if token is missing
      alert("Please log in to access this page.");
      window.location.href = '/login';
      return;
    }

    if (page === 'order-form') {
      window.location.href = '/order-form';
    } else if (page === 'my-orders') {
      window.location.href = '/my-orders';
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
              <button className="nav-link" onClick={() => handleNavigation('order-form')}>Order Form</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => handleNavigation('my-orders')}>View My Orders</button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

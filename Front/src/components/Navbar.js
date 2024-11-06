import React from 'react';
import './Navbar.css';
import { FaBox } from 'react-icons/fa';

const Navbar = ({ setIsViewingOrders }) => {
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
            <button className="nav-link" onClick={() => setIsViewingOrders(false)}>
        Place a New Order
      </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={() => setIsViewingOrders(true)}>
                View My Orders
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

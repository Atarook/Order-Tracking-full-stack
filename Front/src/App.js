<<<<<<< Updated upstream
// src/App.js

import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

function App() {
  // State to toggle between login and registration forms
  const [isLogin, setIsLogin] = useState(true);

  // Function to toggle between forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="App">
      {/* Conditionally render Login or Registration Form */}
      {isLogin ? <LoginForm /> : <RegistrationForm />}
      
      {/* Button to toggle between forms */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {isLogin ? (
          <p style={{fontSize:'20px'}}>
            Don't have an account?{' '}
            <button onClick={toggleForm} className="toggle-btn btn">
              Register
            </button>
          </p>
        ) : (
          <p style={{fontSize:'20px'}}>
            Already have an account?{' '}
            <button onClick={toggleForm} className="toggle-btn btn">
              Login
            </button>
          </p>
        )}
      </div>
    </div>
=======
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar'; // Example admin navbar
import OrderForm from './components/OrderForm';
import MyOrders from './components/MyOrders';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './components/AdminDashboard'; // Example admin component\
import CourierDashboard from './components/CourierDashboard'; // Example courier component
import AdminAssignedOrders from './components/AdminAssignedOrders';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check for token and role in local storage on app initialization
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserRole(null);
    window.location.href = '/login'; // Redirect to login page after logout
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const currentPage = window.location.pathname;

  useEffect(() => {
    if (currentPage === '/order-form') {
      document.title = 'Order Form'; // Set page title for Order Form
    } else if (currentPage === '/my-orders') {
      document.title = 'My Orders'; // Set page title for My Orders
    } else if (currentPage === '/admin-dashboard') {
      document.title = 'Admin Dashboard'; // Set page title for Admin Dashboard
    }
  }, [currentPage]);

  if (!isLoggedIn) {
    return (
      <div className="App">
        {isLogin ? (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <RegistrationForm />
        )}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {isLogin ? (
            <p style={{ fontSize: '20px' }}>
              Don't have an account?{' '}
              <button onClick={toggleForm} className="toggle-btn btn">
                Register
              </button>
            </p>
          ) : (
            <p style={{ fontSize: '20px' }}>
              Already have an account?{' '}
              <button onClick={toggleForm} className="toggle-btn btn">
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar handleLogout={handleLogout} />
      {userRole === 'admin' && <AdminNavbar />}
      <Routes>
        {userRole === 'admin' && (
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-assigned-orders" element={<AdminAssignedOrders />} />
            <Route path="/order-form" element={<OrderForm />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </>
        )}
        {userRole === 'courier' && (
          <>
            <Route path="/courier-dashboard" element={<CourierDashboard />} />
            <Route path="/order-form" element={<OrderForm />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </>
        )}
        {userRole === 'customer' && (
          <>
            <Route path="/order-form" element={<OrderForm />} />
            <Route path="/my-orders" element={<MyOrders />} />
          </>
        )}
        <Route path="*" element={<Navigate to={userRole === 'admin' ? '/admin-dashboard' : '/my-orders'} />} />
      </Routes>
    </Router>
>>>>>>> Stashed changes
  );
};

export default App;

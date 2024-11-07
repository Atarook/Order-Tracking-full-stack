import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminNavbar from './components/AdminNavbar';
import OrderForm from './components/OrderForm';
import MyOrders from './components/MyOrders';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import AdminAssignedOrders from './components/AdminAssignedOrders';
import CourierDashboard from './components/CourierDashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
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
    window.location.href = '/login';
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

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
          <Route path="/admin-assigned-orders" element={<AdminAssignedOrders />} />
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
  );
};

export default App;

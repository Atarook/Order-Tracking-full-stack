import React, { useState, useEffect } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Navbar from './components/Navbar';
import CourierDashboard from './components/CourierDashboard';
import AdminDashboard from './components/AdminDashboard';
import OrderForm from './components/OrderForm';
import MyOrders from './components/MyOrders'; // Assuming this is the component for My Orders

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const toggleForm = () => setIsLogin(!isLogin);

  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  // Determine the current path
  const currentPage = window.location.pathname;

  useEffect(() => {
    if (currentPage === '/order-form') {
      document.title = 'Order Form'; // Set page title for Order Form
    } else if (currentPage === '/my-orders') {
      document.title = 'My Orders'; // Set page title for My Orders
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


  
  // Render different components based on the URL path
  if (currentPage === '/order-form') {
    return (
      <div className="App">
        <Navbar />
        <OrderForm />
      </div>
    );
  }

  if (currentPage === '/my-orders') {
    return (
      <div className="App">
        <Navbar />
        <MyOrders />
      </div>
    );
  }

  return (
    <div className="App">
      <Navbar />
      {userRole === 'admin' ? (
        <AdminDashboard />
      ) : userRole === 'courier' ? (
        <CourierDashboard />
      ) : userRole === 'customer' ? (
        <OrderForm />
      ) : (
        <p>Welcome! You are logged in, but you do not have access to a specific dashboard.</p>
      )}
    </div>
  );
}

export default App;

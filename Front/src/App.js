import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Navbar from './components/Navbar';
import CourierDashboard from './components/CourierDashboard';
import AdminDashboard from './components/AdminDashboard';
import OrderForm from './components/OrderForm';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const toggleForm = () => setIsLogin(!isLogin);
  
  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        {isLogin ? <LoginForm onLoginSuccess={handleLoginSuccess} /> : <RegistrationForm />}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {isLogin ? (
            <p style={{ fontSize: '20px' }}>
              Don't have an account?{' '}
              <button onClick={toggleForm} className="toggle-btn btn">Register</button>
            </p>
          ) : (
            <p style={{ fontSize: '20px' }}>
              Already have an account?{' '}
              <button onClick={toggleForm} className="toggle-btn btn">Login</button>
            </p>
          )}
        </div>
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

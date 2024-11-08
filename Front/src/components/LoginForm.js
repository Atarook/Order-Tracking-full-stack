import React, { useState } from 'react';
import axios from 'axios';
import { getToken, setToken } from './authHelpers';
import './RegistrationForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(''); // State for message
  const [messageType, setMessageType] = useState(''); // State for message type

<<<<<<< Updated upstream
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:8000/login", { email, password });
    setMessageType("success");
    setMessage("Login successful!");
  } catch (error) {
    const errorMessage = error.response?.data?.msg || "Login failed! Please try again.";
    setMessageType("error");
    setMessage(Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage);
  }
};

=======
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', { email, password });

      const { user, token } = response.data;

<<<<<<< Updated upstream
      // Store the token using the helper function
      setToken(token);
      console.log(token);
      console.log(getToken());

      localStorage.setItem('userId', user.userId);
      localStorage.setItem('role', user.role);

=======
      // Store the token and user details in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.userId);  // Store userId if needed
      localStorage.setItem('role', user.role);     
       // Store the role if needed
      console.log(localStorage.getItem('token'));
      // Display success message and call onLoginSuccess with the user's role
>>>>>>> Stashed changes
      setMessageType("success");
      setMessage("Login successful!");

      setEmail('');
      setPassword('');

      onLoginSuccess(user.role);

      setTimeout(() => {
        window.location.href = user.role === 'admin' ? '/admin-dashboard' : '/my-orders';
      }, 1000);

    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setMessageType("error");
        setMessage(error.response.data.msg);
      } else {
        setMessageType("error");
        setMessage("Login failed! Please check your credentials.");
      }
      passwordInputRef.current.focus();
    }
  };
>>>>>>> Stashed changes

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
            </button>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Login
        </button>

        {/* Display Popup Message */}
        {message && (
          <div className={`popup-message ${messageType === 'success' ? 'popup-success' : 'popup-error'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;

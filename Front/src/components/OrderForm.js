import React, { useState } from 'react';
import Navbar from './Navbar'; // Import the Navbar component
import './OrderForm.css';

const OrderForm = ({ onOrderSubmit, setIsViewingOrders }) => {
  const [orderName, setOrderName] = useState(''); // New state for order name
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropOffLocation, setDropOffLocation] = useState('');
  const [packageDetails, setPackageDetails] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const order = { orderName, pickupLocation, dropOffLocation, packageDetails, deliveryTime }; // Include orderName in the order object
    onOrderSubmit(order); // Add order to the list in App.js
    setConfirmationMessage('Your order has been submitted successfully!');
    setTimeout(() => {
      setConfirmationMessage(''); // Clear message
      setIsViewingOrders(true); // Switch to "My Orders" page after submission
    }, 1000);
  };

  return (
    <div className="order-page">
      {/* Display the Navbar at the top of the page */}
      <Navbar setIsViewingOrders={setIsViewingOrders} />

      <main className="main-content">
        <div className="form-container">
          <h2>Place an Order</h2>
          <form onSubmit={handleOrderSubmit}>
            <div className="form-group mb-3">
              <label>Order Name</label>
              <input
                type="text"
                className="form-control"
                value={orderName}
                onChange={(e) => setOrderName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Pickup Location</label>
              <input
                type="text"
                className="form-control"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Drop-off Location</label>
              <input
                type="text"
                className="form-control"
                value={dropOffLocation}
                onChange={(e) => setDropOffLocation(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Package Details</label>
              <textarea
                className="form-control"
                value={packageDetails}
                onChange={(e) => setPackageDetails(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Delivery Time</label>
              <input
                type="datetime-local"
                className="form-control"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              Submit Order
            </button>
          </form>
          {confirmationMessage && (
            <p className="confirmation-message">{confirmationMessage}</p>
          )}
        </div>
      </main>
      <footer className="footer">
        <p>© 2024 Delivery Service. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default OrderForm;

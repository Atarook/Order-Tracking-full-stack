import React from 'react';

const OrderDetails = ({ selectedOrder, setIsViewingOrders, setSelectedOrder }) => {
    if (!selectedOrder) return null; // Don't render if there's no selected order
  
    return (
      <div className="order-details">
        <h3>Order Details</h3>
        <p><strong>Order Name:</strong> {selectedOrder.orderName}</p>
        <p><strong>Pickup Location:</strong> {selectedOrder.pickupLocation}</p>
        <p><strong>Drop-off Location:</strong> {selectedOrder.dropOffLocation}</p>
        <p><strong>Package Details:</strong> {selectedOrder.packageDetails}</p>
        <p><strong>Delivery Time:</strong> {selectedOrder.deliveryTime}</p>
        <p><strong>Status:</strong> {selectedOrder.status || 'Pending'}</p>
        <button className="btn btn-secondary" onClick={() => {
            setIsViewingOrders(true);
            setSelectedOrder(null); // Clear the selected order when going back
        }}>
            Back to Orders
        </button>
      </div>
    );
  };
  

export default OrderDetails;

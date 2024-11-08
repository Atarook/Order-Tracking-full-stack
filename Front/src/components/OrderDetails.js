import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams(); // Get the order ID from the route parameters
  const navigate = useNavigate(); // Use navigate hook
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/order/getorderbyid`, {
        
        });

        // Log the response to ensure it contains the expected data
        console.log('Order details response:', response.data);

        // Assuming the response contains both the order and courier details
        setOrderDetails(response.data.data); // Set the order details
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to fetch order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();

    // Reset order details when the component is unmounted
    return () => setOrderDetails(null);
  }, [id]);

  if (loading) {
    return <p>Loading order details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!orderDetails) return null;

  return (
    <div className="order-details">
      <h3>Order Details</h3>
      <p><strong>Order Name:</strong> {orderDetails.orderId}</p>
      <p><strong>Pickup Location:</strong> {orderDetails.pickupLocation}</p>
      <p><strong>Drop-off Location:</strong> {orderDetails.dropOffLocation}</p>
      <p><strong>Package Details:</strong> {orderDetails.packageDetails}</p>
      <p><strong>Delivery Time:</strong> {orderDetails.deliveryTime}</p>
      <p><strong>Status:</strong> {orderDetails.status || 'Pending'}</p>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>
        Back to Orders
      </button>
    </div>
  );
};

export default OrderDetails;

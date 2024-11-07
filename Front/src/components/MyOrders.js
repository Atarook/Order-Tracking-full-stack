import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from './authHelpers';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log(getToken());
        const token = getToken(); // Retrieve the token from local storage
        if (!token) {
          window.location.href = '/login'; // Redirect to login if token is not found
          return;
        }

        const response = await axios.get('http://localhost:8000/order/getuserorder', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>My Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <p>Order ID: {order._id}</p>
            <p>Pickup Location: {order.pickupLocation}</p>
            <p>Dropoff Location: {order.dropoffLocation}</p>
            <p>Package Details: {order.packageDetails}</p>
            <p>Delivery Time: {order.deliveryTime}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;

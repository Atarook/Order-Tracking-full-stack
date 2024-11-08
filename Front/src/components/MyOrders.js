import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setLocalOrders] = useState([]); // Local state to store orders
  const [loading, setLoading] = useState(true); // Loading state to manage UI
  const [error, setError] = useState(null); // Error state to manage API errors
  const navigate = useNavigate(); // Use navigate hook

  const handleOrderClick = (orderId) => {
    console.log('handleOrderClick', orderId)
    navigate(`/order-details/${orderId}`);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/order/getuserorder', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming JWT is in localStorage
          }
        });
        setLocalOrders(response.data.data); // Set fetched orders
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
        setError('Failed to fetch orders. Please try again.');
      }
    };

    fetchOrders();
  }, []); // Empty dependency array to run once on mount

  const cancelOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8000/order/cancel/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setLocalOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId)); // Remove canceled order
    } catch (error) {
      console.error('Error canceling order:', error);
      setError('Failed to cancel order. Please try again.');
    }
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {loading ? (
        <p>Loading...</p> // Show loading message while fetching orders
      ) : error ? (
        <p className="error-message">{error}</p> // Show error message if there was an issue
      ) : orders.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.OrderId}>
                <td>{order.OrderId}</td>
                <td>{order.status || 'Pending'}</td>
                <td>
                  <button onClick={() => handleOrderClick(order._id)}>
                    View Order Details
                  </button>
                  {order.status === 'Pending' && (
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => cancelOrder(order._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;

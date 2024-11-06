import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrders = ({ setIsViewingOrders, setSelectedOrder, setOrders }) => {
  const [orders, setLocalOrders] = useState([]); // Local state to store orders
  const [loading, setLoading] = useState(true); // Loading state to manage UI

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming JWT is in localStorage
          }
        });
        setLocalOrders(response.data.data); // Set fetched orders
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array to run once on mount

  const cancelOrder = async (orderId) => {
    try {
      // Call API to cancel the order (backend logic for canceling should be implemented)
      await axios.delete(`http://localhost:8000/order/cancel/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      // Remove the canceled order from local state
      setLocalOrders((prevOrders) => prevOrders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {loading ? (
        <p>Loading...</p> // Show loading message while fetching orders
      ) : orders.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderName}</td>
                <td>{order.status || 'Pending'}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      setSelectedOrder(order); // Set the selected order
                      setIsViewingOrders(false); // Hide the orders list
                    }}
                  >
                    Details
                  </button>
                  {/* Only show Cancel button if order status is 'Pending' */}
                  {order.status === 'Pending' && (
                    <button
                      className="btn btn-danger ml-2" // Added margin for spacing
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

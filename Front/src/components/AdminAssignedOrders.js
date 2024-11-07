import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminAssignedOrders = () => {
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all orders on component mount
  useEffect(() => {
    fetchAssignedOrders();
  }, []);

  const fetchAssignedOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/getAllOrders'); // Assuming '/api/orders' calls getAllOrders
      setAssignedOrders(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch assigned orders');
      setLoading(false);
    }
  };

  const assignOrder = async (orderId) => {
    const courieruserId = prompt("Enter the Courier ID to assign this order:");
    if (!courieruserId) {
      alert("Courier ID is required to assign an order.");
      return;
    }

    try {
      await axios.post('http://localhost:8000/admin/assignedorders', { OrderId: orderId, courieruserId });
      fetchAssignedOrders(); // Refresh order list after assigning
    } catch (err) {
      setError('Failed to assign order');
    }
  };

  const handleLogout = () => {
    // Clear authentication token or any other necessary cleanup
      <div className="header">
        <h2>Assigned Orders</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="admin-assigned-orders">
      <h2>Assigned Orders</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p>{error}</p>
      ) : assignedOrders.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Package Details</th>
              <th>Delivery Time</th>
              <th>Pickup Location</th>
              <th>Dropoff Location</th>
              <th>Status</th>
              <th>Assigned Courier</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.OrderId}</td>
                <td>{order.userId}</td>
                <td>{order.packageDetails}</td>
                <td>{order.deliveryTime}</td>
                <td>{order.pickupLocation}</td>
                <td>{order.dropoffLocation}</td>
                <td>{order.status}</td>
                <td>{order.courieruserId ? order.courieruserId : 'Not Assigned'}</td>
                <td>
                  <button onClick={() => assignOrder(order._id)}>
                    Assign Courier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No assigned orders available.</p>
      )}
    </div>
  );
};

export default AdminAssignedOrders;

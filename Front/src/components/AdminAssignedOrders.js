import React from 'react';

const AdminAssignedOrders = ({ assignedOrders }) => {
  return (
    <div className="admin-assigned-orders">
      <h2>Assigned Orders</h2>
      {assignedOrders.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order Name</th>
              <th>Status</th>
              <th>Assigned Courier</th>
            </tr>
          </thead>
          <tbody>
            {assignedOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderName}</td>
                <td>{order.status}</td>
                <td>{order.courierName || 'Not Assigned'}</td>
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

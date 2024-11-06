import React from 'react';

const AssignedOrders = ({ assignedOrders, updateOrderStatus }) => {
  return (
    <div className="assigned-orders">
      <h2>Assigned Orders</h2>
      {assignedOrders.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Name</th>
              <th>Details</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.orderName}</td>
                <td>{order.details}</td>
                <td>{order.status}</td>
                <td>
                  {order.status === 'Assigned' ? (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={() => updateOrderStatus(order.id, 'Accepted')}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => updateOrderStatus(order.id, 'Declined')}
                      >
                        Decline
                      </button>
                    </>
                  ) : order.status === 'Accepted' ? (
                    <span>Order Accepted</span>
                  ) : (
                    <span>Order Declined</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No assigned orders found.</p>
      )}
    </div>
  );
};

export default AssignedOrders;

import React, { useState } from 'react';
import AssignedOrders from './AssignedOrders';
import OrderStatusUpdate from './OrderStatusUpdate';

const CourierDashboard = () => {
  const [assignedOrders, setAssignedOrders] = useState([
    { id: 1, orderName: 'Order 1', details: 'Details for Order 1', status: 'Assigned' },
    { id: 2, orderName: 'Order 2', details: 'Details for Order 2', status: 'Assigned' }
    // Add more initial orders as needed
  ]);

  const [showStatusUpdate, setShowStatusUpdate] = useState(false); // State to toggle status update view

  const updateOrderStatus = (orderId, newStatus) => {
    setAssignedOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="courier-dashboard">
      {showStatusUpdate ? (
        <OrderStatusUpdate
          acceptedOrders={assignedOrders.filter((order) => order.status === 'Accepted')}
          updateOrderStatus={updateOrderStatus}
          onClose={() => setShowStatusUpdate(true)}
        />
      ) : (
        <>
          <AssignedOrders assignedOrders={assignedOrders} updateOrderStatus={updateOrderStatus} />
          {assignedOrders.some((order) => order.status === 'Accepted') && (
            <button
              className="btn btn-primary mt-3"
              onClick={() => setShowStatusUpdate(true)}
            >
              Update Accepted Orders Status
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default CourierDashboard;

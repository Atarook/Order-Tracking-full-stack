import React from 'react';
const MyOrders = ({ orders, setIsViewingOrders, setSelectedOrder, setOrders }) => {
  const cancelOrder = (orderToCancel) => {
    // Filter out the canceled order
    const updatedOrders = orders.filter(order => order !== orderToCancel);
    setOrders(updatedOrders); // Update the orders in the parent component
  };

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {orders.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
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
                
                    <button
                      className="btn btn-danger ml-2" // Added margin for spacing
                      onClick={() => cancelOrder(order)}
                    >
                      Cancel
                    </button>
                  
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

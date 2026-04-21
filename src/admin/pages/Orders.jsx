import { useEffect, useState } from "react";
import { fetchOrders, updateOrderStatus } from "../api/adminApi";
import Loader from "../../components/common/Loader";
import "../styles/orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetchOrders();
      setOrders(res?.data?.data || []);
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      loadOrders();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowDetail(true);
  };

  const handleBackToList = () => {
    setShowDetail(false);
    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "#f59e0b",
      processing: "#3b82f6",
      shipped: "#8b5cf6",
      delivered: "#10b981",
      cancelled: "#ef4444",
    };
    return colors[status] || "#64748b";
  };

  const getStatusBadge = (status) => {
    return (
      <span
        className="status-badge"
        style={{
          background: getStatusColor(status) + "20",
          color: getStatusColor(status),
        }}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return <Loader type="gradient" size="large" text="Loading orders..." />;
  }

  return (
    <div className="orders-page">
      {/* Mobile Back Button */}
      {showDetail && (
        <button className="mobile-back-btn" onClick={handleBackToList}>
          ← Back to Orders
        </button>
      )}

      <div className="orders-container">
        {/* Orders List */}
        <div className={`orders-list ${showDetail ? 'hide-on-mobile' : ''}`}>
          <div className="orders-header">
            <h3>Orders Management</h3>
            <span className="order-count">{orders.length} orders</span>
          </div>

          {orders.length === 0 ? (
            <div className="empty-state">
              <div className="icon">🛒</div>
              <h3>No Orders Yet</h3>
              <p>Orders will appear here when customers make purchases</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="orders-table-wrapper">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="order-id">#{order._id?.slice(-6).toUpperCase()}</td>
                        <td>{order.shippingAddress?.fullName || "N/A"}</td>
                        <td className="order-total">₹{order.totalPrice?.toFixed(2) || "0.00"}</td>
                        <td>{getStatusBadge(order.status)}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className="table-actions">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order._id, e.target.value)}
                              className="status-select"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <button 
                              className="btn-view"
                              onClick={() => handleViewOrder(order)}
                            >
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="orders-cards">
                {orders.map((order) => (
                  <div key={order._id} className="order-card">
                    <div className="card-header">
                      <span className="order-id">#{order._id?.slice(-6).toUpperCase()}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    
                    <div className="card-body">
                      <div className="card-row">
                        <span className="label">Customer:</span>
                        <span className="value">{order.shippingAddress?.fullName || "N/A"}</span>
                      </div>
                      <div className="card-row">
                        <span className="label">Total:</span>
                        <span className="value order-total">₹{order.totalPrice?.toFixed(2) || "0.00"}</span>
                      </div>
                      <div className="card-row">
                        <span className="label">Date:</span>
                        <span className="value">{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="card-footer">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button 
                        className="btn-view"
                        onClick={() => handleViewOrder(order)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Order Detail */}
        <div className={`order-detail ${showDetail ? 'show-on-mobile' : ''}`}>
          {selectedOrder ? (
            <>
              <div className="detail-header">
                <button className="mobile-close-btn" onClick={handleBackToList}>
                  ×
                </button>
                <h3>Order Details</h3>
              </div>

              <div className="detail-content">
                <div className="detail-section">
                  <h4>Order Information</h4>
                  <div className="detail-row">
                    <span>Order ID:</span>
                    <span>#{selectedOrder._id?.slice(-6).toUpperCase()}</span>
                  </div>
                  <div className="detail-row">
                    <span>Date:</span>
                    <span>{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="detail-row">
                    <span>Status:</span>
                    <span>{getStatusBadge(selectedOrder.status)}</span>
                  </div>
                  <div className="detail-row">
                    <span>Total:</span>
                    <span className="order-total">₹{selectedOrder.totalPrice?.toFixed(2)}</span>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Customer Details</h4>
                  <div className="detail-row">
                    <span>Name:</span>
                    <span>{selectedOrder.shippingAddress?.fullName || "N/A"}</span>
                  </div>
                  <div className="detail-row">
                    <span>Phone:</span>
                    <span>{selectedOrder.shippingAddress?.phone || "N/A"}</span>
                  </div>
                  <div className="detail-row">
                    <span>Address:</span>
                    <span>
                      {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.postalCode}
                    </span>
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Order Items</h4>
                  {selectedOrder.orderItems?.map((item, index) => (
                    <div key={index} className="order-item">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <div className="icon">👆</div>
              <p>Select an order to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
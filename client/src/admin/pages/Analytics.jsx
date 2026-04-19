import { useEffect, useState } from "react";
import { fetchProducts, fetchOrders, fetchMessages } from "../api/adminApi";
import Loader from "../../components/common/Loader";
import "../styles/Analytics.css";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalMessages: 0,
    totalRevenue: 0,
    recentOrders: [],
    productsByCategory: {},
    ordersByStatus: {},
    monthlyRevenue: {},
    topProducts: [],
  });
  const [timeRange, setTimeRange] = useState("month"); // week, month, year

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      const [productsRes, ordersRes, messagesRes] = await Promise.all([
        fetchProducts(),
        fetchOrders(),
        fetchMessages(),
      ]);

      // Process products data
      let productsList = [];
      if (productsRes?.data?.data?.products) {
        productsList = productsRes.data.data.products;
      } else if (productsRes?.data?.data) {
        productsList = Array.isArray(productsRes.data.data) ? productsRes.data.data : [];
      }

      // Process orders data
      let ordersList = [];
      if (ordersRes?.data?.data) {
        ordersList = Array.isArray(ordersRes.data.data) ? ordersRes.data.data : [];
      }

      // Process messages data
      let messagesList = [];
      if (messagesRes?.data?.data) {
        messagesList = Array.isArray(messagesRes.data.data) ? messagesRes.data.data : [];
      }

      // Calculate products by category
      const categoryCount = {};
      productsList.forEach((product) => {
        const cat = product.category || "Uncategorized";
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      });

      // Calculate orders by status
      const statusCount = {
        pending: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0,
      };
      let totalRevenue = 0;
      
      ordersList.forEach((order) => {
        const status = order.status || "pending";
        if (statusCount[status] !== undefined) {
          statusCount[status]++;
        }
        if (order.totalPrice) {
          totalRevenue += order.totalPrice;
        }
      });

      // Calculate monthly revenue
      const monthlyData = {};
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
      ordersList.forEach((order) => {
        const date = new Date(order.createdAt);
        const monthKey = `${months[date.getMonth()]} ${date.getFullYear()}`;
        monthlyData[monthKey] = (monthlyData[monthKey] || 0) + (order.totalPrice || 0);
      });

      // Get top products (mock data - you can enhance this)
      const topProducts = productsList
        .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
        .slice(0, 5);

      // Recent orders
      const recentOrders = ordersList
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setAnalytics({
        totalProducts: productsList.length,
        totalOrders: ordersList.length,
        totalMessages: messagesList.length,
        totalRevenue,
        recentOrders,
        productsByCategory: categoryCount,
        ordersByStatus: statusCount,
        monthlyRevenue: monthlyData,
        topProducts,
      });

    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate percentages for progress bars
  const calculatePercentage = (value, total) => {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  };

  if (loading) {
    return (
      <Loader 
        fullScreen 
        type="gradient" 
        size="large" 
        text="Loading Analytics..." 
      />
    );
  }

  const statusColors = {
    pending: "#f59e0b",
    processing: "#3b82f6",
    shipped: "#8b5cf6",
    delivered: "#10b981",
    cancelled: "#ef4444",
  };

  return (
    <div className="analytics-container">
      {/* Header */}
      <div className="analytics-header">
        <h2>Analytics Dashboard</h2>
        <div className="time-range-selector">
          <button 
            className={`range-btn ${timeRange === "week" ? "active" : ""}`}
            onClick={() => setTimeRange("week")}
          >
            Week
          </button>
          <button 
            className={`range-btn ${timeRange === "month" ? "active" : ""}`}
            onClick={() => setTimeRange("month")}
          >
            Month
          </button>
          <button 
            className={`range-btn ${timeRange === "year" ? "active" : ""}`}
            onClick={() => setTimeRange("year")}
          >
            Year
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">📦</div>
          <div className="metric-info">
            <h4>Total Products</h4>
            <p className="metric-value">{analytics.totalProducts}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">🛒</div>
          <div className="metric-info">
            <h4>Total Orders</h4>
            <p className="metric-value">{analytics.totalOrders}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-info">
            <h4>Total Revenue</h4>
            <p className="metric-value">₹{analytics.totalRevenue.toLocaleString()}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">💬</div>
          <div className="metric-info">
            <h4>Messages</h4>
            <p className="metric-value">{analytics.totalMessages}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Order Status Distribution */}
        <div className="chart-card">
          <h3>Order Status Distribution</h3>
          <div className="status-bars">
            {Object.entries(analytics.ordersByStatus).map(([status, count]) => (
              <div key={status} className="status-item">
                <div className="status-header">
                  <span className="status-label">
                    <span 
                      className="status-dot" 
                      style={{ background: statusColors[status] }}
                    ></span>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                  <span className="status-count">{count}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${calculatePercentage(count, analytics.totalOrders)}%`,
                      background: statusColors[status]
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Products by Category */}
        <div className="chart-card">
          <h3>Products by Category</h3>
          <div className="category-list">
            {Object.entries(analytics.productsByCategory)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([category, count]) => (
                <div key={category} className="category-item">
                  <div className="category-header">
                    <span className="category-name">{category}</span>
                    <span className="category-count">{count}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill category-fill"
                      style={{ 
                        width: `${calculatePercentage(count, analytics.totalProducts)}%`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="table-section">
        <h3>Recent Orders</h3>
        <div className="table-container">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {analytics.recentOrders.length > 0 ? (
                analytics.recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td>#{order._id?.slice(-6).toUpperCase() || "N/A"}</td>
                    <td>{order.shippingAddress?.fullName || "N/A"}</td>
                    <td>₹{order.totalPrice?.toLocaleString() || "0"}</td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{ 
                          background: statusColors[order.status] + "20",
                          color: statusColors[order.status]
                        }}
                      >
                        {order.status || "pending"}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-table">No orders yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Products */}
      <div className="table-section">
        <h3>Top Products</h3>
        <div className="table-container">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price Range</th>
                <th>Variants</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topProducts.length > 0 ? (
                analytics.topProducts.map((product) => {
                  const prices = product.variants?.map(v => v.price) || [];
                  const minPrice = Math.min(...prices) || 0;
                  const maxPrice = Math.max(...prices) || 0;
                  
                  return (
                    <tr key={product._id}>
                      <td>
                        <div className="product-cell">
                          {product.images?.[0]?.url && (
                            <img 
                              src={product.images[0].url} 
                              alt={product.name}
                              className="product-thumb"
                            />
                          )}
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td>{product.category || "N/A"}</td>
                      <td>
                        {minPrice === maxPrice 
                          ? `₹${minPrice}` 
                          : `₹${minPrice} - ₹${maxPrice}`
                        }
                      </td>
                      <td>{product.variants?.length || 0}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="empty-table">No products yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
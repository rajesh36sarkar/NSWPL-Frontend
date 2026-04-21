import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { fetchProducts, fetchOrders, fetchMessages } from "../api/adminApi";
import Loader from "../../components/common/Loader";

const Dashboard = ({ setActivePage }) => {
  // const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    messages: 0,
    unread: 0,
  });
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Fetching dashboard stats...");

        const [productsRes, ordersRes, messagesRes] = await Promise.all([
          fetchProducts(),
          fetchOrders(),
          fetchMessages(),
        ]);

        if (!isMounted) return;

        console.log("Products response:", productsRes?.data);
        console.log("Orders response:", ordersRes?.data);
        console.log("Messages response:", messagesRes?.data);

        // Handle different response structures
        let productsList = [];
        if (productsRes?.data?.data?.products) {
          productsList = productsRes.data.data.products;
        } else if (productsRes?.data?.data) {
          productsList = Array.isArray(productsRes.data.data) ? productsRes.data.data : [];
        } else if (productsRes?.data?.products) {
          productsList = productsRes.data.products;
        }

        // Calculate categories count
        const categoryCount = {};
        productsList.forEach((product) => {
          const cat = product.category || "Uncategorized";
          categoryCount[cat] = (categoryCount[cat] || 0) + 1;
        });
        setCategories(categoryCount);

        let orders = 0;
        if (ordersRes?.data?.data) {
          orders = Array.isArray(ordersRes.data.data) ? ordersRes.data.data.length : 0;
        } else if (ordersRes?.data?.orders) {
          orders = ordersRes.data.orders.length;
        }

        let messagesList = [];
        if (messagesRes?.data?.data) {
          messagesList = Array.isArray(messagesRes.data.data) ? messagesRes.data.data : [];
        } else if (messagesRes?.data?.messages) {
          messagesList = messagesRes.data.messages;
        }

        const unread = messagesList.filter((m) => !m.read).length;

        console.log("Parsed stats:", { 
          products: productsList.length, 
          orders, 
          messages: messagesList.length, 
          unread,
          categories: categoryCount 
        });

        setStats({
          products: productsList.length,
          orders,
          messages: messagesList.length,
          unread,
        });
      } catch (err) {
        if (!isMounted) return;
        console.error("Stats error:", err);
        setError(err.response?.data?.message || "Failed to load stats");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  // Navigation handlers
  const handleAddProduct = () => {
    if (setActivePage) {
      setActivePage("products");
    }
  };

  const handleViewOrders = () => {
    if (setActivePage) {
      setActivePage("orders");
    }
  };

  const handleViewMessages = () => {
    if (setActivePage) {
      setActivePage("messages");
    }
  };

  const handleAnalytics = () => {
    // For now, show a message or navigate to analytics page when created
    alert("Analytics page coming soon!");
    // if (setActivePage) {
    //   setActivePage("analytics");
    // }
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      "notebook": "📓",
      "notebooks": "📓",
      "pen": "✒️",
      "pens": "✒️",
      "pencil": "✏️",
      "pencils": "✏️",
      "paper": "📄",
      "papers": "📄",
      "art": "🎨",
      "arts": "🎨",
      "office": "💼",
      "school": "🎒",
      "stationery": "📦",
      "uncategorized": "📦",
    };
    
    const lowerCat = category.toLowerCase();
    for (const [key, icon] of Object.entries(icons)) {
      if (lowerCat.includes(key)) return icon;
    }
    return "📦";
  };

  // Get category color
  const getCategoryColor = (index) => {
    const colors = [
      "linear-gradient(135deg, #6366f1, #8b5cf6)",
      "linear-gradient(135deg, #10b981, #34d399)",
      "linear-gradient(135deg, #f59e0b, #fbbf24)",
      "linear-gradient(135deg, #ef4444, #f87171)",
      "linear-gradient(135deg, #06b6d4, #22d3ee)",
      "linear-gradient(135deg, #8b5cf6, #a78bfa)",
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <Loader 
        fullScreen 
        type="gradient" 
        size="large" 
        text="Loading Dashboard..." 
      />
    );
  }

  if (error) {
    return (
      <div className="error-message" style={{ padding: "20px", textAlign: "center" }}>
        <p>Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            marginTop: "16px",
            padding: "10px 20px",
            background: "#6366f1",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  const categoryEntries = Object.entries(categories).sort((a, b) => b[1] - a[1]);

  return (
    <div className="dashboard-container">
      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Products</h4>
          <p>{stats.products}</p>
        </div>

        <div className="stat-card">
          <h4>Total Orders</h4>
          <p>{stats.orders}</p>
        </div>

        <div className="stat-card">
          <h4>Total Messages</h4>
          <p>{stats.messages}</p>
        </div>

        <div className="stat-card highlight">
          <h4>Unread Messages</h4>
          <p>{stats.unread}</p>
        </div>
      </div>

      {/* Products by Category */}
      {categoryEntries.length > 0 && (
        <div className="category-section">
          <h3 className="section-title">Products by Category</h3>
          <div className="category-grid">
            {categoryEntries.map(([category, count], index) => (
              <div 
                key={category} 
                className="category-card"
                style={{ background: getCategoryColor(index) }}
              >
                <div className="category-icon">{getCategoryIcon(category)}</div>
                <div className="category-info">
                  <h4>{category}</h4>
                  <p className="category-count">{count} Product{count !== 1 ? 's' : ''}</p>
                </div>
                {/* <div className="category-percentage">
                  {stats.products > 0 ? Math.round((count / stats.products) * 100) : 0}%
                </div> */}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions - FULLY FUNCTIONAL */}
      <h3 className="section-title">Quick Actions</h3>
      <div className="quick-actions">
        <div className="quick-action-card" onClick={handleAddProduct}>
          <div className="icon">📦</div>
          <h4>Add Product</h4>
          <p>Create a new product with variants and images</p>
          <span className="action-badge">Active</span>
        </div>
        
        <div className="quick-action-card" onClick={handleViewOrders}>
          <div className="icon">🛒</div>
          <h4>View Orders</h4>
          <p>Manage and update customer orders</p>
          <span className="action-badge">Active</span>
        </div>
        
        <div className="quick-action-card" onClick={handleViewMessages}>
          <div className="icon">💬</div>
          <h4>Messages</h4>
          <p>{stats.unread} unread message{stats.unread !== 1 ? 's' : ''} waiting</p>
          <span className="action-badge">Active</span>
        </div>
        
        <div className="quick-action-card coming-soon" onClick={handleAnalytics}>
          <div className="icon">📊</div>
          <h4>Analytics</h4>
          <p>View sales and performance reports</p>
          <span className="action-badge coming-soon-badge">Coming Soon</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
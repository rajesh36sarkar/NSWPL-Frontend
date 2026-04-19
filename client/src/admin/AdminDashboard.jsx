import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Messages from "./pages/Messages";
import "../admin/styles/admin.css";

const AdminDashboard = () => {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard setActivePage={handlePageChange} />;
      case "products":
        return <Products />;
      case "orders":
        return <Orders />;
      case "messages":
        return <Messages />;
      default:
        return <Dashboard setActivePage={handlePageChange} />;
    }
  };

  return (
    <div className="admin-layout">
      {/* Hamburger Menu - Transforms to X when open */}
      <button 
        className={`hamburger-menu ${sidebarOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Sidebar Overlay */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={closeSidebar}
      />

      <Sidebar 
        setPage={handlePageChange} 
        currentPage={page} 
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />
      
      <div className="admin-main">
        <Header page={page} />
        <div className="admin-content">
          {renderPage()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
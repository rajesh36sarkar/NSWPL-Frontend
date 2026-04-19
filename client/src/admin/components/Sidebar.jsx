import { useState } from "react";

const Sidebar = ({ setPage, currentPage, isOpen, onClose }) => {
  const [active, setActive] = useState(currentPage || "dashboard");

  const handleClick = (page) => {
    setPage(page);
    setActive(page);
    onClose(); 
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "products", label: "Products", icon: "📦" },
    { id: "orders", label: "Orders", icon: "🛒" },
    { id: "messages", label: "Messages", icon: "💬" },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-logo">NSWPL</h2>
      </div>

      <ul>
        {navItems.map((item) => (
          <li
            key={item.id}
            className={active === item.id ? "active" : ""}
            onClick={() => handleClick(item.id)}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
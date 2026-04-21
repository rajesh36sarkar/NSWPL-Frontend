import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSettings from "./ProfileSettings";

const Header = ({ page }) => {
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState({ name: "Admin", role: "admin", email: "" });
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileSettings, setShowProfileSettings] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedAdminInfo = localStorage.getItem("adminInfo");
    if (storedAdminInfo) {
      try {
        const parsed = JSON.parse(storedAdminInfo);
        setAdminInfo({
          name: parsed.name || "Admin",
          email: parsed.email || "",
          role: parsed.role || "admin",
        });
      } catch (error) {
        console.error("Failed to parse admin info:", error);
      }
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/admin/login");
  };

  const handleProfileUpdate = (updatedInfo) => {
    setAdminInfo(updatedInfo);
    localStorage.setItem("adminInfo", JSON.stringify(updatedInfo));
  };

  const pageTitles = {
    dashboard: "Admin Panel",
    products: "Products",
    orders: "Orders",
    messages: "Messages",
  };

  return (
    <>
      <div className="admin-header">
        <div className="header-left">
          <h3 className="header-title">{pageTitles[page] || "NSWPL"}</h3>
        </div>

        <div className="header-right">
          <div className="admin-profile" ref={dropdownRef}>
            <div 
              className="profile-trigger"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="admin-info">
                <span className="admin-name">{adminInfo.name}</span>
                <span className={`admin-role-badge role-${adminInfo.role}`}>
                  {adminInfo.role}
                </span>
              </div>
            </div>

            {showDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-info-full">
                    <p className="dropdown-name">{adminInfo.name}</p>
                    <p className="dropdown-email">{adminInfo.email}</p>
                    <span className={`role-tag role-${adminInfo.role}`}>
                      {adminInfo.role}
                    </span>
                  </div>
                </div>
                
                <div className="dropdown-divider" />
                
                <button 
                  className="dropdown-item"
                  onClick={() => {
                    setShowProfileSettings(true);
                    setShowDropdown(false);
                  }}
                >
                  <span>⚙️</span> Profile Settings
                </button>
                
                <button className="dropdown-item" onClick={handleLogout}>
                  <span>🚪</span> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProfileSettings
        isOpen={showProfileSettings}
        onClose={() => setShowProfileSettings(false)}
        adminInfo={adminInfo}
        onUpdate={handleProfileUpdate}
      />
    </>
  );
};

export default Header;
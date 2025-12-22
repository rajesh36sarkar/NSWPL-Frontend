import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import "../admin/styles/admin.css";

const AdminDashboard = () => {
  const [page, setPage] = useState("products");

  return (
    <div className="admin-layout">
      <Sidebar setPage={setPage} />
      <div className="admin-main">
        <Header />
        {page === "products" && <Products />}
        {page === "orders" && <Orders />}
      </div>
    </div>
  );
};

export default AdminDashboard;

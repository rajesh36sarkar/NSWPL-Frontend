import "../styles/sidebar.css";

const Sidebar = ({ setPage }) => {
  return (
    <aside className="sidebar">
      <h3>Nandita</h3>
      <ul>
        <li onClick={() => setPage("products")}>Products</li>
        <li onClick={() => setPage("orders")}>Orders</li>
        <li
          onClick={() => {
            localStorage.removeItem("adminToken");
            window.location.href = "/admin/login";
          }}
        >
          Logout
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/table.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update UI instantly
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="table-container">
      <h3>Orders</h3>

      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Phone</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o.customerName}</td>
              <td>{o.phone}</td>
              <td>{o.productName}</td>
              <td>{o.quantity}</td>
              <td>
                <select
                  value={o.status}
                  onChange={(e) =>
                    handleStatusChange(o._id, e.target.value)
                  }
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;

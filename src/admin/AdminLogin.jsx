import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/login.css";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/admin/login", {
        email: form.email,
        password: form.password,
      });
      
      localStorage.setItem("adminToken", res.data.data.token);
      localStorage.setItem("adminInfo", JSON.stringify(res.data.data.admin));
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">NSWPL</div>
          <h2>Admin Portal</h2>
          <p>Sign in to manage your store</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}
          
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="admin@nswpl.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
          
          <div className="login-hint">
            <small>Default: admin@nswpl.com / admin123</small>
          </div>
        </form>

        <div className="login-footer">
          <a href="/">← Back to Store</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
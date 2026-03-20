import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin, setAdminToken } from "../../services/jobPortalApi";
import "./AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const data = await adminLogin(email, password);

      setAdminToken(data.access_token);

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <p className="admin-login-tag">Company Admin</p>
        <h1>Admin Portal</h1>

        <form className="admin-login-form" onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="admin@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p style={{ color: "red", fontSize: 14 }}>{error}</p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Signing..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { removeAdminToken } from "../../services/jobPortalApi";
import "./AdminDashboard.css";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAdminToken();
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard-page">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-top">
          <h2>Company</h2>
          <p>Admin Panel</p>
        </div>

        <nav className="admin-sidebar-nav">
          <Link
            to="/admin/dashboard"
            className={`admin-nav-link ${
              location.pathname === "/admin/dashboard" ? "active" : ""
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/jobs"
            className={`admin-nav-link ${
              location.pathname === "/admin/jobs" ? "active" : ""
            }`}
          >
            Jobs
          </Link>

          <Link
            to="/admin/applications"
            className={`admin-nav-link ${
              location.pathname.startsWith("/admin/applications") ? "active" : ""
            }`}
          >
            Applications
          </Link>

          <button
            type="button"
            className="admin-nav-link"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="admin-dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
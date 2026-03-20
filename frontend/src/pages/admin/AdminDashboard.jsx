import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAllJobsAdmin,
  getAdminToken,
} from "../../services/jobPortalApi";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getAdminToken();

    if (!token) {
      navigate("/admin/login");
      return;
    }

    const loadJobs = async () => {
      try {
        setError("");
        const data = await fetchAllJobsAdmin();
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Failed to load dashboard data");
        setJobs([]);
      }
    };

    loadJobs();
  }, [navigate]);

  const totalJobs = jobs.length;
  const openPositions = jobs.filter((job) => job.is_open === "open").length;
  const closedPositions = jobs.filter((job) => job.is_open !== "open").length;

  return (
    <>
      <div className="admin-dashboard-header">
        <div>
          <p className="admin-section-tag">Dashboard</p>
          <h1>Welcome, Admin</h1>
        </div>
      </div>

      {error && <p style={{ color: "red", marginBottom: 16 }}>{error}</p>}

      <section className="admin-stats-grid">
        <div className="admin-stat-card">
          <h3>Total Jobs</h3>
          <p>{totalJobs}</p>
        </div>

        <div className="admin-stat-card">
          <h3>Open Positions</h3>
          <p>{openPositions}</p>
        </div>

        <div className="admin-stat-card">
          <h3>Closed Positions</h3>
          <p>{closedPositions}</p>
        </div>

        <div className="admin-stat-card">
          <h3>Loaded Jobs</h3>
          <p>{jobs.length}</p>
        </div>
      </section>

      <section className="admin-panels-grid">
        <div className="admin-panel-card">
          <h3>Recent Jobs</h3>
          <ul>
            {jobs.length > 0 ? (
              jobs.slice(0, 4).map((job) => (
                <li key={job.id}>
                  {job.title} — {job.location}
                </li>
              ))
            ) : (
              <li>No jobs found</li>
            )}
          </ul>
        </div>

        <div className="admin-panel-card">
          <h3>Quick Actions</h3>
          <ul>
            <li>Create new job posting</li>
            <li>Review pending applications</li>
            <li>Update careers content</li>
            <li>Check latest submissions</li>
          </ul>
        </div>
      </section>
    </>
  );
}
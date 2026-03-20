import { Link } from "react-router-dom";
import "./CareersJobs.css";
import { useEffect, useState } from "react";
import { fetchOpenJobs } from "../../services/jobPortalApi";

function CareersJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOpenJobs()
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setJobs(list);
      })
      .catch((err) => {
        setError(err.message || "Failed to load jobs");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="careers-jobs-page">
      <div className="careers-jobs-container">
        <div className="careers-jobs-header">
          <h1>Open Positions</h1>
          <p>
            Explore current opportunities and join the Company team.
          </p>
        </div>

        {loading && <p>Loading jobs...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        
        {!loading && !error && (
          <div className="careers-jobs-list">
            {jobs.length === 0 ? (
              <div className="careers-job-detail-card">
                <div className="careers-job-detail-body">
                  <h2 className="careers-job-detail-title">No Open Roles Right Now</h2>
                  <p>Please check back later for upcoming opportunities.</p>
                </div>
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job.id}
                  className="careers-job-detail-card"
                >
                  <div className="careers-job-detail-body">
                    <h2 className="careers-job-detail-title">
                      {job.title || "Untitled Role"}
                    </h2>

                    <p><strong>Type:</strong> {job.type || "N/A"}</p>
                    <p><strong>Location:</strong> {job.location || "N/A"}</p>
                    <p><strong>Mode:</strong> {job.mode || "N/A"}</p>
                   
<p>
  <strong>Experience:</strong>{" "}
  {job.min_experience !== undefined && job.max_experience !== undefined
    ? `${job.min_experience} - ${job.max_experience} Years`
    : "N/A"}
</p>
                    <p><strong>Compensation:</strong> {job.compensation || "N/A"}</p>

                    <div className="careers-job-description-block">
                      <p><strong>Description:</strong></p>
                      <p>{job.description || "No description available."}</p>
                    </div>
                  </div>

                  <div className="careers-job-detail-footer">
                    <span>
                      Job ID: {job.id} | Status: {job.status || "OPEN"}
                    </span>

                    <Link to={`/apply/${job.id}`} className="careers-apply-btn">
                      Apply Now
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CareersJobs;
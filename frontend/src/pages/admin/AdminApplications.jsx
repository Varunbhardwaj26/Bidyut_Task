import "./AdminApplications.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdminToken,
  fetchAllJobsAdmin,
  fetchApplicationsByJob,
} from "../../services/jobPortalApi";

const CURRENT_STAND_LABEL = {
  strong_ai:
    "I already have strong AI fundamentals and hands-on experience. I’m confident I can clear company's difficult interview for a paid internship and PPO without additional training.",
  gaps_need_training:
    "I have worked with AI/ML, but I know there are gaps. I am willing to undergo serious training if it meaningfully improves my chances of earning a strong internship + PPO opportunity.",
  limited_knowledge:
    "I am mainly looking for a stipend, internship, or PPO, even though my current AI knowledge is limited.",
};

const ENGAGEMENT_PLAN_LABEL = {
  pay_personally:
    "I am willing to pay the training fee personally if the program is valuable and I am selected.",
  partial_scholarship:
    "I would require partial scholarship or merit-based support, depending on my performance and selection.",
  fully_sponsored:
    "I can participate only if the program is fully sponsored and guaranteed stipend/PPO.",
};

export default function AdminApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getAdminToken();

    if (!token) {
      navigate("/admin/login");
      return;
    }

    const loadJobs = async () => {
      try {
        setError("");
        const jobsData = await fetchAllJobsAdmin();
        setJobs(Array.isArray(jobsData) ? jobsData : jobsData.jobs || []);
      } catch (err) {
        setError(err.message || "Failed to load jobs");
      }
    };

    loadJobs();
  }, [navigate]);

  useEffect(() => {
    const loadApplications = async () => {
      if (!selectedJobId) {
        setApplications([]);
        setSelectedApplication(null);
        return;
      }

      try {
        setError("");
        setLoading(true);

        const data = await fetchApplicationsByJob(selectedJobId);
        const finalData = Array.isArray(data) ? data : data.applications || [];
        setApplications(finalData);
        setSelectedApplication(null);
      } catch (err) {
        setError(err.message || "Failed to load applications");
        setApplications([]);
        setSelectedApplication(null);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [selectedJobId]);

  return (
    <div className="admin-app-page">
      <div className="admin-app-header">
        <div>
          <p className="admin-app-tag">Admin / Applications</p>
          <h1>Applications</h1>
          <p className="admin-app-subtext">
            Review candidate submissions and track current application status.
          </p>
        </div>
      </div>

      <div className="admin-app-toolbar">
        <select
          value={selectedJobId}
          onChange={(e) => setSelectedJobId(e.target.value)}
          className="admin-app-select"
        >
          <option value="">Select job</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title}
            </option>
          ))}
        </select>
      </div>

      {error && <div className="admin-app-alert error">{error}</div>}

      <div className="admin-app-table-card">
        <table className="admin-app-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>City</th>
              <th>College</th>
              <th>Year</th>
              <th>Resume</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8">Loading applications...</td>
              </tr>
            ) : applications.length > 0 ? (
              applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.name || "-"}</td>
                  <td>{app.email || "-"}</td>
                  <td>{app.phone_no || "-"}</td>
                  <td>{app.current_city || "-"}</td>
                  <td>{app.college_name || "-"}</td>
                  <td>{app.graduation_year || "-"}</td>
                  <td>
                    {app.resume_url ? (
                      <a
                        href={app.resume_url}
                        target="_blank"
                        rel="noreferrer"
                        className="admin-app-btn"
                      >
                        Resume
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="admin-app-btn secondary"
                      onClick={() => setSelectedApplication(app)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">
                  {selectedJobId
                    ? "No applications found."
                    : "Please select a job first."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedApplication && (
        <div className="admin-app-details-card">
          <div className="admin-app-details-header">
            <div>
              <p className="admin-app-tag">Application Details</p>
              <h2>{selectedApplication.name || "Candidate"}</h2>
            </div>

            <button
              type="button"
              className="admin-app-btn secondary"
              onClick={() => setSelectedApplication(null)}
            >
              Close
            </button>
          </div>

          <div className="admin-app-details-grid">
            <div>
              <strong>ID:</strong> {selectedApplication.id ?? "-"}
            </div>
            <div>
              <strong>Job ID:</strong> {selectedApplication.job_id ?? "-"}
            </div>
            <div>
              <strong>Email:</strong> {selectedApplication.email ?? "-"}
            </div>
            <div>
              <strong>Phone:</strong> {selectedApplication.phone_no ?? "-"}
            </div>
            <div>
              <strong>City:</strong> {selectedApplication.current_city ?? "-"}
            </div>
            <div>
              <strong>College:</strong> {selectedApplication.college_name ?? "-"}
            </div>
            <div>
              <strong>Graduation Year:</strong>{" "}
              {selectedApplication.graduation_year ?? "-"}
            </div>
            <div>
              <strong>Branch:</strong> {selectedApplication.branch ?? "-"}
            </div>
            <div>
              <strong>Parent Name:</strong>{" "}
              {selectedApplication.parent_name ?? "-"}
            </div>
            <div>
              <strong>Parent Occupation:</strong>{" "}
              {selectedApplication.parent_occupation ?? "-"}
            </div>
            <div>
              <strong>Parent Phone:</strong>{" "}
              {selectedApplication.parent_phone ?? "-"}
            </div>
            <div>
              <strong>Applied At:</strong>{" "}
              {selectedApplication.applied_at ?? "-"}
            </div>
            <div>
              <strong>LinkedIn:</strong>{" "}
              {selectedApplication.linkedin_url ? (
                <a
                  href={selectedApplication.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  className="admin-app-btn"
                >
                  Open LinkedIn
                </a>
              ) : (
                "-"
              )}
            </div>
            <div>
              <strong>GitHub:</strong>{" "}
              {selectedApplication.github_url ? (
                <a
                  href={selectedApplication.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className="admin-app-btn"
                >
                  Open GitHub
                </a>
              ) : (
                "-"
              )}
            </div>
          </div>

          <div className="admin-app-answer-block">
            <h3>
              What is the most technically difficult thing you have personally
              built so far?
            </h3>
            <p>{selectedApplication.technical_challenge || "-"}</p>
          </div>

          <div className="admin-app-answer-block">
            <h3>
              What do you believe you are missing despite degree/courses you’ve
              done?
            </h3>
            <p>{selectedApplication.missing_skills || "-"}</p>
          </div>

          <div className="admin-app-answer-block">
            <h3>What kind of guidance do you think you need at this stage?</h3>
            <p>{selectedApplication.guidance_needed || "-"}</p>
          </div>

          <div className="admin-app-answer-block">
            <h3>Which statement best describes where you honestly stand right now?</h3>
            <p>
              {CURRENT_STAND_LABEL[selectedApplication.current_stand] ||
                selectedApplication.current_stand ||
                "-"}
            </p>
          </div>

          <div className="admin-app-answer-block">
            <h3>
              Given your current level and goals, how do you expect to engage
              with this program if selected?
            </h3>
            <p>
              {ENGAGEMENT_PLAN_LABEL[selectedApplication.engagement_plan] ||
                selectedApplication.engagement_plan ||
                "-"}
            </p>
          </div>

          <div className="admin-app-answer-block">
            <h3>What outcomes are you expecting from this program?</h3>
            <p>{selectedApplication.expected_outcomes || "-"}</p>
          </div>
        </div>
      )}
    </div>
  );
}
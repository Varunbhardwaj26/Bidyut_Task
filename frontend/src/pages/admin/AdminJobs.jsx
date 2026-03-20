import { useEffect, useState } from "react";
import {
  fetchAllJobsAdmin,
  createJobAdmin,
  updateJobAdmin,
  deleteJobAdmin,
} from "../../services/jobPortalApi";
import "./AdminJobs.css";

const initialFormData = {
  type: "",
  title: "",
  description: "",
  min_experience: 0,
  max_experience: 0,
  location: "",
  mode: "Remote",
  compensation: 0,
  compensation_type: "Stipend",
  is_open: "open",
};

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingJobId, setEditingJobId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const isEditMode = editingJobId !== null;

  const loadJobs = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await fetchAllJobsAdmin();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load jobs");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingJobId(null);
  };

  const closeModal = () => {
    setShowForm(false);
    resetForm();
    setError("");
  };

  const openCreateModal = () => {
    resetForm();
    setError("");
    setMessage("");
    setShowForm(true);
  };

  const handleEdit = (job) => {
    setError("");
    setMessage("");
    setEditingJobId(job.id);
    setFormData({
      type: job.type || "",
      title: job.title || "",
      description: job.description || "",
      min_experience: Number(job.min_experience ?? 0),
      max_experience: Number(job.max_experience ?? 0),
      location: job.location || "",
      mode: job.mode || "Remote",
      compensation: Number(job.compensation ?? 0),
      compensation_type: job.compensation_type || "Stipend",
      is_open: job.is_open || "open",
    });
    setShowForm(true);
  };

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
     "Warning: Deleting this job will remove all related applications and data permanently. Please confirm to continue."
    );
    if (!confirmDelete) return;

    try {
      setError("");
      setMessage("");
      setDeletingId(jobId);

      await deleteJobAdmin(jobId);

      setMessage("Job deleted successfully.");
      await loadJobs();
    } catch (err) {
      setError(err.message || "Failed to delete job");
    } finally {
      setDeletingId(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "min_experience" ||
        name === "max_experience" ||
        name === "compensation"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const validateForm = () => {
    if (!formData.type.trim()) return "Type is required.";
    if (!formData.title.trim()) return "Job title is required.";
    if (!formData.location.trim()) return "Location is required.";
    if (!formData.description.trim()) return "Description is required.";

    if (formData.min_experience < 0) {
      return "Minimum experience cannot be negative.";
    }

    if (formData.max_experience < 0) {
      return "Maximum experience cannot be negative.";
    }

    if (formData.min_experience > formData.max_experience) {
      return "Minimum experience cannot be greater than maximum experience.";
    }

    if (formData.compensation < 0) {
      return "Compensation cannot be negative.";
    }

    return "";
  };

  const handleSubmitJob = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setMessage("");
      return;
    }

    const payload = {
      ...formData,
      type: formData.type.trim(),
      title: formData.title.trim(),
      location: formData.location.trim(),
      description: formData.description.trim(),
    };

    try {
      setError("");
      setMessage("");
      setSubmitting(true);

      if (isEditMode) {
        await updateJobAdmin(editingJobId, payload);
        setMessage("Job updated successfully.");
      } else {
        await createJobAdmin(payload);
        setMessage("Job created successfully.");
      }

      closeModal();
      await loadJobs();
    } catch (err) {
      setError(
        err.message || `Failed to ${isEditMode ? "update" : "create"} job`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <p className="admin-page-tag">Admin / Jobs</p>
        <div className="header-two">
          
          <h1>Job Management</h1>
          
          <button className="admin-primary-btn" onClick={openCreateModal}>
            + Add New Job
          </button>
        </div>
        <p className="admin-page-subtext">
            Manage openings, review status, and keep track of applications.
          </p>
      </div>
      
      {error && <p className="admin-alert admin-alert-error">{error}</p>}
      {message && <p className="admin-alert admin-alert-success">{message}</p>}

      {showForm && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div
            className="admin-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <div>
                <p className="admin-page-tag">
                  {isEditMode ? "Update Job" : "Create New Job"}
                </p>
                <h2>{isEditMode ? "Edit Job Opening" : "Add Job Opening"}</h2>
              </div>

              <button
                type="button"
                className="admin-modal-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <span>&times;</span>
              </button>
            </div>

            <form className="admin-job-form" onSubmit={handleSubmitJob}>
              <div className="admin-form-group">
                <label htmlFor="type">Type</label>
                <input
                  id="type"
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="title">Job Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="mode">Mode</label>
                <select
                  id="mode"
                  name="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  required
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-Site">On-Site</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label htmlFor="min_experience">Min Experience</label>
                <input
                  id="min_experience"
                  type="number"
                  name="min_experience"
                  value={formData.min_experience}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="max_experience">Max Experience</label>
                <input
                  id="max_experience"
                  type="number"
                  name="max_experience"
                  value={formData.max_experience}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="compensation">Compensation</label>
                <input
                  id="compensation"
                  type="number"
                  name="compensation"
                  value={formData.compensation}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="compensation_type">Compensation Type</label>
                <select
                  id="compensation_type"
                  name="compensation_type"
                  value={formData.compensation_type}
                  onChange={handleChange}
                  required
                >
                  <option value="Stipend">Stipend</option>
                  <option value="Salary">Salary</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label htmlFor="is_open">Status</label>
                <select
                  id="is_open"
                  name="is_open"
                  value={formData.is_open}
                  onChange={handleChange}
                  required
                >
                  <option value="open">open</option>
                  <option value="closed">closed</option>
                </select>
              </div>

              <div className="admin-form-group admin-form-group-full">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-actions">
                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-primary-btn"
                  disabled={submitting}
                >
                  {submitting
                    ? isEditMode
                      ? "Updating..."
                      : "Creating..."
                    : isEditMode
                    ? "Update Job"
                    : "Create Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admin-table-card">
        <table className="admin-data-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Type</th>
              <th>Location</th>
              <th>Status</th>
              <th>Mode</th>
              <th>Compensation</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">Loading jobs...</td>
              </tr>
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title || "-"}</td>
                  <td>{job.type || "-"}</td>
                  <td>{job.location || "-"}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        job.is_open === "open" ? "open" : "closed"
                      }`}
                    >
                      {job.is_open || "-"}
                    </span>
                  </td>
                  <td>{job.mode || "-"}</td>
                  <td>
                    {job.compensation ?? "-"} {job.compensation_type || ""}
                  </td>
                  <td>
                    <div className="admin-action-group">
                      
                      <button
                        className="table-action-btn"
                        onClick={() => handleEdit(job)}
                      >
                        Edit
                      </button>

                      <button
                        className="table-action-btn"
                        onClick={() => handleDelete(job.id)}
                        disabled={deletingId === job.id}
                      >
                        {deletingId === job.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No jobs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
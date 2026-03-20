const USE_MOCK = false;

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

async function request(path, options = {}) {
  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: isFormData
      ? { ...(options.headers || {}) }
      : {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
    ...options,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    if (typeof data === "object" && Array.isArray(data?.detail)) {
      const firstError = data.detail[0];
      const fieldName = firstError?.loc?.[firstError.loc.length - 1];
      const message = firstError?.msg || "Request failed";
      throw new Error(fieldName ? `${fieldName}: ${message}` : message);
    }

    const msg =
      typeof data === "object" && data?.detail ? data.detail : "Request failed";
    throw new Error(msg);
  }

  return data;
}

export async function fetchOpenJobs() {
  try {
    const response = await fetch(`${BASE_URL}/apply/open_jobs_user`);

    if (!response.ok) {
      throw new Error(`Failed to fetch open jobs. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetchOpenJobs API call:", error);
    throw error;
  }
}


export async function startOtp(phone) {
  try {
    const response = await fetch(`${BASE_URL}/otp/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (Array.isArray(data?.detail)) {
        const firstError = data.detail[0];
        const fieldName = firstError?.loc?.[firstError.loc.length - 1];
        const message = firstError?.msg || `HTTP Error: ${response.status}`;
        throw new Error(fieldName ? `${fieldName}: ${message}` : message);
      }

      const errorMessage = data.detail || `HTTP Error: ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error("Error in startOtp API call:", error);
    throw error;
  }
}


export async function verifyOtp(phone, otp) {
  try {
    const response = await fetch(`${BASE_URL}/otp/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, otp }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (Array.isArray(data?.detail)) {
        const firstError = data.detail[0];
        const fieldName = firstError?.loc?.[firstError.loc.length - 1];
        const message = firstError?.msg || `HTTP Error: ${response.status}`;
        throw new Error(fieldName ? `${fieldName}: ${message}` : message);
      }

      const errorMessage = data.detail || `HTTP Error: ${response.status}`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error("Error in verifyOtp API call:", error);
    throw error;
  }
}

export async function applyApplicant(jobId, payload) {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("phone_no", payload.phone_no);
  formData.append("current_city", payload.currentCity);
  formData.append("parent_name", payload.parentName);
  formData.append("parent_occupation", payload.parentOccupation);
  formData.append("parent_phone", payload.parentPhone);
  formData.append("college_name", payload.collegeName);
  formData.append("graduation_year", payload.graduationYear);
  formData.append("branch", payload.branch);
  formData.append("linkedin_url", payload.linkedin);
  formData.append("github_url", payload.github);
  formData.append("technical_challenge", payload.technicalChallenge);
  formData.append("missing_skills", payload.missingSkills);
  formData.append("guidance_needed", payload.guidanceNeeded);
  formData.append("current_stand", payload.currentStand);
  formData.append("engagement_plan", payload.engagementPlan);
  formData.append("expected_outcomes", payload.expectedOutcomes);
  formData.append("resume", payload.resume);

  try {
    const response = await fetch(`${BASE_URL}/apply/${jobId}/apply`, {
      method: "POST",
      body: formData,
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      if (typeof data === "object" && Array.isArray(data?.detail)) {
        const firstError = data.detail[0];
        const fieldName = firstError?.loc?.[firstError.loc.length - 1];
        const message = firstError?.msg || `HTTP Error: ${response.status}`;
        throw new Error(fieldName ? `${fieldName}: ${message}` : message);
      }

      if (typeof data === "object" && data?.detail) {
        throw new Error(data.detail);
      }

      if (typeof data === "string" && data.trim()) {
        throw new Error(data);
      }

      throw new Error(`HTTP Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Error in applyApplicant API call:", error);
    throw error;
  }
}


export async function adminLogin(email, password) {
  try {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    const response = await fetch(`${BASE_URL}/auth/login-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      if (Array.isArray(data?.detail)) {
        const firstError = data.detail[0];
        const fieldName = firstError?.loc?.[firstError.loc.length - 1];
        const message = firstError?.msg || `HTTP Error: ${response.status}`;
        throw new Error(fieldName ? `${fieldName}: ${message}` : message);
      }

      if (typeof data?.detail === "string") {
        throw new Error(data.detail);
      }

      throw new Error(`HTTP Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Error in adminLogin API call:", error);
    throw error;
  }
}
export function setAdminToken(token) {
  localStorage.setItem("admin_token", token);
}

export function getAdminToken() {
  return localStorage.getItem("admin_token");
}

export function removeAdminToken() {
  localStorage.removeItem("admin_token");
}

export async function fetchAllJobsAdmin() {
  try {
    const token = getAdminToken();

    const response = await fetch(`${BASE_URL}/jobs/get_all_jobs`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || `HTTP Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Error in fetchAllJobsAdmin API call:", error);
    throw error;
  }
}

export async function createJobAdmin(payload) {
  try {
    const token = getAdminToken();

    const response = await fetch(`${BASE_URL}/jobs/create_job`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || `HTTP Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Error in createJobAdmin API call:", error);
    throw error;
  }
}

export async function updateJobAdmin(jobId, payload) {
  try {
    const token = getAdminToken();

    const response = await fetch(`${BASE_URL}/jobs/update_jobs/${jobId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || `HTTP Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Error in updateJobAdmin API call:", error);
    throw error;
  }
}

export async function deleteJobAdmin(jobId) {
  try {
    const token = getAdminToken();

    const response = await fetch(`${BASE_URL}/jobs/delete_job/${jobId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || `HTTP Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Error in deleteJobAdmin API call:", error);
    throw error;
  }
}

export async function fetchApplicationsByJob(jobId) {
  try {
    const token = getAdminToken();

    const response = await fetch(`${BASE_URL}/jobs/${jobId}/applications`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || `HTTP Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("Error in fetchApplicationsByJob API call:", error);
    throw error;
  }
}
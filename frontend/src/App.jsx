import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Career from "./pages/Career";
import ScrollToTop from "./components/ScrolltoTop";
import CareersJobs from "./pages/jobportal/CareersJobs";
import ApplyPage from "./pages/jobportal/ApplyPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminLayout from "./pages/admin/AdminLayout";
import { getAdminToken } from "./services/jobPortalApi";

function PublicLayout({ children }) {
  return (
    <div className="app">
      {children}
    </div>
  );
}

function ProtectedAdminRoute({ children }) {
  const token = getAdminToken();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <PublicLayout>
              <Career />
            </PublicLayout>
          }
        />
        <Route
          path="/careers/jobs"
          element={
            <PublicLayout>
              <CareersJobs />
            </PublicLayout>
          }
        />
        <Route
          path="/apply/:jobId"
          element={
            <PublicLayout>
              <ApplyPage />
            </PublicLayout>
          }
        />

        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="applications/:jobId" element={<AdminApplications />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
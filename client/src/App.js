import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Error, Landing, Login, ProtectedRoute, Register } from "./pages";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/Dashboard";
import SharedLayout from "./components/Dashboard/SharedLayout";
import AdminStudents from "./components/Admin/AdminStudents";
import AdminJobs from "./components/Admin/AdminJobs";
import AdminCompany from "./components/Admin/AdminCompany";
import AdminSettings from "./components/Admin/AdminSettings";
import CompanyJobs from "./components/Company/CompanyJobs";
import CompanySettings from "./components/Company/CompanySettings";
import StudentJobs from "./components/Student/StudentJobs";
import StudentSettings from "./components/Student/StudentSettings";
import { useAppContext } from "./context/appContext";
import StudentCompany from "./components/Student/StudentCompany";
import StudentView from "./components/Student/StudentView";
import CompanyView from "./components/Company/CompanyView";
import JobsView from "./components/Jobs/JobsView";
import Profile from "./components/Profile";
// import '@fortawesome/fontawesome-free/css/all.css';
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const {user}=useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
           <Route index element={<Dashboard />} />
           <Route path="students/:id" element={<StudentView />} />
           <Route path="company/:id" element={<CompanyView />} />
           <Route path="jobs/:id" element={<JobsView />} />
           <Route path="profile/:id" element={<Profile />} />
          {user?.role==="admin" && (
            <>
            <Route path="students" element={<AdminStudents />} />
          <Route path="company" element={<AdminCompany />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="settings" element={<AdminSettings />} />
            </>
          )}
          {user?.role==="company" && (<>
          <Route path="jobs" element={<CompanyJobs />} />
          <Route path="settings" element={<CompanySettings />} />
          </>)}
         {user?.role==="student" && (<>
         <Route path="jobs" element={<StudentJobs />} />
         <Route path="settings" element={<StudentSettings />} />
         <Route path="companies" element={<StudentCompany />} />
         </>)}
          
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
}

export default App;

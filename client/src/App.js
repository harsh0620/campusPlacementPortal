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
import AdminProfile from "./components/Admin/AdminProfile";
import CompanyJobs from "./components/Company/CompanyJobs";
import CompanySettings from "./components/Company/CompanySettings";
import CompanyProfile from "./components/Company/CompanyProfile";
import StudentJobs from "./components/Student/StudentJobs";
import StudentSettings from "./components/Student/StudentSettings";
import StudentProfile from "./components/Student/StudentProfile";
import StudentAlumni from "./components/Student/StudentAlumni";
import { useAppContext } from "./context/appContext";
import StudentCompany from "./components/Student/StudentCompany";
import StudentView from "./components/Student/StudentView";

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
          {user?.role==="admin" && (
            <>
            <Route path="students" element={<AdminStudents />} />
          <Route path="companies" element={<AdminCompany />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="profile" element={<AdminProfile />} />
            </>
          )}
          {user?.role==="company" && (<>
          <Route path="jobs" element={<CompanyJobs />} />
          <Route path="settings" element={<CompanySettings />} />
          <Route path="profile" element={<CompanyProfile />} />
          </>)}
         {user?.role==="student" && (<>
         <Route path="jobs" element={<StudentJobs />} />
         <Route path="settings" element={<StudentSettings />} />
         <Route path="profile" element={<StudentProfile />} />
         <Route path="alumni" element={<StudentAlumni />} />
         <Route path="companies" element={<StudentCompany />} />
         </>)}
          
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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

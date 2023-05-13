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

function App() {
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
          <Route path="students" element={<AdminStudents />} />
          <Route path="companies" element={<AdminCompany />} />
          <Route path="jobs" element={<AdminJobs />} />
          {/* <Route path="all-jobs" element={<AllJobs />}></Route>
          <Route path="add-job" element={<AddJob />}></Route>
          <Route path="add-bookmark" element={<AddBookMark />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="todo" element={<Todo />}></Route>
          <Route path="log" element={<Log />}></Route>
          <Route path="pomodoro" element={<Pomodoro />}></Route> */}
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

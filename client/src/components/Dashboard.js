import React from "react";
import { useAppContext } from "../context/appContext";
import AdminHome from "./Admin/AdminHome";
import StudentHome from "./Student/StudentHome";
import CompanyHome from "./Company/CompanyHome";

const Dashboard = () => {
  const { user } = useAppContext();
  return <div>
    {user?.role==="admin" &&  <AdminHome/>}
    {user?.role==="student" &&  <StudentHome/>}
    {user?.role==="company" &&  <CompanyHome/>}
 
  </div>;
};

export default Dashboard;

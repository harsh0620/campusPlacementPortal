import React from "react";
import { useAppContext } from "../context/appContext";
import AdminHome from "./Admin/AdminHome";

const Dashboard = () => {
  const { user } = useAppContext();
  return <div>
  <AdminHome/>
  </div>;
};

export default Dashboard;

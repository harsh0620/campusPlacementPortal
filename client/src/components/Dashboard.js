import React from "react";
import { useAppContext } from "../context/appContext";

const Dashboard = () => {
  const { user } = useAppContext();
  return <div>Dashboard-{user?.name}</div>;
};

export default Dashboard;

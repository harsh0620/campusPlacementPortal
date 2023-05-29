import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import AdminView from "./AdminView";
import Loader from "../Loader";



const AdminProfile = () => {
  const { getAdminDetails,
    isLoading, } = useAppContext();
  useEffect(() => {
    getAdminDetails("admin");
  }, []);
  if (isLoading)
  return (
    <Loader
      backgroundColor="text-gray-300"
      loaderColor="fill-black"
      text="Loading"
    />
  );
  return (
    <div className="bg-white w-full">
     <AdminView/>
    </div>
  );
};

export default AdminProfile;

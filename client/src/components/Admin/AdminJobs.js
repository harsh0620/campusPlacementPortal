import React, { useEffect } from "react";
import Loader from "../Loader";
import { useAppContext } from "../../context/appContext";
import AdminJobDriveTable from "./AdminJobDriveTable";

const AdminJobs = () => {
  const { jobsByAdmin, isLoading, searchJobsByAdmin } = useAppContext();

  useEffect(() => {
    searchJobsByAdmin();
    console.log(jobsByAdmin);
  // eslint-disable-next-line
    }, []);
  if (isLoading) {
    return <Loader backgroundColor="text-gray-300" loaderColor="fill-black" text="Loading"/>;
  }
 return (
    <div className='mt-8'><AdminJobDriveTable jobDrives={jobsByAdmin}/></div>
  );
};

export default AdminJobs;

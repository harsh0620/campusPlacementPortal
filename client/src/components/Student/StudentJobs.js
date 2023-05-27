import React, { useEffect } from "react";
import Loader from "../Loader";
import { useAppContext } from "../../context/appContext";
import StudentJobDriveTable from "./StudentJobDriveTable";

const StudentJobs = () => {
  const { jobsByStudent, isLoading,searchJobsByStudent } = useAppContext();

  useEffect(() => {
    searchJobsByStudent();
  // eslint-disable-next-line
    }, []);
  if (isLoading) {
    return <Loader backgroundColor="text-gray-300" loaderColor="fill-black" text="Loading"/>;
  }
 return (
    <div className='mt-8'><StudentJobDriveTable jobDrives={jobsByStudent}/></div>
  );
};

export default StudentJobs;

import React, { useEffect } from "react";
import Loader from "../Loader";
import { useAppContext } from "../../context/appContext";
import CompanyJobDriveTable from "./CompanyJobDriveTable";
import ActionCard from "../ActionCard";
import { FaReact } from "react-icons/fa";
import CompanyJobForm from "./CompanyJobForm";

const CompanyJobs = () => {
  const { jobsByCompany, isLoading, searchJobsByCompany } = useAppContext();

  useEffect(() => {
    searchJobsByCompany();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return (
      <Loader
        backgroundColor="text-gray-300"
        loaderColor="fill-black"
        text="Loading"
      />
    );
  }
  return (
    <div>
      <ActionCard
        title={"Create Job"}
        bgColor={"bg-blue-500"}
        icon={<FaReact />}
        dropDownComponent={<CompanyJobForm />}
      />
      <CompanyJobDriveTable jobDrives={jobsByCompany} />
    </div>
  );
};

export default CompanyJobs;

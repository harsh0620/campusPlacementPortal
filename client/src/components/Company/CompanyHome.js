import React, { useEffect } from "react";
import StatCard from "../StatCard";
import { useAppContext } from "../../context/appContext";
import { FaBriefcase, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { RiFileList3Line } from "react-icons/ri";

const CompanyHome = () => {
  const { statsForCompany,getStatsByCompany } = useAppContext();
  useEffect(() => {
    document.title = "Company Home | Placement Portal";
    getStatsByCompany();
  }, []);
  return (
    <div className="pb-16">
      <div className="flex sm:flex-row flex-col mx-2">
        <StatCard
          title="Total Jobs"
          value={statsForCompany?.totalJobDrives}
          icon={<FaBriefcase />}
          textColor={"text-blue-500"}
          valueText={statsForCompany?.totalJobDrives > 1 ? `Jobs` : "Job"}
        />
        <StatCard
          title="Applied In"
          value={statsForCompany?.totalStudentsApplied}
          icon={<RiFileList3Line />}
          textColor={"text-orange-500"}
          valueText={
            statsForCompany?.totalStudentsApplied > 1 ? `Students` : "Student"
          }
        />
      </div>
      <div className="flex sm:flex-row flex-col mx-2">
        <StatCard
          title="Selected Students"
          value={statsForCompany?.totalSelectedStudents}
          icon={<FaCheckCircle />}
          textColor={"text-green-500"}
          valueText={statsForCompany?.totalSelectedStudents > 1 ? `Students` : "Students"}
        />
        <StatCard
          title="Not Selected Students"
          value={statsForCompany?.totalNotSelectedStudents}
          icon={<FaTimesCircle />}
          textColor={"text-red-500"}
          valueText={
            statsForCompany?.totalNotSelectedStudents > 1 ? `Students` : "Student"
          }
        />
      </div>
    </div>
  );
};

export default CompanyHome;

import React, { useEffect} from "react";
import { useAppContext } from "../../context/appContext";
import Loader from "../Loader";
import StudentCompanyTable from "./StudentCompanyTable";


const StudentCompany = () => {
  const { companiesByStudent, isLoading, searchCompaniesByStudent } = useAppContext();

  useEffect(() => {
    searchCompaniesByStudent();
    // eslint-disable-next-line
    }, []);
  if (isLoading) {
    return <Loader backgroundColor="text-gray-300" loaderColor="fill-black" text="Loading"/>;
  }
  return (
    <div className="bg-white w-full pb-16">
     <div className=" w-full m-auto flex flex-col justify-center overflow-x-auto  border rounded-xl mb-4">
      <StudentCompanyTable companies={companiesByStudent} />
      </div>
    </div>
  );
};

export default StudentCompany;

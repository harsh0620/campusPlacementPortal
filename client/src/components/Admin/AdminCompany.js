import React, { useContext, useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import Loader from "../Loader";
import AdminCompanyTable from "./AdminCompanyTable";


const AdminCompany = () => {
  const { companiesByAdmin, isLoading, searchCompaniesByAdmin } = useAppContext();

  useEffect(() => {
    searchCompaniesByAdmin();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loader backgroundColor="text-gray-300" loaderColor="fill-black" />;
  }
  return (
    <div className="bg-white w-full pb-16">
     <div className=" w-full m-auto flex flex-col justify-center overflow-x-auto  border rounded-xl mb-4">
      <AdminCompanyTable companies={companiesByAdmin} />
      </div>
    </div>
  );
};

export default AdminCompany;

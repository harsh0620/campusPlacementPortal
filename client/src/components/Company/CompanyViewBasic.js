import React from "react";
import CompanyViewComp from "./CompanyViewComp";
import { useAppContext } from "../../context/appContext";

const CompanyViewBasicComp = () => {
  const { specificCompany } = useAppContext();
  return (
    <div className="flex flex-col">
  <div className="flex flex-col items-start p-2">
    <div className="grid grid-cols-1 gap-4">
      <div>
        <p className="text-gray-700 font-medium">About:</p>
        <p className="w-full break-words">{specificCompany?.description}</p>
      </div>
      <div>
        <p className="text-gray-700 font-medium">Address:</p>
        <p className="w-full break-words">{specificCompany?.address}</p>
      </div>
    </div>
  </div>
</div>

  );
};

const CompanyViewBasic = () => {
  return (
    <div>
      <CompanyViewComp
        title="Basic Details"
        viewComponent={<CompanyViewBasicComp />}
      />
    </div>
  );
};

export default CompanyViewBasic;

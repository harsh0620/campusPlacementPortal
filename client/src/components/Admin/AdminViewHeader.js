import React from "react";
import { useAppContext } from "../../context/appContext";
import { FaUserCircle } from "react-icons/fa";

const AdminViewHeader = () => {
  const { getRandomColor, specificAdmin } = useAppContext();
  return (
    <div className="shadow bg-white w-full rounded-xl flex flex-col">
      {/* //Details Section */}
      <div className="flex flex-col relative w-full">
        <div
          className={`rounded-t-xl mb-20 ${getRandomColor()}`}
          style={{ minHeight: "100px" }}
        ></div>
      </div>
      <div className="flex flex-col absolute md:mt-6 mt-12 ml-4">
        <FaUserCircle className="md:w-32 md:h-32 w-20 h-20 rounded-full m-4 bg-white p-1" />
      </div>
      <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start p-4">
        <div className="flex flex-col">
          <div className="text-2xl font-bold">{specificAdmin?.name}</div>
          <div className="text-lg font-medium">
            {specificAdmin?.designation}
          </div>
          <div className="text-lg font-medium">
            {specificAdmin?.gender}
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <div className="text-lg font-medium">{specificAdmin?.phone}</div>
            <div className="text-lg font-medium">{specificAdmin?.email}</div>
            <div className="text-lg font-medium">{specificAdmin?.aadharno}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminViewHeader;

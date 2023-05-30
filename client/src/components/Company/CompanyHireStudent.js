import React from "react";
import { useAppContext } from "../../context/appContext";
import { useParams } from "react-router-dom";
import Loader from "../Loader";

const CompanyHireStudent = ({ studentId }) => {
  const {
    actionJobAction,
    actionJobProfile,
    actionJobPackage,
    handleChange,
    isLoading,
    actionForStudentForJobDrive,
  } = useAppContext();
  const { id } = useParams();
  const handleAction = () => {
    actionForStudentForJobDrive({studentId:id});
    setTimeout(() => {
      window.location.reload(false);
    }, 4500);
  };
  const handleActionChange = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  return (
    <div className="flex flex-col w-full ">
      <div className="z-50 bg-white rounded-lg p-4 flex flex-row  mt-14 mr-4 shadow hover:shadow-md">
        <form
          className=" w-full m-auto flex flex-col justify-center overflow-x-auto"
          onSubmit={handleAction}
        >
          <div className="w-full flex flex-col">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="actionJobAction"
            >
              Action Type
            </label>
            <select
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
                        transition duration-150 ease-in-out focus:text-gray-700
                        focus:bg-white focus:border-slate-600 p-2"
              type="text"
              id="actionJobAction"
              name="actionJobAction"
              placeholder="Enter actionJobAction"
              value={actionJobAction}
              onChange={handleActionChange}
            >
              <option value="hire">Hire</option>
              <option value="reject">Reject</option>
            </select>
          </div>
          {actionJobAction === "hire" && (
            <>
              <div className="w-full flex flex-col">
                <label
                  className="text-left text-black text-md font-medium"
                  htmlFor="actionJobProfile"
                >
                  Enter Job Profile
                </label>
                <input
                  className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
                        transition duration-150 ease-in-out focus:text-gray-700
                        focus:bg-white focus:border-slate-600 p-2"
                  type="text"
                  id="actionJobProfile"
                  name="actionJobProfile"
                  placeholder="Enter actionJobProfile"
                  value={actionJobProfile}
                  onChange={handleActionChange}
                />
              </div>
              <div className="w-full  flex flex-col">
                <label
                  className="text-left text-black text-md font-medium"
                  htmlFor="actionJobPackage"
                >
                  Enter Job Package
                </label>
                <input
                  className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
                        transition duration-150 ease-in-out focus:text-gray-700
                        focus:bg-white focus:border-slate-600 p-2"
                  type="text"
                  id="actionJobPackage"
                  name="actionJobPackage"
                  placeholder="Enter actionJobPackage"
                  value={actionJobPackage}
                  onChange={handleActionChange}
                />
              </div>
            </>
          )}
          <button
            className="flex mt-2 mb-2 w-full items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && (
              <Loader
                backgroundColor="text-gray-300"
                loaderColor="fill-black"
                text="Loading"
              />
            )}
            {!isLoading && "Take Action"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyHireStudent;

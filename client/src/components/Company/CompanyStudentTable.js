import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Loader from "../Loader";

const HireStudent = ({ studentId }) => {
  const {
    actionJobProfile,
    actionJobPackage,
    handleChange,
    isLoading,
    actionForStudentForJobDrive,
  } = useAppContext();
  const { id } = useParams();
  const handleAction = () => {
    handleChange({ name: "actionJobStudentId", value: studentId });
    handleChange({ name: "actionJobAction", value: "hire" });
    actionForStudentForJobDrive(id);
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
            {!isLoading && "Hire"}
          </button>
        </form>
      </div>
    </div>
  );
};
const CompanyStudentTable = ({ students }) => {
  console.log(students);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const { handleChange, actionForStudentForJobDrive ,actionStudentId,actionJobAction} = useAppContext();
  const { id } = useParams();
  const rejectStudent = (studentId) => {
    console.log(studentId);
    if(window.confirm("Are you sure you want to reject this student?")){
    handleChange({ name: "actionStudentId", value: studentId });
    handleChange({ name: "actionJobAction", value: "reject" });
    console.log(actionStudentId,actionJobAction);
    actionForStudentForJobDrive(id);
    }
  };
  return (
    <div className="flex flex-col w-full">
      <div className="overflow-x-auto ">
        <div className="align-middle inline-block min-w-full ">
          <div className="shadow overflow-hidden border-b border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Enrollment No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stream
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Verified
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Placement Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students?.map((student, index) => (
                  <tr key={index}>
                    <td
                      className="px-6 py-4 whitespace-nowrap cursor-pointer "
                      onClick={() => navigate(`/students/${student?._id}`)}
                    >
                      <div className="text-sm font-medium text-gray-900 hover:text-blue-500">
                        {student?.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {student?.enrollmentNo}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {student?.personalDetails?.stream}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student?.applicationStatus === "verified" ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Verified
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Not Verified
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student?.placementDetails?.selected === "yes" ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Placed
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Not Placed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap ">
                      {/* <div className="text-sm text-gray-500">
                        {student?.personalDetails?.stream}
                      </div> */}
                      <div className="flex flex-row">
                        <button
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 mr-2"
                          onClick={() => setShowDialog(!showDialog)}
                        >
                          Hire
                        </button>

                        <button
                          className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                          onClick={() => rejectStudent(student?._id)}
                        >
                          Reject
                        </button>
                      </div>
                      {showDialog && (
                      <HireStudent studentId={student?._id} />)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyStudentTable;

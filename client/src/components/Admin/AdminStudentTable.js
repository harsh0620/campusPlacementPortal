import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { useAppContext } from "../../context/appContext";
import { FaFileDownload } from "react-icons/fa";
import { toast } from "react-toastify";

const AdminStudentTable = ({ students }) => {
  const navigate = useNavigate();
  const { getCSVDataByAdmin, isLoading } = useAppContext();
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleSelectStudent = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const handleSelectAllStudents = () => {
    if (selectedStudents?.length === students?.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map((student) => student._id));
    }
  };
  const handleDownloadCSV = () => {
    if(selectedStudents.length===0){
      toast.error("Please select atleast one student to download CSV");
      return;
    }
    getCSVDataByAdmin(selectedStudents);
  };
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
    <div className="flex flex-col w-full">
      <div className="flex flex-col justify-start">
        <button
          title="Download CSV"
          className="flex flex-row justify-center items-center my-2 border bg-white px-2 py-1 rounded-lg text-sm font-medium"
          disabled={isLoading}
          onClick={() => handleDownloadCSV()}
        >
          {isLoading && (
            <Loader
              backgroundColor="text-gray-300"
              loaderColor="fill-black"
              text="Loading"
            />
          )}
          {!isLoading && (
            <>
              <div className="flex flex-row p-2 font-bold text-md items-center justify-center">
                <FaFileDownload />
                <span className="ml-2"> Download data in CSV Format</span>
              </div>
            </>
          )}
        </button>
      </div>
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
                    <input
                      type="checkbox"
                      checked={selectedStudents?.length === students?.length}
                      onChange={handleSelectAllStudents}
                    />
                  </th>
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
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students?.map((student, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student?._id)}
                        onChange={() => handleSelectStudent(student?._id)}
                      />
                    </td>
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

export default AdminStudentTable;

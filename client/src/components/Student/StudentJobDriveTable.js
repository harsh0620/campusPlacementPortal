import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

const StudentJobDriveTable = ({ jobDrives }) => {
  const navigate = useNavigate();
  const { convertToLPA } = useAppContext();
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
                    Company
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Designations
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Drive Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Package
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Locations
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Pdf Link
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              
                {jobDrives?.map((jobDrive, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {jobDrive?.company?.name}
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap cursor-pointer "
                      onClick={() => navigate(`/jobs/${jobDrive?._id}`)}
                    >
                      <div className="text-sm font-medium text-gray-900 hover:text-blue-500">
                        {jobDrive?.designations?.map((designation, index) => {
                          return (
                            <div key={index}>
                              <span>{designation}</span>
                              <br />
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(jobDrive?.driveDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        Min: {convertToLPA(jobDrive?.packageValue?.min)} LPA{" "}
                        <br />
                        Max: {convertToLPA(jobDrive?.packageValue?.max)} LPA
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {jobDrive?.locations?.map((location, index) => {
                          return (
                            <div key={index}>
                              <span>{location} </span>
                              <br />
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        className="text-sm text-blue-500"
                        href={jobDrive?.pdfLink}
                        target="__blank"
                      >
                        {jobDrive?.pdfLink}
                      </a>
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

export default StudentJobDriveTable;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

const StudentCompanyTable = ({ companies }) => {
  const navigate = useNavigate();
  const {isValidImageUrl}=useAppContext();
  console.log(companies);
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
                    Logo
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
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Website
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {companies?.map((company, index) => (
                  <tr key={index}>
                    <td className="px-6 py-1 whitespace-nowrap " onClick={()=>navigate(`/company/${company?._id}`)}>
                      {isValidImageUrl(company?.logo) ? (
                        <img
                          src={company?.logo}
                          className="cursor-pointer md:w-12 md:h-12 h-8 w-8 rounded-full m-4 border p-1 flex items-center justify-center text-gray-900 font-medium text-xl hover:text-blue-500"
                          alt="company logo"
                        />
                      ) : (
                        <div className="cursor-pointer md:w-12 md:h-12 h-8 w-8 rounded-full m-4 border p-1 flex items-center justify-center text-gray-900 font-medium text-xl hover:text-blue-500">
                        {company?.name ? company?.name.charAt(0) : ''}
                      </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {company?.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {company?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a
                        className="text-sm text-blue-500"
                        href={company?.website}
                      >
                        {company?.website}
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

export default StudentCompanyTable;

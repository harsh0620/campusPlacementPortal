import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import Loader from "../Loader";

const StudentProfileCertifications = () => {
  const {
    isLoading,
    handleUpdateStateValues,
    professionalCertifications,
    getStudentProfileProfessional,
    updateStudentProfileProfessional,
  } = useAppContext();
  const handleCertifications = (event, index) => {
    const newCertifications = [...professionalCertifications];
    const { name, value } = event.target;
    newCertifications[index][name] = value;
    handleUpdateStateValues({
      name: "professionalCertifications",
      value: newCertifications,
    });
  };
  const handleAddProject = () => {
    handleUpdateStateValues({
      name: "professionalCertifications",
      value: [
        ...professionalCertifications,
        {
            certificationName: "",
            certificationAuthority: "",
            certificationLink: "",
          },
      ],
    });
  };

  const handleRemoveProject = (index) => {
    const newCertifications = [...professionalCertifications];
    newCertifications.splice(index, 1);
    handleUpdateStateValues({
      name: "professionalCertifications",
      value: newCertifications,
    });
  };
  const onUpdateProfile = (e) => {
    e.preventDefault();
    updateStudentProfileProfessional();
  };
  useEffect(() => {
    getStudentProfileProfessional();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <form
      className=" w-full m-auto flex flex-col justify-center overflow-x-auto  border rounded-lg md:p-4 p-2"
      onSubmit={onUpdateProfile}
    >
      {professionalCertifications?.map((certificate, index) => (
        <div
          key={index}
          className="flex flex-col w-full border rounded-md p-4 mt-1"
        >
          <div className="w-full flex flex-row justify-between">
            <div className="text-lg font-bold">
              Certificate {index + 1}
            </div>
            <div>
              <button
                onClick={() => handleRemoveProject(index)}
                className="bg-red-500 rounded-full text-white p-1"
              >
                <FaMinus />
              </button>
            </div>
          </div>
          <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="certificationName"
            >
              Certification Name
            </label>
            <input
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="text"
              id="certificationName"
              name="certificationName"
              placeholder="Enter Certificate Name"
              value={certificate?.certificationName}
              onChange={(event) => handleCertifications(event, index)}
            />
          </div>
          <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="certificationAuthority"
            >
              Certification Authority
            </label>
            <input
             
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="text"
              id="certificationAuthority"
              name="certificationAuthority"
              placeholder="Enter Certification Authority"
              value={certificate?.certificationAuthority}
              onChange={(event) => handleCertifications(event, index)}
            />
          </div>
          <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="certificationLink"
            >
              Certification Link
            </label>
            <input
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="text"
              id="certificationLink"
              name="certificationLink"
              placeholder="Enter Certification Link"
              value={certificate?.certificationLink}
              onChange={(event) => handleCertifications(event, index)}
            />
          </div>
          
        </div>
      ))}
      <div className="flex flex-row w-full justify-between p-1 my-2">
        <button
          className="flex w-full mr-2 items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          type="submit"
          disabled={isLoading}
        >
          {isLoading && (
            <Loader backgroundColor="text-gray-300" loaderColor="fill-black" text="Loading"/>
          )}
          {!isLoading && "Update Projects"}
        </button>
        <button
          type="button"
          onClick={handleAddProject}
          className="flex flex-col w-8 h-8 mt-1 items-center justify-center  bg-green-500 hover:bg-green-600 text-white font-medium p-2 rounded-full"
        >
          <FaPlus />
        </button>
      </div>
    </form>
  );
};

export default StudentProfileCertifications;

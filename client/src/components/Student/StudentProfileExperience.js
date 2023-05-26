import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import Loader from "../Loader";

const StudentProfileExperience = () => {
  const {
    isLoading,
    handleUpdateStateValues,
    professionalExperiences,
    getStudentProfileProfessional,
    updateStudentProfileProfessional,
  } = useAppContext();
  const handleExperienceDetails = (event, index) => {
    const newExperienceDetails = [...professionalExperiences];
    const { name, value } = event.target;
    newExperienceDetails[index][name] = value;
    handleUpdateStateValues({
      name: "professionalExperiences",
      value: newExperienceDetails,
    });
  };
  const handleAddExperience = () => {
    handleUpdateStateValues({
      name: "professionalExperiences",
      value: [
        ...professionalExperiences,
        {
          companyName: "",
          designation: "",
          duration: null,
          location: "",
          jobDescription: "",
          from: null,
          to: null,
        },
      ],
    });
    console.log(professionalExperiences);
  };

  const handleRemoveExperience = (index) => {
    const newExperienceDetails = [...professionalExperiences];
    newExperienceDetails.splice(index, 1);
    handleUpdateStateValues({
      name: "professionalExperiences",
      value: newExperienceDetails,
    });
  };
  const onUpdateProfile = (e) => {
    e.preventDefault();
    updateStudentProfileProfessional();
  };
  useEffect(() => {
    getStudentProfileProfessional();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // eslint-disable-next-line
    }, []);
  return (
    <form
      className=" w-full m-auto flex flex-col justify-center overflow-x-auto  border rounded-lg md:p-4 p-2"
      onSubmit={onUpdateProfile}
    >
      {professionalExperiences?.map((experience, index) => (
        <div
          key={index}
          className="flex flex-col w-full border rounded-md p-4 mt-1"
        >
          <div className="w-full flex flex-row justify-between">
            <div className="text-lg font-bold">
              Professional Experience {index + 1}
            </div>
            <div>
              <button
                onClick={() => handleRemoveExperience(index)}
                className="bg-red-500 rounded-full text-white p-1"
              >
                <FaMinus />
              </button>
            </div>
          </div>
          <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="companyName"
            >
              Company Name
            </label>
            <input
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter Company Name"
              value={experience?.companyName}
              onChange={(event) => handleExperienceDetails(event, index)}
            />
          </div>
          <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="designation"
            >
              Designation
            </label>
            <input
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="text"
              id="designation"
              name="designation"
              placeholder="Enter Designation"
              value={experience?.designation}
              onChange={(event) => handleExperienceDetails(event, index)}
            />
          </div>
          <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="text"
              id="location"
              name="location"
              placeholder="Enter Location"
              value={experience?.location}
              onChange={(event) => handleExperienceDetails(event, index)}
            />
          </div>
          
          <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="duration"
            >
              Duration in months
            </label>
            <input
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="number"
              id="duration"
              name="duration"
              placeholder="Enter Duration"
              value={experience?.duration}
              onChange={(event) => handleExperienceDetails(event, index)}
            />
          </div>
          <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="from"
            >
              From
            </label>
            <input
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="date"
              id="from"
              name="from"
              placeholder="Enter From"
              value={experience?.from?.toString().slice(0, 10)}
              onChange={(event) => handleExperienceDetails(event, index)}
            />
          </div>
          <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="to"
            >
              To
            </label>
            <input
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="date"
              id="to"
              name="to"
              placeholder="Enter To"
              value={experience?.to?.toString().slice(0, 10)}
              onChange={(event) => handleExperienceDetails(event, index)}
            />
          </div>
          <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="jobDescription"
            >
              Job Description
            </label>
            <textarea
            rows={5}
              className="mt-2 mb-2 w-full border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="text"
              id="jobDescription"
              name="jobDescription"
              placeholder="Enter Job Description"
              value={experience?.jobDescription}
              onChange={(event) => handleExperienceDetails(event, index)}
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
          {!isLoading && "Update Experience"}
        </button>
        <button
          type="button"
          onClick={handleAddExperience}
          className="flex flex-col w-8 h-8 mt-1 items-center justify-center  bg-green-500 hover:bg-green-600 text-white font-medium p-2 rounded-full"
        >
          <FaPlus />
        </button>
      </div>
    </form>
  );
};

export default StudentProfileExperience;

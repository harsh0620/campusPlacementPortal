import React from "react";
import { useAppContext } from "../../context/appContext";
import Loader from "../Loader";
import { programsList, streamsList } from "../../utils/constants";
import { useParams } from "react-router-dom";

const CompanyJobForm = () => {
  const {
    jobDriveDesignations,
    jobDriveLocations,
    jobDriveStreams,
    jobDrivePrograms,
    jobDriveStartDate,
    jobDriveEndDate,
    jobDriveEligibilityCriteriaBacklog,
    jobDriveEligibilityCriteriaCgpa,
    jobDriveDriveDate,
    jobDrivePackageValueMin,
    jobDrivePackageValueMax,
    jobDriveDescription,
    jobPdfLink,
    isLoading,
    handleChange,
    updateJobDrive,
    createJobDrive,
  } = useAppContext();
  const handleProfileChange = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleMultipleSelect = (e) => {
    let options = e.target.options;
    let values = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    handleChange({ name: e.target.name, value: values });
  };
  const { id } = useParams();
  const onUpdateProfile = (e) => {
    e.preventDefault();
    if (id) {
      updateJobDrive(id);
    } else {
      createJobDrive();
    }
    setTimeout(() => {
        window.location.reload(false);
      }, 4500);
  };

  return (
    <form
      className=" w-full m-auto flex flex-col justify-center overflow-x-auto  border rounded-lg md:p-4 p-2"
      onSubmit={onUpdateProfile}
    >
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="jobDriveDesignations"
        >
          Designations
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="jobDriveDesignations"
          name="jobDriveDesignations"
          placeholder="Enter Designations (comma separated)"
          value={jobDriveDesignations}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="jobDriveLocations"
        >
          Locations
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="jobDriveLocations"
          name="jobDriveLocations"
          placeholder="Enter Locations (comma separated)"
          value={jobDriveLocations}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="jobDriveStreams"
        >
          Streams
        </label>
        <select
          className="mt-2 mb-2 w-full border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="jobDriveStreams"
          name="jobDriveStreams"
          placeholder="Enter Job Drive Streams"
          value={jobDriveStreams}
          multiple
          onChange={handleMultipleSelect}
        >
          {streamsList.map((stream, index) => (
            <option key={index} value={stream.value}>
              {stream.title}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="jobDrivePrograms"
        >
          Programs
        </label>
        <select
          className="mt-2 mb-2 w-full  border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="jobDrivePrograms"
          name="jobDrivePrograms"
          placeholder="Enter Job Drive Programs"
          value={jobDrivePrograms}
          multiple
          onChange={handleMultipleSelect}
        >
          {programsList.map((program, index) => (
            <option key={index} value={program.value}>
              {program.title}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="jobDriveStartDate"
        >
          Drive Start Date
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="date"
          id="jobDriveStartDate"
          name="jobDriveStartDate"
          placeholder="Enter Drive Start Date"
          value={jobDriveStartDate ?new Date(jobDriveStartDate).toISOString().substr(0, 10):""}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="jobDriveEndDate"
        >
          Drive End Date
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="date"
          id="jobDriveEndDate"
          name="jobDriveEndDate"
          placeholder="Enter Drive End Date"
          value={jobDriveEndDate?new Date(jobDriveEndDate).toISOString().substr(0, 10):""}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="jobDriveDriveDate"
        >
          Drive Drive Date
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="date"
          id="jobDriveDriveDate"
          name="jobDriveDriveDate"
          placeholder="Enter Drive Drive Date"
          value={jobDriveDriveDate?new Date(jobDriveDriveDate).toISOString().substr(0, 10):""}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="jobDriveEligibilityCriteriaBacklog"
        >
          Backlogs Allowed
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="number"
          id="jobDriveEligibilityCriteriaBacklog"
          name="jobDriveEligibilityCriteriaBacklog"
          placeholder="Enter Backlogs Allowed"
          value={jobDriveEligibilityCriteriaBacklog}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="jobDriveEligibilityCriteriaCgpa"
        >
          Minimum CGPA
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="number"
          id="jobDriveEligibilityCriteriaCgpa"
          name="jobDriveEligibilityCriteriaCgpa"
          placeholder="Enter Minimum CGPA"
          value={jobDriveEligibilityCriteriaCgpa}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="jobDrivePackageValueMin"
        >
          Minimum Package
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="number"
          id="jobDrivePackageValueMin"
          name="jobDrivePackageValueMin"
          placeholder="Enter Minimum Package"
          value={jobDrivePackageValueMin}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="jobDrivePackageValueMax"
        >
          Maximum Package
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="number"
          id="jobDrivePackageValueMax"
          name="jobDrivePackageValueMax"
          placeholder="Enter Maximum Package"
          value={jobDrivePackageValueMax}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="jobDriveDescription"
        >
          Description
        </label>
        <textarea
          rows={5}
          className="mt-2 mb-2 w-full border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="jobDriveDescription"
          name="jobDriveDescription"
          placeholder="Enter Description"
          value={jobDriveDescription}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="jobPdfLink"
        >
          Pdf Link
        </label>
        <textarea
          rows={5}
          className="mt-2 mb-2 w-full border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="jobPdfLink"
          name="jobPdfLink"
          placeholder="Enter Pdf Link"
          value={jobPdfLink}
          onChange={handleProfileChange}
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
        {!isLoading && `${id?"Update":"Create"} Job`}
      </button>
    </form>
  );
};

export default CompanyJobForm;

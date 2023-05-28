import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Loader from "../Loader";
import { programsList, streamsList } from "../../utils/constants";

const CompanyProfileForm = () => {
  const {
    companyName,
    companyEmail,
    companyAddress,
    companyLogo,
    companyWebsite,
    companyDescription,
    companyPrograms,
    companyLinkedin,
    companyStreams,
    hrName,
    hrEmail,
    hrPhone,
    isLoading,
    handleChange,
    updateCompanyProfile,
    getCompanyByIdByCompany,
    user,
  } = useAppContext();
  const handleSettingsChange = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const onCreateAdmin = (e) => {
    e.preventDefault();
    updateCompanyProfile(user?._id);
  };
  const handleMultipleSelect=(e)=> {
    let options = e.target.options;
    let values = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    handleChange({ name: e.target.name, value: values });
  }
  useEffect(() => {
    getCompanyByIdByCompany(user?._id);
    //  eslint-disable-next-line
  }, []);
  return (
    <form
      className=" w-full m-auto flex flex-col justify-center overflow-x-auto  border rounded-lg md:p-4 p-2"
      onSubmit={onCreateAdmin}
    >
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="companyName"
        >
          Name
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="companyName"
          name="companyName"
          placeholder="Enter Company's Name"
          value={companyName}
          onChange={handleSettingsChange}
          required
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="companyEmail"
        >
          Email
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="email"
          id="companyEmail"
          name="companyEmail"
          placeholder="Enter Company's Email"
          value={companyEmail}
          onChange={handleSettingsChange}
          required
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="companyAddress"
        >
          Address
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="companyAddress"
          name="companyAddress"
          placeholder="Enter Company's Address"
          value={companyAddress}
          onChange={handleSettingsChange}
          required
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="companyLogo"
        >
          Logo
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="companyLogo"
          name="companyLogo"
          placeholder="Enter Company's Logo Link"
          value={companyLogo}
          onChange={handleSettingsChange}
          required
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="companyWebsite"
        >
          Website
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="companyWebsite"
          name="companyWebsite"
          placeholder="Enter Company's Website"
          value={companyWebsite}
          onChange={handleSettingsChange}
          required
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="companyDescription"
        >
          Description
        </label>
        <textarea
          rows={5}
          className="mt-2 mb-2 w-full  border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="companyDescription"
          name="companyDescription"
          placeholder="Enter Company's Description"
          value={companyDescription}
          onChange={handleSettingsChange}
          required
        />
      </div>

      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="companyLinkedin"
        >
          Company Linkedin
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="companyLinkedin"
          name="companyLinkedin"
          placeholder="Enter Company's Linkedin Link"
          value={companyLinkedin}
          onChange={handleSettingsChange}
          required
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="hrName"
        >
          Hr Name
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="hrName"
          name="hrName"
          placeholder="Enter Company's HR Name"
          value={hrName}
          onChange={handleSettingsChange}
          required
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="hrEmail"
        >
          Hr Email
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="hrEmail"
          name="hrEmail"
          placeholder="Enter Company's HR Email"
          value={hrEmail}
          onChange={handleSettingsChange}
          required
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="hrPhone"
        >
          Hr Phone
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="number"
          id="hrPhone"
          name="hrPhone"
          placeholder="Enter Company's HR Phone"
          value={hrPhone}
          onChange={handleSettingsChange}
          required
        />
      </div>

      <div className="w-full ">
        <label className="text-lg font-semibold" htmlFor="companyPrograms">
          Programs <span className="text-xs">(Select using ctrl)</span>
        </label>
        <select
          type="text"
          id="companyPrograms"
          name="companyPrograms"
          value={companyPrograms}
          onChange={handleMultipleSelect}
          required
          multiple
          className="w-full h-20 px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        >
          {programsList?.map((program, index) => (
            <option key={index} value={program.value}>
              {program.title}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full ">
        <label className="text-lg font-semibold" htmlFor="companyStreams">
          Streams <span className="text-xs">(Select using ctrl)</span>
        </label>
        <select
          type="text"
          id="companyStreams"
          name="companyStreams"
          value={companyStreams}
          onChange={handleMultipleSelect}
          required
          multiple
          className="w-full h-20 px-4 py-2  text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6"
        >
          {streamsList?.map((stream, index) => (
            <option key={index} value={stream.value}>
              {stream.title}
            </option>
          ))}
        </select>
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
        {!isLoading && "Update Profile"}
      </button>
    </form>
  );
};

export default CompanyProfileForm;

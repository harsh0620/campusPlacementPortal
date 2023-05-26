import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Loader from "../Loader";
import { programsList, streamsList } from "../../utils/constants";

const StudentProfilePersonal = () => {
  const {
    dob,
    gender,
    contactNo,
    aadharNo,
    program,
    stream,
    collegeName,
    universityName,
    fatherName,
    motherName,
    currentAddress,
    permanentAddress,
    pincode,
    homeCity,
    homeState,
    homeCountry,
    isLoading,
    handleChange,
    getStudentProfilePersonal,
    updateStudentProfilePersonal,
  } = useAppContext();
  const handleProfileChange = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const onUpdateProfile = (e) => {
    e.preventDefault();
    updateStudentProfilePersonal();
  };
  useEffect(() => {
    getStudentProfilePersonal();
  // eslint-disable-next-line
    }, []);
  return (
    <form
      className=" w-full m-auto flex flex-col justify-center overflow-x-auto  border rounded-lg md:p-4 p-2"
      onSubmit={onUpdateProfile}
    >
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="dob"
        >
          Date of Birth
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="date"
          id="dob"
          name="dob"
          placeholder="Enter Date of Birth"
          value={dob?.toString()?.substr(0, 10)}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="contactNo"
        >
          Phone
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="number"
          pattern="[0-9]{10}"
          id="contactNo"
          name="contactNo"
          placeholder="Enter Contact No"
          value={contactNo}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="aadharNo"
        >
          Aadhar No.
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="number"
          id="aadharNo"
          name="aadharNo"
          placeholder="Enter Aadhar No."
          value={aadharNo}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="gender"
        >
          Gender
        </label>
        <select
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="number"
          id="gender"
          name="gender"
          placeholder="Enter gender"
          value={gender && gender}
          onChange={handleProfileChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="program"
        >
          Programs
        </label>
        <select
          className="mt-2 mb-2 w-full  border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="program"
          name="program"
          placeholder="Enter program"
          value={program && program}
          onChange={handleProfileChange}
        >
          {programsList?.map((program, index) => (
            <option value={program?.value} key={index}>
              {program?.title}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="stream"
        >
          Streams
        </label>
        <select
          className="mt-2 mb-2 w-full  border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="stream"
          name="stream"
          placeholder="Enter stream"
          value={stream && stream}
          onChange={handleProfileChange}
        >
          {streamsList?.map((stream, index) => (
            <option value={stream?.value} key={index}>
              {stream?.title}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="collegeName"
        >
          College Name
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="collegeName"
          name="collegeName"
          placeholder="Enter College Name"
          value={collegeName}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="universityName"
        >
          University Name
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="universityName"
          name="universityName"
          placeholder="Enter University Name"
          value={universityName}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="fatherName"
        >
          Father Name
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="fatherName"
          name="fatherName"
          placeholder="Enter Father Name"
          value={fatherName}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="motherName"
        >
          Mother Name
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="motherName"
          name="motherName"
          placeholder="Enter Mother Name"
          value={motherName}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="currentAddress"
        >
          Current Address
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="currentAddress"
          name="currentAddress"
          placeholder="Enter Current Address"
          value={currentAddress}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="permanentAddress"
        >
          Permanent Address
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="permanentAddress"
          name="permanentAddress"
          placeholder="Enter Permanent Address"
          value={permanentAddress}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="pincode"
        >
          PinCode
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="number"
          id="pincode"
          name="pincode"
          placeholder="Enter PinCode"
          value={pincode}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="homeCity"
        >
          Home City
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="homeCity"
          name="homeCity"
          placeholder="Enter Home City"
          value={homeCity}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="homeState"
        >
          Home State
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="homeState"
          name="homeState"
          placeholder="Enter Home State"
          value={homeState}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="homeCountry"
        >
          Home Country
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="homeCountry"
          name="homeCountry"
          placeholder="Enter Home Country"
          value={homeCountry}
          onChange={handleProfileChange}
        />
      </div>
      <button
        className="flex mt-2 mb-2 w-full items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
        type="submit"
        disabled={isLoading}
      >
        {isLoading && (
          <Loader backgroundColor="text-gray-300" loaderColor="fill-black" text="Loading"/>
        )}
        {!isLoading && "Update Profile"}
      </button>
    </form>
  );
};

export default StudentProfilePersonal;

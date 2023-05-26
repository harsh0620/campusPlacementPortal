import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Loader from "../Loader";

const StudentProfileBasic = () => {
  const {
    name,
    enrollmentNo,
    about,
    isLoading,
    handleChange,
    getStudentProfileBasics,
    updateStudentProfileBasics,
  } = useAppContext();
  const handleProfileChange = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const onUpdateProfile = (e) => {
    e.preventDefault();
    updateStudentProfileBasics();
  };
  useEffect(() => {
    getStudentProfileBasics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name"
          value={name}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="enrollmentNo"
        >
          Enrollment No.
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="enrollmentNo"
          name="enrollmentNo"
          placeholder="Enter  Enrollment No."
          value={enrollmentNo}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="about"
        >
          About
        </label>
        <textarea
        rows="5"
          className="mt-2 mb-2 w-full  border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="about"
          name="about"
          placeholder="Enter About"
          value={about}
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

export default StudentProfileBasic;

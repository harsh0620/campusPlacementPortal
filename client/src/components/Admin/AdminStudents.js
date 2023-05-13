import React, { useContext, useEffect, useState } from "react";
import HeroBar from "../Dashboard/HeroBar";
import { genderList, streamsList } from "../../utils/constants";
import AdminStudentTable from "./AdminStudentTable";
import { useAppContext } from "../../context/appContext";
import Loader from "../Loader";

const initialState = {
  name: "",
  email: "",
  enrollmentNo: "",
  gender: "",
  stream: "",
  appliedFor: "",
  yearOfPassing: new Date().getFullYear(),
  verified: "",
  selectedIn: "",
  cgpa: 0.0,
  showAlert: true,
};

const AdminStudents = () => {
  const [values, setValues] = useState(initialState);
  const { studentsByAdmin, isLoading, searchStudentsByAdmin } = useAppContext();
  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "select"
        ? e.target.selectedOptions[0].value
        : e.target.value;
    setValues({ ...values, [name]: value });
  };
  useEffect(() => {
    searchStudentsByAdmin();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loader backgroundColor="text-gray-300" loaderColor="fill-black" />;
  }

  //   if (studentsByAdmin.length === 0) {
  //     return <h2>No jobs to display...</h2>;
  //   }
  return (
    <div>
      <HeroBar title={"Students Listed"} />
      <div className=" w-full m-auto flex flex-col justify-center overflow-x-auto  border-gray-300 hover:drop-shadow-md shadow  rounded-lg  bg-white md:p-4 p-2 mb-4">
        <div className="grid md:grid-cols-3 xl:grid-cols-4 xs:grid-cols gap-1">
          <div className="my-2 w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="mt-2 w-full h-10 border border-gray-400 rounded-md
        transition duration-150 ease-in-out focus:text-gray-700
        focus:bg-white focus:border-slate-600 p-2"
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div className="my-2 w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="mt-2 w-full h-10 border border-gray-400 rounded-md
        transition duration-150 ease-in-out focus:text-gray-700
        focus:bg-white focus:border-slate-600 p-2"
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email Address"
              required={true}
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="my-2 w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="enrollmentNo"
            >
              EnrollmentNo
            </label>
            <input
              className="mt-2 w-full h-10 border border-gray-400 rounded-md
        transition duration-150 ease-in-out focus:text-gray-700
        focus:bg-white focus:border-slate-600 p-2"
              type="text"
              id="enrollmentNo"
              name="enrollmentNo"
              placeholder="Enter Enrollment No."
              value={values.enrollmentNo}
              onChange={handleChange}
            />
          </div>
          <div className="my-2 w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="name"
            >
              Applied For
            </label>
            <input
              className="mt-2 w-full h-10 border border-gray-400 rounded-md
        transition duration-150 ease-in-out focus:text-gray-700
        focus:bg-white focus:border-slate-600 p-2"
              type="text"
              id="appliedFor"
              name="appliedFor"
              placeholder="Enter Company Name"
              value={values.appliedFor}
              onChange={handleChange}
            />
          </div>
          <div className="my-2 w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              className="mt-2 w-full h-10 border border-gray-400 rounded-md
        transition duration-150 ease-in-out focus:text-gray-700
        focus:bg-white focus:border-slate-600 p-2"
              id="gender"
              name="gender"
              value={values.gender}
              onChange={handleChange}
            >
              <option value="">Gender</option>
              {genderList.map((gender, index) => (
                <option value={gender.value} key={index}>
                  {gender.title}
                </option>
              ))}
            </select>
          </div>
          <div className="my-2 w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="stream"
            >
              Stream
            </label>
            <select
              className="mt-2 w-full h-10 border border-gray-400 rounded-md
      transition duration-150 ease-in-out focus:text-gray-700
      focus:bg-white focus:border-slate-600 p-2"
              id="stream"
              name="stream"
              value={values.stream}
              onChange={handleChange}
            >
              <option value="">Stream</option>
              {streamsList.map((stream, index) => (
                <option value={stream.value} key={index}>
                  {stream.title}
                </option>
              ))}
            </select>
          </div>
          <div className="my-2 w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="verified"
            >
              Verified
            </label>
            <select
              className="mt-2 w-full h-10 border border-gray-400 rounded-md
      transition duration-150 ease-in-out focus:text-gray-700
      focus:bg-white focus:border-slate-600 p-2"
              id="verified"
              name="verified"
              value={values.verified}
              type="Boolean"
              onChange={handleChange}
            >
              <option value="">Verified</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="my-2 w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="selectedIn"
            >
              Selected
            </label>
            <select
              className="mt-2 w-full h-10 border border-gray-400 rounded-md
      transition duration-150 ease-in-out focus:text-gray-700
      focus:bg-white focus:border-slate-600 p-2"
              id="selectedIn"
              name="selectedIn"
              type="Boolean"
              value={values.selectedIn}
              onChange={handleChange}
            >
              <option value="">Selected in Company</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="my-2 w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="yearOfPassing"
            >
              Year of Passing
            </label>
            <select
              id="yearOfPassing"
              name="yearOfPassing"
              value={values.yearOfPassing}
              onChange={handleChange}
              className="mt-2 w-full h-10 border border-gray-400 rounded-md
    transition duration-150 ease-in-out focus:text-gray-700
    focus:bg-white focus:border-slate-600 p-2"
            >
              <option value="">Year of Passing</option>
              {Array.from(
                { length: new Date().getFullYear() - 1962 },
                (_, i) => i + 1963
              ).map((year, index) => (
                <option value={year} key={index}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="my-2 w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="cgpa"
            >
              CGPA
            </label>
            <input
              className="mt-2 w-full h-10 border border-gray-400 rounded-md
        transition duration-150 ease-in-out focus:text-gray-700
        focus:bg-white focus:border-slate-600 p-2"
              type="number"
              id="cgpa"
              name="cgpa"
              placeholder="Enter Enrollment No."
              value={values.cgpa}
              onChange={handleChange}
            />
          </div>
          <div className="my-8  mx-2">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {/* <div className=" w-full m-auto flex flex-col justify-center overflow-x-auto  border-gray-300 hover:drop-shadow-md shadow  rounded-lg  bg-white md:p-2 p-1 mb-4"> */}
      <AdminStudentTable students={studentsByAdmin} />
      {/* </div> */}
    </div>
  );
};

export default AdminStudents;
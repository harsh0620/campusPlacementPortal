import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    enrollmentNo:"",
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password ,enrollmentNo} = formData;
  function onChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();
   
   console.log(formData);
  }

  return (
    <div
        className="flex justify-center flex-wrap items-center
      px-6 py-2 max-w-6xl m-auto"
      >
        <div className="lg:p-[36px]  p-4 lg:mt-8 mt-14   w-full  md:w-[100%] lg:w-[40%] md:mx-0 mx-auto border border-black rounded-lg shadow-xl">
          <div className="w-full h-full ">
            <div className="font-medium text-2xl justify-center flex">Register</div>
            <form
              className="flex flex-col items-center w-full mt-3"
              onSubmit={onSubmit}
            >
              <div className="flex flex-col items-center w-full mb-4">
                <label
                  className="text-left w-full text-black text-lg font-medium"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="mt-2 w-full h-10 border border-gray-300 rounded
                transition duration-150 ease-in-out focus:text-gray-700
                 focus:bg-white focus:border-slate-600 p-2"
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  required={true}
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-col items-center w-full mb-4">
                <label
                  className="text-left w-full text-black text-lg font-medium"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="mt-2 w-full h-10 border border-gray-300 rounded
                transition duration-150 ease-in-out focus:text-gray-700
                 focus:bg-white focus:border-slate-600 p-2"
                  type="email"
                  id="email"
                  placeholder="Enter Email Address"
                  required={true}
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-col items-center w-full mb-4">
                <label
                  className="text-left w-full text-black text-lg font-medium"
                  htmlFor="email"
                >
                  Enrollment No
                </label>
                <input
                  className="mt-2 w-full h-10 border border-gray-300 rounded
                transition duration-150 ease-in-out focus:text-gray-700
                 focus:bg-white focus:border-slate-600 p-2"
                  type="text"
                  id="enrollmentNo"
                  placeholder="Enter Enrollment Number"
                  required={true}
                  value={enrollmentNo}
                  onChange={onChange}
                />
              </div>
              <div className="relative flex flex-col items-center w-full">
                <label
                  className="text-left w-full text-black text-lg font-medium"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className=" mt-2 w-full h-10 border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700
                focus:bg-white focus:border-slate-600 p-2"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  required={true}
                  value={password}
                  onChange={onChange}
                />
                {showPassword ? (
                  <AiFillEyeInvisible
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-12 text-xl cursor-pointer"
                  />
                ) : (
                  <AiFillEye
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-12 text-xl cursor-pointer"
                  />
                )}
              </div>

              <button
                disabled={loading}
                className="mt-8 w-full bg-black text-white px-7 py-3 text-sm 
          font-medium uppercase rounded shadow-md
        hover:bg-gray-700 transition duration-150 
          ease-in-out hover:shadow-lg active:bg-gray-800"
                type="submit"
              >
                {loading && (
                  <Loader backgroundColor="text-gray-300" loaderColor="fill-black" />
                )}
                {!loading && "Sign Up"}
              </button>

              <div className="mt-4 flex flex-col md:flex-row items-center w-full">
                <div className="flex items-center font-light text-base text-gray-500">
                  Have an account
                  <span
                    className="text-black ml-2 font-medium cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </div>
                <div
                  className="cursor-pointer md:ml-auto flex items-center font-light text-base text-gray-500"
                  onClick={() => navigate("/forgotpassword")}
                >
                  Forgot Password?
                </div>
              </div>
            </form>
          </div>
        </div>
        </div>
  );
};

export default Register;

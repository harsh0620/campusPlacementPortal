import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import Logo from "../components/Logo";

const initialState = {
  email: "",
  userType: "admin",
  showAlert: true,
};
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, forgotPassword } =
    useAppContext();
  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "select"
        ? e.target.selectedOptions[0].value
        : e.target.value;
    setValues({ ...values, [name]: value });
  };

  async function onSubmit(e) {
    e.preventDefault();
    console.log(values);
    const { email, userType } = values;
    if (!email || !userType) {
      displayAlert("danger", "Please enter email");
      return;
    }
    forgotPassword({ email, userType });
    console.log(values);
  }
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);
  return (
    <div className="m-auto">
      <Logo />
      <div
        className="flex justify-center items-center
      px-6 py-2 max-w-6xl m-auto h-screen"
      >
        <div className="lg:p-[36px]  p-4 lg:mt-8 mt-14   w-full  md:w-[100%] lg:w-[50%] md:mx-0 mx-auto border border-black rounded-lg shadow-xl">
          <div className="w-full h-full ">
            <div className="font-medium text-2xl justify-center flex">
              Forgot Password
            </div>
            {showAlert && <Alert />}
            <form
              className="flex flex-col items-center w-full mt-3"
              onSubmit={onSubmit}
            >
              <div className="flex flex-col items-center w-full mb-4">
                <label
                  className="text-left w-full text-black text-lg font-medium"
                  htmlFor="userType"
                >
                  User Type
                </label>
                <select
                  className="mt-2 w-full h-10 border border-gray-300 rounded
      transition duration-150 ease-in-out focus:text-gray-700
      focus:bg-white focus:border-slate-600 p-2"
                  id="userType"
                  name="userType"
                  value={values.userType}
                  onChange={handleChange}
                >
                  <option value="admin">Admin</option>
                  <option value="company">Company</option>
                  <option value="student">Student</option>
                </select>
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
                  name="email"
                  placeholder="Enter Email Address"
                  required={true}
                  value={values.email}
                  onChange={handleChange}
                />
              </div>
              <button
                disabled={isLoading}
                className="mt-8 w-full bg-black text-white px-7 py-3 text-sm 
          font-medium uppercase rounded shadow-md
        hover:bg-gray-700 transition duration-150 
          ease-in-out hover:shadow-lg active:bg-gray-800"
                type="submit"
              >
                {isLoading && (
                  <Loader
                    backgroundColor="text-gray-300"
                    loaderColor="fill-black"
                  />
                )}
                {!isLoading && "Forgot Password"}
              </button>

              <div className="mt-4 flex flex-col md:flex-row items-center w-full overflow-x-auto">
                <div className="flex items-center font-light text-base text-gray-500">
                  Don't have an account
                  <span
                    className="text-black ml-2 font-medium cursor-pointer"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </span>
                </div>
                <div
                  className="cursor-pointer md:ml-auto flex items-center font-light text-base text-gray-500"
                  
                >
                  Already have an account
                 <span
                    className="text-black ml-2 font-medium cursor-pointer"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

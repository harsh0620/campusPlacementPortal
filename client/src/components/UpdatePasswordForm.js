import React from 'react'
import Loader from './Loader';
import { toast } from 'react-toastify';
import { useAppContext } from '../context/appContext';

const UpdatePasswordForm = () => {
    const {
      handleChange,
      password,
      newPassword,
      confirmPassword,
      isLoading,
      updatePassword,
    } = useAppContext();
    const handlePasswordChange = (e) => {
      handleChange({ name: e.target.name, value: e.target.value });
    };
    const onUpdatePassword = (e) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
        toast.error("Password and Confirm Password does not match");
        return;
      }
      updatePassword();
    };
    return (
      <form
        className=" w-full m-auto flex flex-col justify-center overflow-x-auto  border rounded-lg md:p-4 p-2"
        onSubmit={onUpdatePassword}
      >
        <div className="w-full">
          <label
            className="text-left text-black text-md font-medium"
            htmlFor="password"
          >
            Old Password
          </label>
          <input
            className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
            type="text"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="w-full">
          <label
            className="text-left text-black text-md font-medium"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
            type="text"
            id="newPassword"
            name="newPassword"
            placeholder="Enter newPassword"
            value={newPassword}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="w-full">
          <label
            className="text-left text-black text-md font-medium"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
            type="text"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handlePasswordChange}
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
          {!isLoading && "Change Password"}
        </button>
      </form>
    );
  };

export default UpdatePasswordForm
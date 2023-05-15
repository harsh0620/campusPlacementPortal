import React from "react";
import ActionCard from "../ActionCard";
import { FaBuilding, FaUserPlus } from "react-icons/fa";
import { useAppContext } from "../../context/appContext";
import Loader from "../Loader";

const CreateAdminForm = () => {
  const { name, email, password, isLoading, handleChange, createAdmin } =
    useAppContext();
  const handleProfileChange = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const onCreateAdmin = (e) => {
    e.preventDefault();
    createAdmin();
  };
  return (
    <form
      className=" w-full m-auto flex flex-col justify-center overflow-x-auto  border rounded-lg md:p-4 p-2"
      onSubmit={onCreateAdmin}
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
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
transition duration-150 ease-in-out focus:text-gray-700
focus:bg-white focus:border-slate-600 p-2"
          type="email"
          id="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
transition duration-150 ease-in-out focus:text-gray-700
focus:bg-white focus:border-slate-600 p-2"
          type="text"
          id="password"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={handleProfileChange}
        />
      </div>
      <button
        className="flex mt-2 mb-2 w-full items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
        type="submit"
        disabled={isLoading}
      >
        {isLoading && (
          <Loader backgroundColor="text-gray-300" loaderColor="fill-black" />
        )}
        {!isLoading && "Create Admin"}
      </button>
    </form>
  );
};
const AdminSettings = () => {
  return (
    <div className="bg-white w-full">
      <ActionCard
        title={"Create Admin"}
        bgColor={"bg-green-500"}
        icon={<FaUserPlus />}
        dropDownComponent={<CreateAdminForm />}
      />
      <ActionCard
        title={"Create Company"}
        bgColor={"bg-violet-500"}
        icon={<FaBuilding />}
        dropDownComponent={<CreateAdminForm />}
      />
    </div>
  );
};

export default AdminSettings;

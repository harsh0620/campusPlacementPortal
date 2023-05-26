import React, { useEffect } from "react";
import ActionCard from "../ActionCard";
import { FaEdit } from "react-icons/fa";
import { RiKeyFill } from "react-icons/ri";
import { useAppContext } from "../../context/appContext";
import Loader from "../Loader";
import { toast } from "react-toastify";
import UpdatePasswordForm from "../UpdatePasswordForm";

const UpdateProfileForm = () => {
  const {
    name,
    gender,
    designation,
    phone,
    aadharno,
    isLoading,
    handleChange,
    getAdminDetails,
    updateProfile,
  } = useAppContext();
  const handleProfileChange = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const onUpdateProfile = (e) => {
    e.preventDefault();
    console.log("Profile Updated");
    updateProfile("admin");
  };
  useEffect(() => {
    console.log("Profile Updated");
    getAdminDetails("admin");
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
          minLength={3}
          maxLength={100}
          placeholder="Enter Designation"
          value={designation}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="phone"
        >
          Phone
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
transition duration-150 ease-in-out focus:text-gray-700
focus:bg-white focus:border-slate-600 p-2"
          type="number"
          id="phone"
          name="phone"
          placeholder="Enter Phone"
          value={phone}
          onChange={handleProfileChange}
        />
      </div>
      <div className="w-full">
        <label
          className="text-left text-black text-md font-medium"
          htmlFor="aadharno"
        >
          Aadharno
        </label>
        <input
          className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
transition duration-150 ease-in-out focus:text-gray-700
focus:bg-white focus:border-slate-600 p-2"
          type="number"
          id="aadharno"
          name="aadharno"
          placeholder="Enter Aadharno"
          value={aadharno}
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
          value={gender}
          onChange={handleProfileChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
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
// const UpdatePasswordForm = () => {
//   const {
//     handleChange,
//     password,
//     newPassword,
//     confirmPassword,
//     isLoading,
//     updatePassword,
//   } = useAppContext();
//   const handlePasswordChange = (e) => {
//     handleChange({ name: e.target.name, value: e.target.value });
//   };
//   const onUpdatePassword = (e) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       toast.error("Password and Confirm Password does not match");
//       return;
//     }
//     updatePassword();
//   };
//   return (
//     <form
//       className=" w-full m-auto flex flex-col justify-center overflow-x-auto  border rounded-lg md:p-4 p-2"
//       onSubmit={onUpdatePassword}
//     >
//       <div className="w-full">
//         <label
//           className="text-left text-black text-md font-medium"
//           htmlFor="password"
//         >
//           Old Password
//         </label>
//         <input
//           className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
// transition duration-150 ease-in-out focus:text-gray-700
// focus:bg-white focus:border-slate-600 p-2"
//           type="text"
//           id="password"
//           name="password"
//           placeholder="Enter Password"
//           value={password}
//           onChange={handlePasswordChange}
//         />
//       </div>
//       <div className="w-full">
//         <label
//           className="text-left text-black text-md font-medium"
//           htmlFor="newPassword"
//         >
//           New Password
//         </label>
//         <input
//           className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
// transition duration-150 ease-in-out focus:text-gray-700
// focus:bg-white focus:border-slate-600 p-2"
//           type="text"
//           id="newPassword"
//           name="newPassword"
//           placeholder="Enter newPassword"
//           value={newPassword}
//           onChange={handlePasswordChange}
//         />
//       </div>
//       <div className="w-full">
//         <label
//           className="text-left text-black text-md font-medium"
//           htmlFor="confirmPassword"
//         >
//           Confirm Password
//         </label>
//         <input
//           className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
// transition duration-150 ease-in-out focus:text-gray-700
// focus:bg-white focus:border-slate-600 p-2"
//           type="text"
//           id="confirmPassword"
//           name="confirmPassword"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={handlePasswordChange}
//         />
//       </div>
//       <button
//         className="flex mt-2 mb-2 w-full items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
//         type="submit"
//         disabled={isLoading}
//       >
//         {isLoading && (
//           <Loader backgroundColor="text-gray-300" loaderColor="fill-black" text="Loading"/>
//         )}
//         {!isLoading && "Change Password"}
//       </button>
//     </form>
//   );
// };
const AdminProfile = () => {
  return (
    <div className="bg-white w-full">
      <ActionCard
        title={"Update Profile"}
        bgColor={"bg-gray-500"}
        icon={<FaEdit />}
        dropDownComponent={<UpdateProfileForm />}
      />
      <ActionCard
        title={"Update Password"}
        bgColor={"bg-red-500"}
        icon={<RiKeyFill />}
        dropDownComponent={<UpdatePasswordForm />}
      />
    </div>
  );
};

export default AdminProfile;

import React from "react";
import { FaArrowLeft, FaCog } from "react-icons/fa";
import AvatarMenu from "./Dashboard/AvatarMenu";
import { useNavigate } from "react-router-dom";
const GmailHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between border rounded-xl px-2 py-2 bg-white shadow hover:shadow-md">
      <button
          className="cursor-pointer bg-gray-0 hover:bg-gray-200 rounded-full p-2 mr-2"
          onClick={()=>navigate(-1)}
        >
          <FaArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
      <div className="flex items-center justify-between w-full  rounded-xl ml-2">
        <div className="flex items-center justify-between w-full text-xl md:text-2xl font-medium">
          {window.location.pathname === "/"
            ? "Home"
            : window.location.pathname === "/settings"
            ? "Settings"
            : window.location.pathname === "/profile"
            ? "Profile"
            : window.location.pathname === "/privacy-policy"
            ? "Privacy Policy"
            : window.location.pathname === "/terms-of-service"
            ? "Terms of Service"
            : window.location.pathname === "/students"
            ? "Students"
            : window.location.pathname.substring(10) === "/students/"
            ? "Student"
            : window.location.pathname === "/company" || window.location.pathname === "/companies"
            ? "Company"
            : window.location.pathname === "/company/:id"
            ? "Company"
            : window.location.pathname === "/jobs"
            ? "Jobs"
            : ""}
        </div>
      </div>
      <div className="flex items-center justify-between ">
        <button
          className="cursor-pointer bg-gray-0 hover:bg-gray-200 rounded-full p-2 mr-2"
          onClick={() => navigate("/settings")}
        >
          <FaCog className="w-6 h-6 text-gray-600" />
        </button>
        <AvatarMenu />
      </div>
    </div>
  );
};

export default GmailHeader;

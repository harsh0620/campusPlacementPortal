import React from "react";
import { FaCog } from "react-icons/fa";
import AvatarMenu from "./Dashboard/AvatarMenu";
import { useNavigate } from "react-router-dom";
const GmailHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between border rounded-xl px-2 py-2 bg-white shadow hover:shadow-md">
      <div className="flex items-center justify-between w-full  rounded-xl">
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
            ? "Search Students"
            : window.location.pathname === "/companies"
            ? "Search Company"
            : window.location.pathname === "/jobs"
            ? "Search Jobs"
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

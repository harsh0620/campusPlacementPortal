import React, { useState } from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";

const AvatarMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logoutUser, user } = useAppContext();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    logoutUser();
    navigate("/landing");
  };

  const handleProfile = () => {
    setIsMenuOpen(false);
    navigate(`/profile/${user?._id}`);
  };
  const handleViewPrivacyPolicy = () => {
    setIsMenuOpen(false);
    navigate("/privacy-policy");
  };
  const handleViewTerms = () => {
    setIsMenuOpen(false);
    navigate("/terms-of-service");
  };

  return (
    <div className="hover:bg-gray-200 rounded-full p-1">
      <div className="flex items-center cursor-pointer">
        <div className="flex-shrink-0">
          <FaUserCircle
            className="w-8 h-8 text-gray-600"
            onClick={toggleMenu}
          />
        </div>
      </div>
      {isMenuOpen && (
        <div className="absolute right-8 z-20 mt-2  w-auto  rounded-2xl shadow-xl hover:shadow-2xl  flex flex-col bg-gray-300">
          <div className="flex flex-col px-4 py-4 bg-white rounded-tr-2xl rounded-tl-2xl mx-2 mt-2">
            <div className="flex flex-row">
              <div className="flex items-center ">
                <FaUserCircle className="w-16 h-16 text-gray-600" />
              </div>
              <div className="flex flex-col ml-4 overflow-auto items-start m-auto justify-start">
                <div className="text-md">{user?.name}</div>
                <div className="text-[12px] text-gray-500">{user?.email}</div>
              </div>
            </div>

            <div
              className="cursor-pointer flex w-full border border-gray-700 p-2 text-sm rounded-lg mt-4 justify-center"
              onClick={handleProfile}
            >
              Manage your Profile
            </div>
          </div>
          <div className="flex px-4 py-2 bg-white rounded-br-2xl rounded-bl-2xl mt-1 cursor-pointer mb-4 mx-2">
            <div className="flex justify-center items-center text-md m-auto">
              <FaSignOutAlt />
              <div className="ml-2" onClick={handleLogout}>
                Logout
              </div>
            </div>
          </div>
          <div className="border border-black"></div>
          <div className="flex px-4 py-2 mt-1 mx-2">
            <div className="flex justify-evenly items-center text-sm w-full">
              <span
                className="text-black cursor-pointer"
                onClick={handleViewPrivacyPolicy}
              >
                Privacy Policy
              </span>
              <span
                className="text-black cursor-pointer"
                onClick={handleViewTerms}
              >
                Terms of Service
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;

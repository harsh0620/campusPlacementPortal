import React from "react";
import { MdDashboard, MdOutlineDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { adminSidebarItems } from "../../utils/constants";
import { FaUserCircle } from "react-icons/fa";
import { useAppContext } from "../../context/appContext";

const SmallSidebar = () => {
  const navigate = useNavigate();
  const {user}=useAppContext();
  return (
    <footer
      className="md:hidden bg-white flex justify-between fixed 
    bottom-0 top-auto border-t  border-gray-200 shadow px-2 sm:px-4 py-2 w-full"
      style={{ zIndex: 100 }}
    >
      {/* RENDERING THE HOME OPTION */}
      <div
        onClick={() => {
          navigate("/");
        }}
        className={`flex flex-col items-center justify-center ${
          (window.location.pathname === "/" ||
            window.location.pathname === "/") &&
          "text-black"
        } cursor-pointer text-gray-600}`}
        title="Home"
      >
        <div className="sm:text-3xl text-2xl">
          {window.location.pathname === "/" ||
          window.location.pathname === "/" ? (
            <MdDashboard />
          ) : (
            <MdOutlineDashboard />
          )}
        </div>
        <div className="text-xs hidden xs:block font-semibold">Home</div>
      </div>
      {/* ALL OTHER OPTIONS */}
      {adminSidebarItems.map((item, index) => {
        const { iconAbled, iconDisabled, title, link } = item;
        return (
          <div
            onClick={() => {
              navigate(link);
            }}
            key={index}
            className={`flex flex-col items-center justify-center ${
              window.location.pathname.indexOf(link) !== -1 && "text-black"
            } cursor-pointer text-gray-600`}
            title={title}
          >
            <div className="sm:text-3xl text-2xl">
              {window.location.pathname.indexOf(link) !== -1
                ? iconAbled
                : iconDisabled}
            </div>
            <div className="text-xs hidden xs:block font-semibold">{title}</div>
          </div>
        );
      })}
      <div
            onClick={() => {
              navigate(`/profile/${user?._id}`);
            }}
            className={`flex flex-col items-center justify-center ${
              window.location.pathname.substring(0,9)===`/profile/`  && "text-black"
            } cursor-pointer text-gray-600`}
            title="Profile"
          >
            <div className="sm:text-3xl text-2xl" >
              {window.location.pathname.substring(0,9)===`/profile/` 
                ? <FaUserCircle/>
                : <FaUserCircle color="#bbb" />}
            </div>
            <div className="text-xs hidden xs:block font-semibold">{"Profile"}</div>
          </div>
    </footer>
  );
};

export default SmallSidebar;

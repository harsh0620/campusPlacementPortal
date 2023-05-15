import React from "react";
import { MdDashboard, MdOutlineDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { adminSidebarItems } from "../../utils/constants";

const SmallSidebar = () => {
  const navigate = useNavigate();
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
    </footer>
  );
};

export default SmallSidebar;

import React from "react";
import { MdDashboard, MdOutlineDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { adminSidebarItems, companySidebarItems, studentSidebarItems } from "../../utils/constants";
import { useAppContext } from "../../context/appContext";
import { FaUserCircle } from "react-icons/fa";
const BigSidebar = () => {
  const navigate = useNavigate();
  const {user}=useAppContext();
  return (
    <div className="md:block hidden h-full w-full pr-2 border-r">
      {/* RENDERING THE APP LOGO */}
      <header className="pt-4">
        <div className="flex items-center object-cover pl-4">
          <img
            src={"/assets/images/logo.png"}
            alt="logo"
            className="w-32 h-8 flex justify-center "
            onClick={() => navigate("/")}
          ></img>
        </div>
      </header>
      {/* RENDERING ALL THE OPTIONS */}
      <main className="mt-5">
        {/* HOME OPTION */}
        <div
          onClick={() => {
            navigate("/");
          }}
          className={`flex items-center py-2 px-4 ${
            (window.location.pathname === "/" ||
              window.location.pathname === "/") &&
            "bg-blue-200 rounded-r-[32px] text-[#001D35] hover:bg-blue-200 font-bold"
          }
              md:text-base
              text-md
              font-medium
              text-gray-600
              hover:bg-gray-200 hover:rounded-r-[32px] cursor-pointer`}
        >
          <div className="mr-3 ">
            {window.location.pathname === "/" ||
            window.location.pathname === "/" ? (
              <MdDashboard />
            ) : (
              <MdOutlineDashboard />
            )}
          </div>
          <div>Home</div>
        </div>
        {/* ALL OTHER OPTIONS */}
        {user?.role==="admin" && adminSidebarItems.map((item, index) => {
          const { iconAbled, iconDisabled, title, link } = item;
          return (
            <div
              onClick={() => {
                navigate(link);
              }}
              key={index}
              className={`flex items-center py-2 px-4 ${
                window.location.pathname.indexOf(link) !== -1 &&
                "bg-blue-200 rounded-r-[32px] text-[#001D35] hover:bg-blue-200 font-bold"
              }
                  md:text-base
                  text-md
                  font-medium
                  text-gray-600
                  hover:bg-gray-200 hover:rounded-r-[32px] cursor-pointer`}
            >
              <div className="mr-3 ">
                {window.location.pathname.indexOf(link) !== -1
                  ? iconAbled
                  : iconDisabled}
              </div>
              <div>{title}</div>
            </div>
          );
        })}
        {user?.role==="student" && studentSidebarItems.map((item, index) => {
          const { iconAbled, iconDisabled, title, link } = item;
          return (
            <div
              onClick={() => {
                navigate(link);
              }}
              key={index}
              className={`flex items-center py-2 px-4 ${
                window.location.pathname.indexOf(link) !== -1 &&
                "bg-blue-200 rounded-r-[32px] text-[#001D35] hover:bg-blue-200 font-bold"
              }
                  md:text-base
                  text-md
                  font-medium
                  text-gray-600
                  hover:bg-gray-200 hover:rounded-r-[32px] cursor-pointer`}
            >
              <div className="mr-3 ">
                {window.location.pathname.indexOf(link) !== -1
                  ? iconAbled
                  : iconDisabled}
              </div>
              <div>{title}</div>
            </div>
          );
        })}
        {user?.role==="company" && companySidebarItems.map((item, index) => {
          const { iconAbled, iconDisabled, title, link } = item;
          return (
            <div
              onClick={() => {
                navigate(link);
              }}
              key={index}
              className={`flex items-center py-2 px-4 ${
                window.location.pathname.indexOf(link) !== -1 &&
                "bg-blue-200 rounded-r-[32px] text-[#001D35] hover:bg-blue-200 font-bold"
              }
                  md:text-base
                  text-md
                  font-medium
                  text-gray-600
                  hover:bg-gray-200 hover:rounded-r-[32px] cursor-pointer`}
            >
              <div className="mr-3 ">
                {window.location.pathname.indexOf(link) !== -1
                  ? iconAbled
                  : iconDisabled}
              </div>
              <div>{title}</div>
            </div>
          );
        })}
        <div
              onClick={() => {
                navigate(`/profile/${user?._id}`);
              }}
              className={`flex items-center py-2 px-4 ${
                window.location.pathname.substring(0,9)===`/profile/` &&
                "bg-blue-200 rounded-r-[32px] text-[#001D35] hover:bg-blue-200 font-bold"
              }
                  md:text-base
                  text-md
                  font-medium
                  text-gray-600
                  hover:bg-gray-200 hover:rounded-r-[32px] cursor-pointer`}
            >
              <div className="mr-3 ">
                {window.location.pathname.substring(0,9)===`/profile/`
                  ? <FaUserCircle/>
                  : <FaUserCircle color="#bbb" />}
              </div>
              <div>Profile</div>
            </div>
      </main>
    </div>
  );
};

export default BigSidebar;

import React from "react";
import { Outlet } from "react-router-dom";
// import { Navbar, SmallSidebar, BigSidebar } from "../../components";

const SharedLayout = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen">
      {/* <SmallSidebar className="sm:col-start-1 sm:col-end-2" />
      <BigSidebar className="hidden sm:block col-start-2 col-end-3" /> */}
      <div className="flex flex-col h-full">
        {/* <Navbar /> */}
        <div className="flex-grow p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SharedLayout;

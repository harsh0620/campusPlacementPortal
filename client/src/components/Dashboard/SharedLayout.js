import React from "react";
import { Outlet } from "react-router-dom";
import BigSidebar from "./BigSidebar";
import SmallSidebar from "./SmallSidebar";
// import { Navbar, SmallSidebar, BigSidebar } from "../../components";

const SharedLayout = () => {
  return (
    <main className="flex md:flex-row flex-col-reverse ">
      <div className="w-[25%] md:h-screen">
        <BigSidebar />
        <SmallSidebar />
      </div>
      <div className="md:h-screen pt-5 w-full scroll-smooth overflow-y-auto outlet  mx-auto pb-20 md:px-16 px-4">
        <Outlet />
      </div>
    </main>
  );
};

export default SharedLayout;

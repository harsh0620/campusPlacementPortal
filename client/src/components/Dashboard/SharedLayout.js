import React from "react";
import { Outlet } from "react-router-dom";
import BigSidebar from "./BigSidebar";
import SmallSidebar from "./SmallSidebar";
import GmailHeader from "../GmailHeader";
// import { Navbar, SmallSidebar, BigSidebar } from "../../components";

const SharedLayout = () => {
  return (
    <main className="flex md:flex-row flex-col-reverse ">
      <div className="w-[25%] md:h-screen">
        <BigSidebar />
        <SmallSidebar />
      </div>
      <div className="md:h-screen max-h-screen w-full mx-auto overflow-y-auto scroll-smooth">
        <div className="sticky top-0 z-10 md:px-4 px-2 py-4">
          <GmailHeader />
        </div>
        <div className="md:px-4 px-2 py-4 outlet h-screen md:h-auto">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default SharedLayout;

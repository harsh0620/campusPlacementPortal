import React from "react";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <header className="pt-8 absolute pl-8">
      <div className="flex items-center">
        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="w-48 h-12 m-auto"
          onClick={() => navigate("/")}
        ></img>
      </div>
    </header>
  );
};

export default Logo;

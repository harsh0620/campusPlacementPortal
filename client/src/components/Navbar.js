import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          Campus Placement Portal
        </div>
        <ul className="flex">
          <li className="ml-4">
            <a href="/" className="text-white hover:text-gray-300">
              Home
            </a>
          </li>
          <li className="ml-4">
            <a href="/" className="text-white hover:text-gray-300">
              Features
            </a>
          </li>
          <li className="ml-4">
            <a href="/" className="text-white hover:text-gray-300">
              About
            </a>
          </li>
          <li className="ml-4">
            <a href="/" className="text-white hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

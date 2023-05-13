import React from "react";

const HeroBar = ({ title }) => {
  return (
    <div
      className=" w-full m-auto flex flex-col justify-center overflow-x-auto text-[50px] text-center
    border-gray-300 hover:drop-shadow-md shadow  rounded-lg  bg-white md:p-4 p-2 mb-4"
    >
      {title}
    </div>
  );
};

export default HeroBar;

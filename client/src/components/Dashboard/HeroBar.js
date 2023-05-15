import React from "react";

const HeroBar = ({ title, textColor }) => {
  return (
    <div
      className={`
        w-full
        m-auto
        flex flex-col
        justify-center
        overflow-x-auto
        text-xl
        sm:text-4xl
        text-center
        p-2
        shadow
        sticky
        rounded-lg
        ${title ? `bg-white border ${textColor}` : ``}
      `}
    >
      {title}
    </div>
  );
};

export default HeroBar;

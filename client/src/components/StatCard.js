import React from 'react'

const StatCard = ({ title, value, icon, textColor, valueText }) => {
    return (
      <div className="p-4 flex flex-col overflow-x-auto outlet items-center mt-2 mb-4 mx-2 rounded-lg  w-full justify-center bg-white hover:shadow-md shadow ">
        <div className={`md:text-6xl text-4xl ${textColor} mx-1`}>{icon}</div>
        <div className="flex-row flex lex justify-center items-center text-black">
          <div className="md:text-2xl text-lg mr-1 text-center">{title}:</div>{" "}
          <div className={`md:text-2xl text-lg text-center ${textColor}`}>
            {value} {valueText}
          </div>
        </div>
      </div>
    );
  };

export default StatCard
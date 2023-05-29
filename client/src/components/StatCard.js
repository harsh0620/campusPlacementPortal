import React from 'react'

const StatCard = ({ title, value, icon, textColor, valueText,borderColor }) => {
    return (
      <div className={`p-4 flex flex-row overflow-x-auto outlet items-center my-4 md:mx-2 rounded-lg  w-full bg-white border justify-start ${borderColor}`}>
        <div className={`md:text-4xl text-2xl ${textColor} ${borderColor} mx-1 border p-2 rounded-lg mr-2`}>{icon}</div>
        <div className={`md:flex-row flex-col flex lex justify-start items-start text-black border p-2 rounded-lg ml-2 ${borderColor}`}>
          <div className="md:text-xl text-lg mr-1 text-center">{title}:</div>{" "}
          <div className={`md:text-xl text-lg text-center ${textColor}`}>
            {value} {valueText}
          </div>
        </div>
      </div>
    );
  };

export default StatCard
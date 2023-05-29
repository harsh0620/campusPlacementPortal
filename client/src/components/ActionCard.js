import { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const ActionCard = ({ title, icon, dropDownComponent, bgColor }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white border rounded-xl p-4 mt-2 mb-2">
      <div className="flex items-center justify-between cursor-pointer"  onClick={handleToggleDropdown}>
        <div className="flex items-center">
          <div className={`${bgColor} text-white rounded-full p-2 mr-4`}>
            {icon}
          </div>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <button
          className={`flex items-center justify-center ${bgColor} text-white rounded-full p-2`}
          
        >
          {isDropdownOpen ?<BsChevronUp /> : <BsChevronDown />}
          
        </button>
      </div>
      {isDropdownOpen && <div className="mt-2">{dropDownComponent}</div>}
    </div>
  );
};

export default ActionCard;

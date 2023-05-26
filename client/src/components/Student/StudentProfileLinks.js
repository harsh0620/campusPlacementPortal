import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import Loader from "../Loader";

const StudentProfileLinks = () => {
  const {
    isLoading,
    handleUpdateStateValues,
    professionalLinks,
    getStudentProfileProfessional,
    updateStudentProfileProfessional,
  } = useAppContext();
  const handleLinks = (event, index) => {
    const newLinks = [...professionalLinks];
    const {  value } = event.target;
    newLinks[index] = value;
    handleUpdateStateValues({
      name: "professionalLinks",
      value: newLinks,
    });
  };
  const handleAddLinks = () => {
    handleUpdateStateValues({
      name: "professionalLinks",
      value: [
        ...professionalLinks,
        ""
      ],
    });
  };

  const handleRemoveLink = (index) => {
    const newLinks = [...professionalLinks];
    newLinks.splice(index, 1);
    handleUpdateStateValues({
      name: "professionalLinks",
      value: newLinks,
    });
  };
  const onUpdateProfile = (e) => {
    e.preventDefault();
    updateStudentProfileProfessional();
  };
  useEffect(() => {
    getStudentProfileProfessional();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // eslint-disable-next-line
    }, []);
  return (
    <form
      className=" w-full m-auto flex flex-col justify-center overflow-x-auto  border rounded-lg md:p-4 p-2"
      onSubmit={onUpdateProfile}
    >
      <div className="grid sm:grid-cols-4 grid-cols-1 gap-2">
      {professionalLinks?.map((link, index) => (
        <div
          key={index}
          className="flex flex-col w-full border rounded-md p-4 mt-1"
        >
          <div className="w-full flex flex-row justify-between">
            <div className="text-lg font-bold">
              Link {index + 1}
            </div>
            <div>
              <button
                onClick={() => handleRemoveLink(index)}
                className="bg-red-500 rounded-full text-white p-1"
              >
                <FaMinus />
              </button>
            </div>
          </div>
          <div className="w-full">
            <input
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="text"
              id="link"
              name="link"
              placeholder="Enter link"
              value={link}
              onChange={(event) => handleLinks(event, index)}
            />
          </div>
        </div>
      ))}
      </div>
      <div className="flex flex-row w-full justify-between p-1 my-2">
        <button
          className="flex w-full mr-2 items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          type="submit"
          disabled={isLoading}
        >
          {isLoading && (
            <Loader backgroundColor="text-gray-300" loaderColor="fill-black" text="Loading"/>
          )}
          {!isLoading && "Update Links"}
        </button>
        <button
          type="button"
          onClick={handleAddLinks}
          className="flex flex-col w-8 h-8 mt-1 items-center justify-center  bg-green-500 hover:bg-green-600 text-white font-medium p-2 rounded-full"
        >
          <FaPlus />
        </button>
      </div>
    </form>
  );
};

export default StudentProfileLinks;

import React, { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import Loader from "../Loader";
import { FaMinus, FaPlus } from "react-icons/fa";

const StudentProfileAcademic = () => {
  const {
    isLoading,
    handleUpdateStateValues,
    academicDetails,
    getStudentProfileAcademic,
    updateStudentProfileAcademic,
  } = useAppContext();
  const generateYearOfPassing = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 1950;
    const years = [];

    for (let year = currentYear; year >= startYear; year--) {
      years.push(year);
    }

    return years;
  };
  const onUpdateProfile = (e) => {
    e.preventDefault();
    updateStudentProfileAcademic();
  };
  const handleAcademicDetails = (event, index) => {
    const newAcademicDetails = [...academicDetails];
    const { name, value } = event.target;

    if (name === "resultOption") {
      newAcademicDetails[index].result = {
        option: value,
        value:newAcademicDetails[index]?.result?.value
      };
    } 
    else if (name === "resultValue") {
      newAcademicDetails[index].result = {
        value: value,
        option: newAcademicDetails[index]?.result?.option,
      };
    }
    else {
      newAcademicDetails[index][name] = value;
    }

    handleUpdateStateValues({
      name: "academicDetails",
      value: newAcademicDetails,
    });
  };

  const handleAddAcademic = () => {
    handleUpdateStateValues({
      name: "academicDetails",
      value: [
        ...academicDetails,
        {
          degree: "",
          specialization: "",
          institute: "",
          yearOfPassing: new Date().getFullYear(),
          board: "",
          result: {
            option: "CGPA",
            value: null,
          },
          numberOfSemesters: null,
          backlogSubjects: null,
          semesters: [
            {
              value: null,
            },
          ],
        },
      ],
    });
  };

  const handleRemoveAcademic = (index) => {
    const newAcademicDetails = [...academicDetails];
    newAcademicDetails.splice(index, 1);
    handleUpdateStateValues({
      name: "academicDetails",
      value: newAcademicDetails,
    });
  };

  // const handleAddSemester = (academicIndex) => {
  //   const newAcademicDetails = [...academicDetails];
  //   newAcademicDetails[academicIndex].semesters.push({
  //     value: null,
  //   });

  //   handleUpdateStateValues({
  //     name: "academicDetails",
  //     value: newAcademicDetails,
  //   });
  // };

  // const handleRemoveSemester = (academicIndex, semesterIndex) => {
  //   const newAcademicDetails = [...academicDetails];
  //   const semesters = newAcademicDetails[academicIndex].semesters;

  //   semesters.splice(semesterIndex, 1);

  //   handleUpdateStateValues({
  //     name: "academicDetails",
  //     value: newAcademicDetails,
  //   });
  // };

  useEffect(() => {
    getStudentProfileAcademic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // eslint-disable-next-line
    }, []);
  return (
    <form
      className=" w-full m-auto flex flex-col justify-center overflow-x-auto  border rounded-lg md:p-4 p-2"
      onSubmit={onUpdateProfile}
    >
      {academicDetails?.map((academic, index) => (
        <div
          key={index}
          className="flex flex-col w-full border rounded-md p-4 mt-1"
        >
          <div className="w-full flex flex-row justify-between">
            <div className="text-lg font-bold">Academic Detail {index + 1}</div>
            <div>
              <button
                onClick={() => handleRemoveAcademic(index)}
                className="bg-red-500 rounded-full text-white p-1"
              >
                <FaMinus />
              </button>
            </div>
          </div>
          <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="degree"
            >
              Degree
            </label>
            <input
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="text"
              id="degree"
              name="degree"
              placeholder="Enter Degree"
              value={academic?.degree}
              onChange={(event) => handleAcademicDetails(event, index)}
            />
          </div>
          <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="specialization"
            >
              Specialization
            </label>
            <input
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="text"
              id="specialization"
              name="specialization"
              placeholder="Enter Specialization"
              value={academic?.specialization}
              onChange={(event) => handleAcademicDetails(event, index)}
            />
          </div>
          <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="institute"
            >
              Institute
            </label>
            <input
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="text"
              id="institute"
              name="institute"
              placeholder="Enter Institute"
              value={academic?.institute}
              onChange={(event) => handleAcademicDetails(event, index)}
            />
          </div>
          <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="yearOfPassing"
            >
              Year Of Passing
            </label>
            <select
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="number"
              id="yearOfPassing"
              name="yearOfPassing"
              placeholder="Enter Year Of Passing"
              value={academic?.yearOfPassing}
              onChange={(event) => handleAcademicDetails(event, index)}
            >
              {generateYearOfPassing()?.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="board"
            >
              Board
            </label>
            <input
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="text"
              id="board"
              name="board"
              placeholder="Enter Board"
              value={academic?.board}
              onChange={(event) => handleAcademicDetails(event, index)}
            />
          </div>
          <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="resultOption"
            >
              Marking Criteria
            </label>
            <select
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="text"
              id="resultOption"
              name="resultOption"
              placeholder="Enter Marking Criteria"
              value={academic?.result?.option}
              onChange={(event) => handleAcademicDetails(event, index)}
            >
              <option value="CGPA">CGPA</option>
              <option value="Percentage">Percentage</option>
            </select>
          </div>
          <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="resultValue"
            >
              Result
            </label>
            <input
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="number"
              id="resultValue"
              name="resultValue"
              placeholder="Enter Result Value"
              value={academic?.result?.value}
              onChange={(event) => handleAcademicDetails(event, index)}
            />
          </div>
          <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="numberOfSemesters"
            >
              Number of Semesters
            </label>
            <input
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="number"
              id="numberOfSemesters"
              name="numberOfSemesters"
              placeholder="Enter Number of Semesters"
              value={academic?.numberOfSemesters}
              onChange={(event) => handleAcademicDetails(event, index)}
            />
          </div>
          {/* <div className="w-full">
            <label
              className="text-left text-black text-md font-medium"
              htmlFor="backlogSubjects"
            >
              Backlog Subject Count
            </label>
            <input
              className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
              type="number"
              id="backlogSubjects"
              name="backlogSubjects"
              placeholder="Enter Backlog Subject"
              value={academic?.backlogSubjects}
              onChange={(event) => handleAcademicDetails(event, index)}
            />
          </div> */}
          {/* <div className=" w-full m-auto flex flex-col justify-center overflow-x-auto  border rounded-lg md:p-4 p-2">
            <button
              type="button"
              onClick={handleAddSemester}
              className="flex flex-col w-8 h-8 mt-1 items-center justify-center  bg-green-500 hover:bg-green-600 text-white font-medium p-2 rounded-full"
            >
              <FaPlus />
            </button>
            {academic?.semesters?.map((semester, index) => (
              <div className="w-full">
                <div>
                  <div className="flex flex-row justify-between">
                    <label
                      className="text-left text-black text-md font-medium"
                      htmlFor="backlogSubjects"
                    >
                      Semester {index + 1}
                    </label>
                    <button onClick={() => handleRemoveSemester(index)}>
                      <FaMinus />
                    </button>
                  </div>
                  <input
                    className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
  transition duration-150 ease-in-out focus:text-gray-700
  focus:bg-white focus:border-slate-600 p-2"
                    type="number"
                    id="value"
                    name="value"
                    placeholder="Enter value"
                    value={semester?.result?.value}
                    onChange={(event) => handleAcademicDetails(event, index)}
                  />
                </div>
              </div>
            ))}
          </div> */}
        </div>
      ))}

      <div className="flex flex-row w-full justify-between p-1 my-2">
        <button
          className="flex w-full mr-2 items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          type="submit"
          disabled={isLoading}
        >
          {isLoading && (
            <Loader backgroundColor="text-gray-300" loaderColor="fill-black" text="Loading"/>
          )}
          {!isLoading && "Update Profile"}
        </button>
        <button
          type="button"
          onClick={handleAddAcademic}
          className="flex flex-col w-8 h-8 mt-1 items-center justify-center  bg-green-500 hover:bg-green-600 text-white font-medium p-2 rounded-full"
        >
          <FaPlus />
        </button>
      </div>
    </form>
  );
};

export default StudentProfileAcademic;

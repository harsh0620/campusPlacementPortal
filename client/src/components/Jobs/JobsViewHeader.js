import React, { useState } from "react";
import { useAppContext } from "../../context/appContext";
import { FaCheckCircle, FaPaperPlane, FaTimes, FaTrash } from "react-icons/fa";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const JobsViewHeader = () => {
  const [sendJob, setSendJob] = useState(false);
  const [emails, setEmails] = useState("");
  const {
    specificJob,
    getRandomColor,
    sendJobNotification,
    convertToLPA,
    user,
    verifyJob,
    applyJobByStudent,
    getJobsByIdByAdmin,
    specificJobApplied,
    deleteJobDrive,
    isLoading,
  } = useAppContext();
  const navigate=useNavigate()
  const handleVerify = () => {
    if (
      window.confirm(
        `Are you sure you want to ${
          specificJob?.verified === true ? "unverify" : "verify"
        } this job?`
      )
    ) {
      verifyJob(specificJob?._id);
    }
    getJobsByIdByAdmin(specificJob?._id);
    setTimeout(() => {
      window.location.reload(false);
    }, 4500);
  };
  const handleDelete=()=>{
    
    if (
      window.confirm(
        `Are you sure you want to ${
          specificJobApplied === true ? "discard " : "apply for "
        }this job?`
      )
    ) {
      deleteJobDrive(specificJob?._id);
    }
   navigate("/jobs")
  }
  const handleApply = () => {
    if (
      window.confirm(
        `Are you sure you want to ${
          specificJobApplied === true ? "discard " : "apply for "
        }this job?`
      )
    ) {
      applyJobByStudent({ jobId: specificJob?._id });
    }
    setTimeout(() => {
      window.location.reload(false);
    }, 4500);
  };
  const handleChange = (e) => {
    setEmails(e.target.value);
  };
  const onSendJobNotification = (e) => {
    e.preventDefault();
    sendJobNotification({ emails, jobId: specificJob?._id });
    console.log(emails);
  };
  return (
    <div className="shadow bg-white w-full rounded-xl flex flex-col">
      {/* //Details Section */}
      <div className="flex flex-col relative w-full">
        <div
          className={`rounded-t-xl mb-20 ${getRandomColor()}`}
          style={{ minHeight: "100px" }}
        ></div>
        {user?.role==="company" && (
          <>
          <div className="flex flex-row absolute top-0 right-0 mt-4 mr-4">
          <button
                className="border bg-white px-2 py-1 rounded-lg mr-2 text-sm font-medium text-red-500"
                onClick={handleDelete}
              >
               <FaTrash/>
              </button>
            </div>
            </>
        )}
        {user?.role === "student" && (
          <>
            <div className="flex flex-row absolute top-0 right-0 mt-4 mr-4">
              <button
                className="border bg-white px-2 py-1 rounded-lg mr-2 text-sm font-medium"
                onClick={handleApply}
              >
                {specificJobApplied === true ? (
                  <div title="Discard the Job">Discard the Job</div>
                ) : (
                  <div title="Apply to Job">Apply to job</div>
                )}
              </button>
            </div>
            <div className="flex flex-row absolute top-10 right-0 mt-4 mr-4 justify-between">
              <div className="mr-2">
                {specificJob?.lastDate > new Date().toISOString() ? (
                  <span className="px-2  text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 text-center justify-center m-auto">
                    Open
                  </span>
                ) : (
                  <span className="px-2  text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 text-center justify-center m-auto">
                    Closed
                  </span>
                )}
              </div>
              <div className="mr-2">
                {specificJob?.driveDate > new Date().toISOString() ? (
                  <span className="px-2  text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 text-center justify-center m-auto">
                    Upcoming
                  </span>
                ) : (
                  <span className="px-2  text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 text-center justify-center m-auto">
                    Completed
                  </span>
                )}
              </div>
              <div>
                {specificJobApplied === true ? (
                  <span className="px-2  text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 text-center justify-center m-auto">
                    Applied
                  </span>
                ) : (
                  <span className="px-2  text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 text-center justify-center m-auto">
                    Not Applied
                  </span>
                )}
              </div>
            </div>
          </>
        )}
        {user?.role === "admin" && (
          <>
            <div className="flex flex-row absolute top-0 right-0 mt-4 mr-4">
              <button
                className="border bg-white px-2 py-1 rounded-lg mr-2 text-sm font-medium"
                onClick={handleVerify}
              >
                {specificJob?.verified === true ? (
                  <FaTimes title="Unverify Job" />
                ) : (
                  <FaCheckCircle title="Verify Job" />
                )}
              </button>
              <button
                className="border bg-white px-2 py-1 rounded-lg text-sm font-medium"
                onClick={() => setSendJob(!sendJob)}
              >
                <FaPaperPlane title="Send this job to students" />
              </button>
            </div>
            <div className="flex flex-row absolute top-10 right-0 mt-4 mr-4 justify-between">
              <div className="mr-2">
                {specificJob?.lastDate > new Date().toISOString() ? (
                  <span className="px-2  text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 text-center justify-center m-auto">
                    Open
                  </span>
                ) : (
                  <span className="px-2  text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 text-center justify-center m-auto">
                    Closed
                  </span>
                )}
              </div>
              <div className="mr-2">
                {specificJob?.driveDate > new Date().toISOString() ? (
                  <span className="px-2  text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 text-center justify-center m-auto">
                    Upcoming
                  </span>
                ) : (
                  <span className="px-2  text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 text-center justify-center m-auto">
                    Completed
                  </span>
                )}
              </div>
            </div>
            {sendJob && (
              <div className="z-50 bg-white rounded-lg p-4 flex flex-row absolute top-0 right-0 mt-14 mr-4 shadow hover:shadow-md">
                <form
                  className=" w-full m-auto flex flex-col justify-center overflow-x-auto"
                  onSubmit={onSendJobNotification}
                >
                  <div className="w-full">
                    <label
                      className="text-left text-black text-md font-medium"
                      htmlFor="emails"
                    >
                      Enter Emails
                    </label>
                    <input
                      className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
                      transition duration-150 ease-in-out focus:text-gray-700
                      focus:bg-white focus:border-slate-600 p-2"
                      type="text"
                      id="emails"
                      name="emails"
                      placeholder="Enter Emails"
                      value={emails}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    className="flex mt-2 mb-2 w-full items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <Loader
                        backgroundColor="text-gray-300"
                        loaderColor="fill-black"
                        text="Loading"
                      />
                    )}
                    {!isLoading && "Send Notification"}
                  </button>
                </form>
              </div>
            )}
          </>
        )}
        <div className="flex flex-col absolute md:mt-6 mt-8 ml-4">
          <div className="md:w-32 md:h-32 w-24 h-24 rounded-full m-4 bg-gray-300 p-1 border ">
            <div className="mx-auto md:w-12 md:h-12 w-8 h-8 md:mt-8 mt-8 ml-8 md:text-6xl text-2xl flex items-center ">
              {specificJob?.company?.name
                ? specificJob?.company?.name.charAt(0)
                : ""}
            </div>
            <div className="rounded-full w-4 h-4 md:ml-[95px] ml-[65px] mt-[-10px]">
              {specificJob?.verified === true ? (
                <FaCheckCircle
                  className=" rounded-full md:text-3xl text-3xl font-bold bg-blue-500 text-white"
                  title="Verified"
                />
              ) : (
                <FaTimes
                  className=" rounded-full md:text-3xl text-xl font-bold bg-red-500 text-white"
                  title="Unverified"
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start p-4">
          <div className="flex flex-col">
            <div className="text-2xl font-bold">
              {specificJob?.designations?.map((designation, index) => {
                return (
                  <span key={index}>
                    {designation}
                    {specificJob?.designations.length !== index + 1
                      ? ","
                      : ""}{" "}
                  </span>
                );
              })}
            </div>
            <div className="text-lg font-medium">
              {specificJob?.company?.name}
            </div>
          </div>
          <div className="flex flex-col">
            <a
              className="text-lg font-medium text-blue-500"
              href={specificJob?.pdfLink}
              target="__blank"
            >
              Pdf Link
            </a>
            <div className="text-lg font-medium">
              {convertToLPA(specificJob?.packageValue?.min)} LPA -
              {convertToLPA(specificJob?.packageValue?.max)} LPA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsViewHeader;

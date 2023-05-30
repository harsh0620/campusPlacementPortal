import { useAppContext } from "../../context/appContext";
import {
  FaCheckCircle,
  FaFileDownload,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { ExportJsonCsv } from "react-export-json-csv";
import { useState } from "react";
const StudentViewHeader = ({ handleCapture }) => {
  const {
    specificStudent,
    getCSVDataByStudent,
    getRandomColor,
    user,
    verifyStudent,
  } = useAppContext();
  const handleVerify = () => {
    if (
      window.confirm(
        `Are you sure you want to ${
          specificStudent?.applicationStatus === true ? "unverify" : "verify"
        } this student?`
      )
    ) {
      verifyStudent(specificStudent?._id);
    }
    setTimeout(() => {
      window.location.reload(false);
    }, 4500);
  };
  let arrayTemp = [];
  arrayTemp.push(specificStudent);
  const [headers] = useState([
    {
      key: "enrollmentNo",
      name: "Enrollment No",
    },
    {
      key: "name",
      name: "Name",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "about",
      name: "About",
    },
    {
      key: "personalDetails",
      name: "Personal Details",
    },
  ]);
  return (
    <div className="shadow bg-white w-full rounded-xl flex flex-col">
      {/* //Details Section */}
      <div className="flex flex-col relative w-full">
        <div
          className={`rounded-t-xl mb-20 ${getRandomColor()}`}
          style={{ minHeight: "100px" }}
        ></div>
        <div className="flex flex-row absolute top-0 right-0 mt-4 mr-4">
          {user?.role === "admin" && (
            <button
              className="border bg-white  px-4 md:py-2 py-1 rounded-lg mr-2 text-sm font-medium"
              onClick={handleVerify}
            >
              {specificStudent?.applicationStatus === "verified" ? (
                <FaTimes title="Unverify Student" />
              ) : (
                <FaCheckCircle title="Verify Student" />
              )}
            </button>
          )}
          <button
            title="Download PDF"
            className="flex flex-col justify-center items-center mx-auto border bg-white px-2 py-1 rounded-lg mr-2 text-sm font-medium"
            onClick={handleCapture}
          >
            <FaFileDownload />
            <span className="font-bold text-xs">PDF</span>
          </button>
          <button
            title="Download CSV"
            className="flex flex-col justify-center items-center mx-auto border bg-white px-2 py-1 rounded-lg text-sm font-medium"
            onClick={() => getCSVDataByStudent(specificStudent?._id)}
          >
            <FaFileDownload />
            {/* <ExportJsonCsv headers={headers} items={arrayTemp}> */}
            <span className="font-bold text-xs">CSV</span>
            {/* </ExportJsonCsv> */}
          </button>
        </div>
        <div
          className="flex flex-row absolute top-0 right-0 mt-16 mr-4"
          title={
            user?.role === "admin"
              ? specificStudent?.placementDetails?.selected === true
                ? `Placed In- ${specificStudent?.placementDetails?.selectedIn?.company?.name} as ${specificStudent?.placementDetails?.selectedIn?.jobProfile} with Package of ${specificStudent?.placementDetails?.selectedIn?.package}`
                : "Not Placed"
              : ""
          }
        >
          {specificStudent?.placementDetails?.selected === true ? (
            <span className="px-2  text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 text-center justify-center m-auto">
              Placed
            </span>
          ) : (
            <span className="px-2  text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 text-center justify-center m-auto">
              Not Placed
            </span>
          )}
        </div>
        <div className="flex flex-col absolute md:mt-6 mt-12 ml-4">
          {specificStudent?.personalDetails?.profileImage ||
          specificStudent?.personalDetails?.profileImage.length > 0 ? (
            <>
              <img
                src={specificStudent?.personalDetails?.profileImage}
                alt={specificStudent?.personalDetails?.profileImage}
                className="md:w-32 md:h-32 w-20 h-20 rounded-full m-4 bg-white p-1"
              />
              <div className="rounded-full w-4 h-4 md:ml-[105px] ml-[75px] mt-[-55px]">
                {specificStudent?.applicationStatus === "verified" ? (
                  <FaCheckCircle
                    className=" rounded-full md:text-3xl text-3xl font-bold bg-blue-500 text-white"
                    title="Verified Student"
                  />
                ) : (
                  <FaTimes
                    className=" rounded-full md:text-3xl text-xl font-bold bg-red-500 text-white"
                    title="Unverified Student"
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <FaUserCircle className="md:w-32 md:h-32 w-20 h-20 rounded-full m-4 bg-white p-1" />
              <div className="rounded-full w-4 h-4 md:ml-[105px] ml-[75px] mt-[-55px]">
                {specificStudent?.applicationStatus === "verified" ? (
                  <FaCheckCircle
                    className=" rounded-full md:text-3xl text-3xl font-bold bg-blue-500 text-white"
                    title="Verified Student"
                  />
                ) : (
                  <FaTimes
                    className=" rounded-full md:text-3xl text-xl font-bold bg-red-500 text-white"
                    title="Unverified Student"
                  />
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start p-4">
          <div className="flex flex-col">
            <div className="text-2xl font-bold">{specificStudent?.name}</div>
            <div className="text-lg font-medium">
              {specificStudent?.enrollmentNo}
            </div>
              <div className="text-lg ">
                {specificStudent?.placementDetails?.selected === true ? (
                  <div>
                    Placed In-{" "}
                    <span className="font-medium text-blue-500">
                      {
                        specificStudent?.placementDetails?.selectedIn?.company
                          ?.name
                      }
                    </span>{" "}
                    as{" "}
                    <span className="font-medium text-blue-500">
                      {
                        specificStudent?.placementDetails?.selectedIn
                          ?.jobProfile
                      }
                    </span>{" "}
                    with Package of{" "}
                    <span className="font-medium text-blue-500">
                      {specificStudent?.placementDetails?.selectedIn?.package}
                    </span>
                  </div>
                ) : (
                  "Not Placed"
                )}
              </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <div className="text-lg font-medium">
                {specificStudent?.personalDetails?.stream}
              </div>
              <div className="text-lg font-medium">
                {specificStudent?.personalDetails?.program}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentViewHeader;

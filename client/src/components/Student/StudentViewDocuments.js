import React from "react";
import StudentViewComp from "./StudentViewComp";
import { useAppContext } from "../../context/appContext";

const StudentViewDocumentsComp = () => {
  const { specificStudent } = useAppContext();
  const { documents } = specificStudent;
  return (
    <div className="flex flex-col">
        <div className="border flex flex-col rounded-lg p-2 my-2">
        <div className="flex flex-col items-start text-lg font-bold my-2 p-2">
          <a href={documents?.photo} target="_blank" rel="noreferrer">
            Photo
          </a>
        </div>
        <div className="flex flex-col p-2 justify-center items-center">
          {documents?.photo?.length !== 0 ||
          documents?.photo !== undefined ? (
            <img
              alt="student"
              width={200}
                height={200}
              src={documents?.photo?.length !== 0 ? documents?.photo : ""}
            />
          ) : (
            <div className="text-lg font-bold my-2 p-2">No Resume Uploaded</div>
          )}
        </div>
      </div>
      <div className="border flex flex-col rounded-lg p-2 my-2">
        <div className="flex flex-col items-start text-lg font-bold my-2 p-2">
          <a href={documents?.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
        <div className="flex flex-col items-start p-2">
          {documents?.resume?.length !== 0 ||
          documents?.resume !== undefined ? (
            <embed
              width="100%"
              height="500px"
              src={documents?.resume?.length !== 0 ? documents?.resume : ""}
              type="application/pdf"
            />
          ) : (
            <div className="text-lg font-bold my-2 p-2">No Resume Uploaded</div>
          )}
        </div>
      </div>
      <div className="border flex flex-col rounded-lg p-2 my-2">
        <div className="flex flex-col items-start text-lg font-bold my-2 p-2">
          <a href={documents?.aadhar} target="_blank" rel="noreferrer">
            Aadhar
          </a>
        </div>
        <div className="flex flex-col items-start p-2">
          {documents?.aadhar?.length !== 0 ||
          documents?.aadhar !== undefined ? (
            <embed
              width="100%"
              height="500px"
              src={documents?.aadhar?.length !== 0 ? documents?.aadhar : ""}
              type="application/pdf"
            />
          ) : (
            <div className="text-lg font-bold my-2 p-2">No aadhar Uploaded</div>
          )}
        </div>
      </div>
      <div className="border flex flex-col rounded-lg p-2 my-2">
        <div className="flex flex-col items-start text-lg font-bold my-2 p-2">
          <a href={documents?.allDocument} target="_blank" rel="noreferrer">
            All Documents
          </a>
        </div>
        <div className="flex flex-col items-start p-2">
          {documents?.allDocument?.length !== 0 ||
          documents?.allDocument !== undefined ? (
            <embed
              width="100%"
              height="500px"
              src={documents?.allDocument?.length !== 0 ? documents?.allDocument : ""}
              type="application/pdf"
            />
          ) : (
            <div className="text-lg font-bold my-2 p-2">No allDocument Uploaded</div>
          )}
        </div>
      </div>
      
    </div>
  );
};

const StudentViewDocuments = () => {
  return (
    <div>
      <StudentViewComp
        title="Documents"
        viewComponent={<StudentViewDocumentsComp />}
      />
    </div>
  );
};

export default StudentViewDocuments;

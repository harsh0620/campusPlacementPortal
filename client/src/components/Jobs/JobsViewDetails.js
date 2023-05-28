import React from "react";
import JobsViewComp from "./JobsViewComp";
import { useAppContext } from "../../context/appContext";

const JobsViewDetailsComp = () => {
  const { specificJob, convertToLPA } = useAppContext();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-between">
        {!specificJob && <p>No personal data</p>}
        {specificJob && (
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            <div>
              <p className="text-gray-700 font-medium">Company:</p>
              <p>{specificJob?.company?.name}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Designations:</p>
              <p>
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
              </p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Locations:</p>
              <p>
                {specificJob?.locations?.map((location, index) => {
                  return (
                    <span key={index}>
                      {location}
                      {specificJob?.locations.length !== index + 1
                        ? ","
                        : ""}{" "}
                    </span>
                  );
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Streams:</p>
              <p>
                {specificJob?.streams?.map((stream, index) => {
                  return (
                    <span key={index}>
                      {stream}
                      {specificJob?.streams.length !== index + 1
                        ? ","
                        : ""}{" "}
                    </span>
                  );
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Program:</p>
              <p>{specificJob?.programs?.map((program, index) => {
                  return (
                    <span key={index}>
                      {program}
                      {specificJob?.programs.length !== index + 1
                        ? ","
                        : ""}{" "}
                    </span>
                  );
                })}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Drive Date:</p>
              <p>{new Date(specificJob?.driveDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Start Date to apply:</p>
              <p>{new Date(specificJob?.startDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">End Date to apply:</p>
              <p>{new Date(specificJob?.lastDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Package Value:</p>
              <p>
                {convertToLPA(specificJob?.packageValue?.min)} LPA -
                {convertToLPA(specificJob?.packageValue?.max)} LPA
              </p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Eligibility Criteria:</p>
              <p>
                CGPA{">"}={specificJob?.eligibilityCriteria?.cgpa},Backlog{"<"}=
                {specificJob?.eligibilityCriteria?.backlog}
              </p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Description:</p>
              <p>{specificJob?.description}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Pdf Link:</p>
              <a href={specificJob?.pdfLink} target="_blank" rel="noreferrer" className="text-blue-500">{specificJob?.pdfLink}</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
const JobsViewDetails = () => {
  return (
    <div>
      <JobsViewComp
        title="Jobs Details"
        viewComponent={<JobsViewDetailsComp />}
      />
    </div>
  );
};

export default JobsViewDetails;

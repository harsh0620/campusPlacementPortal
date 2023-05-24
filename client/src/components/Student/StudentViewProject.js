import React from "react";
import StudentViewComp from "./StudentViewComp";
import { useAppContext } from "../../context/appContext";

const StudentViewProjectComp = () => {
  const { specificStudent } = useAppContext();
  const { projects } = specificStudent?.professionalDetails;
  return (
    <div className="flex flex-col">
      {projects?.map((project, index) => (
        <div className={`flex flex-col items-start ${index+1!==projects?.length && "border-b"} p-2`} key={index}>
          <h1 className="text-xl font-bold">{project?.projectName}</h1>
          <div className="text-sm text-gray-500">
            {project?.projectDescription}
          </div>
          <div className="flex flex-row">
            <a
              className="text-sm  cursor-pointer text-green-500"
              target="__blank"
              href={project?.liveLink}
            >
             &bull; Live Link
            </a>
            <a
              className="text-sm  cursor-pointer text-blue-500 ml-2"
              target="__blank"
              href={project?.sourceCodeLink}
            >
             &bull;  Source Code Link
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

const StudentViewProject = () => {
  return (
    <div>
      <StudentViewComp
        title="Projects"
        viewComponent={<StudentViewProjectComp />}
      />
    </div>
  );
};

export default StudentViewProject;

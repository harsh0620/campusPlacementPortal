import React from "react";
import StudentViewComp from "./StudentViewComp";
import { useAppContext } from "../../context/appContext";

const StudentViewAboutComp = () => {
    const {specificStudent}=useAppContext();
    const {about}=specificStudent;
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-start p-2">
        {about}
      </div>
    </div>
  );
};

const StudentViewAbout = () => {
  return (
    <div>
      <StudentViewComp
        title="About"
        viewComponent={<StudentViewAboutComp />}
      />
    </div>
  );
};

export default StudentViewAbout;

import React from "react";
import StudentViewComp from "./StudentViewComp";
import { useAppContext } from "../../context/appContext";

const StudentViewOtherComp = () => {
    const {specificStudent}=useAppContext();
    const {others}=specificStudent?.professionalDetails;
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-start p-2">
        {others}
      </div>
    </div>
  );
};

const StudentViewOther = () => {
  return (
    <div>
      <StudentViewComp
        title="Other Information"
        viewComponent={<StudentViewOtherComp />}
      />
    </div>
  );
};

export default StudentViewOther;

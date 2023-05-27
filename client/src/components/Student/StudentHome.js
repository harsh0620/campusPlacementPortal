import React, { useEffect, useRef } from "react";
import { FaCheckCircle ,FaTimesCircle} from "react-icons/fa";
import { AiFillProfile} from "react-icons/ai";
import { BsFillCalendar2MonthFill} from "react-icons/bs";
import { MdCheckCircle, MdCancel ,MdAccountCircle} from "react-icons/md";
import { useAppContext } from "../../context/appContext";
import Loader from "../Loader";
import ActionCard from "../ActionCard";
import StudentJobDriveTable from "./StudentJobDriveTable";
import Calendar  from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';
const StatCard = ({ title, value, icon, textColor,valueText }) => {
  return (
    <div className="p-4 flex flex-col overflow-x-auto outlet items-center mt-2 mb-4 mx-2 rounded-lg  w-full justify-center bg-white hover:shadow-md shadow ">
      <div className={`md:text-6xl text-4xl ${textColor} mx-1`}>{icon}</div>
      <div className="flex-row flex lex justify-center items-center text-black">
        <div className="md:text-2xl text-lg mr-1 text-center">{title}:</div>
        {" "}
        <div className={`md:text-2xl text-lg text-center ${textColor}`}>{value} {valueText}</div>
      </div>
    </div>
  );
};
const CalendarComponent = () => {
  // Sample event data in JSON format
  const {jobsCalendarStudent} = useAppContext();
  return (
    <div className="border rounded-lg p-2 mt-4 mx-1">
      <Calendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={jobsCalendarStudent}
      />
    </div>
  );
};
const StudentHome = () => {
  const { getStatsByStudent, statsForStudent,filledPercentageStudent,jobsCalendarStudent, isLoading } = useAppContext();
  useEffect(() => {
    document.title = "Student Home | Placement Portal";
    getStatsByStudent();
    // eslint-disable-next-line
  }, []);
  if (isLoading)
    return (
      <Loader
        backgroundColor="text-gray-300"
        loaderColor="fill-black"
        text="Loading"
      />
    );
  return (
    <div className="pb-16">
      <div className="flex sm:flex-row flex-col mx-2">
        <StatCard
          title="Applied In"
          value={statsForStudent?.totalAppliedCount}
          icon={<MdCheckCircle />}
          textColor={"text-green-500"}
          valueText={statsForStudent?.totalAppliedCount>1?`Jobs`:"Job"}
        />
        <StatCard
          title="Rejected In"
          value={statsForStudent?.totalRejectedCount}
          icon={<MdCancel />}
          textColor={"text-red-500"}
          valueText={statsForStudent?.totalRejectedCount>1?`Jobs`:"Job"}
        />
      </div>
      <div className="flex sm:flex-row flex-col mx-2">
        <StatCard
          title="Profile Filled"
          value={filledPercentageStudent}
          icon={<AiFillProfile />}
          textColor={"text-orange-500"}
          valueText={"%"}
        />
        <StatCard
          title="Application Status"
          value={statsForStudent?.applicationStatus?.toUpperCase()}
          icon={<MdAccountCircle />}
          textColor={"text-blue-500"}
          valueText={""}
        />
      </div>
      <ActionCard
        title={"Applied In Jobs"}
        bgColor={"bg-purple-500"}
        icon={<FaCheckCircle />}
        dropDownComponent={<StudentJobDriveTable jobDrives={statsForStudent?.totalApplied} />}
      />
      <ActionCard
        title={"Rejected In Jobs"}
        bgColor={"bg-indigo-500"}
        icon={<FaTimesCircle />}
        dropDownComponent={<StudentJobDriveTable jobDrives={statsForStudent?.totalRejected} />}
      />
      <ActionCard
        title={"Jobs Calendar"}
        bgColor={"bg-pink-500"}
        icon={<BsFillCalendar2MonthFill />}
        dropDownComponent={<CalendarComponent />}
      />
      
    </div>
  );
};

export default StudentHome;

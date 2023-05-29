import React, { useEffect, useState } from "react";
// import {Tooltip} from "react-tooltip";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { AiFillProfile } from "react-icons/ai";
import { BsFillCalendar2MonthFill } from "react-icons/bs";
import { MdCheckCircle, MdCancel, MdAccountCircle } from "react-icons/md";
import { useAppContext } from "../../context/appContext";
import Loader from "../Loader";
import ActionCard from "../ActionCard";
import StudentJobDriveTable from "./StudentJobDriveTable";
import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import StatCard from "../StatCard";


const CalendarComponent = () => {
  // Sample event data in JSON format
  const { jobsCalendarStudent } = useAppContext();
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('sdfsdfsd');

  const handleMouseEnter = (info) => {
    console.log(info);
    // if (info.event.extendedProps.description) {
    //   console.log(info.event.extendedProps.description);
    //   setTooltipContent(info.event.extendedProps.description);
    //   setShowTooltip(true);
    // }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  return (
    <div className="border rounded-lg p-2 mt-4 mx-1">
      <Calendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        eventMouseEnter={()=>handleMouseEnter()}
        eventMouseLeave={()=>handleMouseLeave()}
        events={jobsCalendarStudent}
      />
     {/* {showTooltip && (
        <Tooltip effect="solid" place="top">
          {tooltipContent}
        </Tooltip>
      )} */}
    </div>
  );
};
const StudentHome = () => {
  const {
    getStatsByStudent,
    statsForStudent,
    filledPercentageStudent,
    isLoading,
  } = useAppContext();
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
          valueText={statsForStudent?.totalAppliedCount > 1 ? `Jobs` : "Job"}
        />
        <StatCard
          title="Rejected In"
          value={statsForStudent?.totalRejectedCount}
          icon={<MdCancel />}
          textColor={"text-red-500"}
          valueText={statsForStudent?.totalRejectedCount > 1 ? `Jobs` : "Job"}
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
        dropDownComponent={
          <StudentJobDriveTable jobDrives={statsForStudent?.totalApplied} />
        }
      />
      <ActionCard
        title={"Rejected In Jobs"}
        bgColor={"bg-indigo-500"}
        icon={<FaTimesCircle />}
        dropDownComponent={
          <StudentJobDriveTable jobDrives={statsForStudent?.totalRejected} />
        }
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

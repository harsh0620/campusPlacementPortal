// import {
//   MdGroups,
//   MdOutlineGroups,
//   MdGroup,
//   MdOutlineGroup,
//   MdOutlineMovie,
//   MdSportsSoccer,
//   MdOutlineLocalGroceryStore,
//   MdOutlineDining,
//   MdOutlineLiquor,
//   MdOutlineHome,
//   MdOutlinePets,
//   MdOutlineTrain,
//   MdLocalFireDepartment,
//   MdOutlineCleaningServices,
// } from "react-icons/md";
// import { IoMdPaper } from "react-icons/io";
// import {
//   IoSettingsOutline,
//   IoSettings,
//   IoMusicalNotesOutline,
//   IoHammerOutline,
//   IoGiftSharp,
//   IoCarSportOutline,
//   IoAirplaneOutline,
//   IoBulbOutline,
//   IoWater,
// } from "react-icons/io5";
// import { TiDivideOutline, TiDivide } from "react-icons/ti";
// import { GrGamepad } from "react-icons/gr";
// import { TbHanger, TbSofa } from "react-icons/tb";
// import {
//   FaBriefcase,
//   FaConciergeBell,
//   FaFootballBall,
//   FaHome,
//   FaHotel,
//   FaListAlt,
//   FaPlane,
//   FaPumpSoap,
// } from "react-icons/fa";

import {
  BsBriefcaseFill,
  BsBriefcase,
  BsPeopleFill,
  BsPeople,
  BsBuildingsFill,
  BsBuildings,
} from "react-icons/bs";

const sidebarItems = [
  {
    title: "Companies",
    iconAbled: <BsBuildingsFill />,
    iconDisabled: <BsBuildings />,
    link: "/companies",
  },
  {
    title: "Students",
    iconAbled: <BsPeopleFill />,
    iconDisabled: <BsPeople />,
    link: "/students",
  },
  {
    title: "Jobs",
    iconAbled: <BsBriefcaseFill />,
    iconDisabled: <BsBriefcase />,
    link: "/jobs",
  },
];
// enum: [
//     "Computer Science",
//     "Electronics",
//     "Mechanical",
//     "Civil",
//     "Electrical",
//     "Agriculture",
//     "Mining",
//     "Chemical",
//     "Biotechnology",
//     "Food Technology",
//     "Textile",
//   ],
const genderList = [
  {
    title: "Male",
    value: "male",
  },
  {
    title: "Female",
    value: "female",
  },
  {
    title: "Other",
    value: "other",
  },
];
const streamsList = [
  {
    title: "Computer Science",
    value: "Computer Science",
  },
  {
    title: "Electronics",
    value: "Electronics",
  },
  {
    title: "Mechanical",
    value: "Mechanical",
  },
  {
    title: "Civil",
    value: "Civil",
  },
  {
    title: "Electrical",
    value: "Electrical",
  },
  {
    title: "Agriculture",
    value: "Agriculture",
  },
  {
    title: "Mining",
    value: "Mining",
  },
  {
    title: "Chemical",
    value: "Chemical",
  },
  {
    title: "Biotechnology",
    value: "Biotechnology",
  },
  {
    title: "Food Technology",
    value: "Food Technology",
  },
  {
    title: "Textile",
    value: "Textile",
  },
];
export { sidebarItems, genderList, streamsList };

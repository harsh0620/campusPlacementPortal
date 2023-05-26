import {
  BsBriefcaseFill,
  BsBriefcase,
  BsPeopleFill,
  BsPeople,
  BsBuildingsFill,
  BsBuildings,
} from "react-icons/bs";
import { FaCog } from "react-icons/fa";

const adminSidebarItems = [
  {
    title: "Companies",
    iconAbled: <BsBuildingsFill />,
    iconDisabled: <BsBuildings />,
    link: "/company",
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
  {
    title: "Settings",
    iconAbled: <FaCog />,
    iconDisabled: <FaCog color="#bbb" />,
    link: "/settings",
  },
  // {
  //   title: "Profile",
  //   iconAbled: <FaUserCircle />,
  //   iconDisabled: <FaUserCircle color="#bbb" />,
  //   link: "/profile",
  // },
];
const studentSidebarItems = [
  {
    title: "Companies",
    iconAbled: <BsBuildingsFill />,
    iconDisabled: <BsBuildings />,
    link: "/companies",
  },
  {
    title: "Jobs",
    iconAbled: <BsBriefcaseFill />,
    iconDisabled: <BsBriefcase />,
    link: "/jobs",
  },
  {
    title: "Settings",
    iconAbled: <FaCog />,
    iconDisabled: <FaCog color="#bbb" />,
    link: "/settings",
  },
  // {
  //   title: "Profile",
  //   iconAbled: <FaUserCircle />,
  //   iconDisabled: <FaUserCircle color="#bbb" />,
  //   link: "/profile",
  // },
];
const companySidebarItems = [
  {
    title: "Jobs",
    iconAbled: <BsBriefcaseFill />,
    iconDisabled: <BsBriefcase />,
    link: "/jobs",
  },
  {
    title: "Settings",
    iconAbled: <FaCog />,
    iconDisabled: <FaCog color="#bbb" />,
    link: "/settings",
  },
  // {
  //   title: "Profile",
  //   iconAbled: <FaUserCircle />,
  //   iconDisabled: <FaUserCircle color="#bbb" />,
  //   link: "/profile",
  // },
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
// "B.Tech", "M.Tech", "MBA", "MCA", "BBA", "BCA", "B.Sc", "M.Sc"
const programsList = [
  {
    title: "B.Tech",
    value: "B.Tech",
  },
  {
    title: "M.Tech",
    value: "M.Tech",
  },
  {
    title: "MBA",
    value: "MBA",
  },
  {
    title: "MCA",
    value: "MCA",
  },
  {
    title: "BBA",
    value: "BBA",
  },
  {
    title: "BCA",
    value: "BCA",
  },
  {
    title: "B.Sc",
    value: "B.Sc",
  },
  {
    title: "M.Sc",
    value: "M.Sc",
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
export { adminSidebarItems, companySidebarItems,studentSidebarItems,genderList, streamsList,programsList };

import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BsBriefcase, BsBriefcaseFill, BsBuildingFillCheck, BsBuildingFillX, BsGraphUp } from "react-icons/bs";
import {
  FaBuilding,
  FaChartBar,
  FaSearch,
  FaUser,
  FaUserCheck,
  FaUserTimes,
} from "react-icons/fa";
import { GiPieChart } from "react-icons/gi";
import ActionCard from "../ActionCard";
import { useAppContext } from "../../context/appContext";
import Loader from "../Loader";
import StatCard from "../StatCard";

const data = [
  { branch: "Computer Science", placed: 80, unplaced: 20 },
  { branch: "Electronics and Communication", placed: 70, unplaced: 30 },
  { branch: "Mechanical Engineering", placed: 60, unplaced: 40 },
  { branch: "Civil Engineering", placed: 50, unplaced: 50 },
  { branch: "Chemical Engineering", placed: 45, unplaced: 55 },
];

const COLORS = [
  "#1a73e8",
  "#fbbc05",
  "#e04235",
  "#34a853",
  "#FF8C00",
  "#00C49F",
  "#5FE5CB",
  "#DACCA0",
  "#282A9B",
  "#E9B8A4",
  "#EE033C",
  "#2DF27A",
  "#5B60D6",
  "#603940",
  "#B56293",
  "#36DB0B",
  "#716036",
  "#2C3541",
  "#998E7C",
  "#32E667",
  "#CD238C",
  "#F56EDB",
  "#B22D02",
  "#303BB7",
  "#44383B",
  "#354DC6",
  "#E72209",
  "#CA0325",
  "#7A1532",
  "#0C732A",
  "#22F756",
  "#10928D",
  "#09C742",
  "#A4C992",
  "#36065D",
];

const PlacedChart = () => {
  const { statsForAdmin } = useAppContext();
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={statsForAdmin?.branchWiseData}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="branch" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="placed" stroke="#8884d8" />
        <Line type="monotone" dataKey="unplaced" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

const BranchPieChart = () => {
  const { statsForAdmin } = useAppContext();
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={statsForAdmin?.branchWiseData}
          dataKey="placed"
          nameKey="branch"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

const BranchBarChart = () => {
  const { statsForAdmin } = useAppContext();
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={statsForAdmin?.branchWiseData}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="branch" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="placed" fill="#10B981" />
        <Bar dataKey="unplaced" fill="#EF4444" />
      </BarChart>
    </ResponsiveContainer>
  );
};
const AdminStatsSearchForm = () => {
  const { getStatsByAdmin, adminStatsYear, isLoading, handleChange } =
    useAppContext();
  const handleProfileChange = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const onGetStatsByYear = (e) => {
    e.preventDefault();
    getStatsByAdmin();
  };
  const generateYearOfStats = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 1950;
    const years = [];

    for (let year = currentYear; year >= startYear; year--) {
      years.push(year);
    }

    return years;
  };
  return (
    <div>
      <form
        className=" w-full m-auto flex flex-col justify-center overflow-x-auto  border rounded-lg md:p-4 p-2"
        onSubmit={onGetStatsByYear}
      >
        <div className="w-full">
          <label
            className="text-left text-black text-md font-medium"
            htmlFor="adminStatsYear"
          >
            Year
          </label>
          <select
            className="mt-2 mb-2 w-full h-10 border border-gray-400 rounded-md
transition duration-150 ease-in-out focus:text-gray-700
focus:bg-white focus:border-slate-600 p-2"
            type="text"
            id="adminStatsYear"
            name="adminStatsYear"
            placeholder="Enter adminStatsYear"
            value={adminStatsYear}
            onChange={handleProfileChange}
          >
            {generateYearOfStats().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button
          className="flex mt-2 mb-2 w-full items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          type="submit"
          disabled={isLoading}
        >
          {isLoading && (
            <Loader
              backgroundColor="text-gray-300"
              loaderColor="fill-black"
              text="Loading"
            />
          )}
          {!isLoading && "Get Stats"}
        </button>
      </form>
    </div>
  );
};
const AdminStats = () => {
  const { getStatsByAdmin, statsForAdmin, isLoading, adminStatsYear } =
    useAppContext();

  useEffect(() => {
    document.title = "Admin Home | Placement Portal";
    getStatsByAdmin();
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
      <ActionCard
        title={"Search By Year"}
        bgColor={"bg-orange-500"}
        icon={<FaSearch />}
        dropDownComponent={<AdminStatsSearchForm />}
      />
      <div className="flex sm:flex-row flex-col border w-full my-4 rounded-lg  justify-center py-2">
        <div className="text-center text-2xl font-bold"> {adminStatsYear}</div>
      </div>
      <div className="flex sm:flex-row flex-col md:mx-0 mx-2">
        <StatCard
          title="Total Students"
          value={statsForAdmin?.totalStudentsCount}
          icon={<FaUser />}
          textColor={"text-purple-500"}
          valueText={
            statsForAdmin?.totalStudentsCount > 1 ? `Students` : "Student"
          }
        />
        <StatCard
          title="Total Jobs"
          value={statsForAdmin?.totalJobsCount}
          icon={<FaBuilding />}
          textColor={"text-indigo-500"}
          valueText={statsForAdmin?.totalJobsCount > 1 ? `Jobs` : "Job"}
        />
      </div>
      <div className="flex sm:flex-row flex-col md:mx-0 mx-2">
        <StatCard
          title="Total Placed Students"
          value={statsForAdmin?.totalPlacedStudentsCount}
          icon={<BsBriefcaseFill />}
          textColor={"text-green-500"}
          valueText={
            statsForAdmin?.totalPlacedStudentsCount > 1 ? `Students` : "Student"
          }
        />
        <StatCard
          title="Total Not Placed Students"
          value={statsForAdmin?.totalNotPlacedStudentsCount}
          icon={<BsBriefcase />}
          textColor={"text-red-500"}
          valueText={
            statsForAdmin?.totalNotPlacedStudentsCount > 1
              ? `Students`
              : "Student"
          }
        />
      </div>
      <div className="flex sm:flex-row flex-col md:mx-0 mx-2">
        <StatCard
          title="Total Verified Students"
          value={statsForAdmin?.totalVerifiedStudentsCount}
          icon={<FaUserCheck />}
          textColor={"text-yellow-500"}
          valueText={
            statsForAdmin?.totalVerifiedStudentsCount > 1 ? `Students` : "Student"
          }
        />
        <StatCard
          title="Total Unverified Students"
          value={statsForAdmin?.totalUnverifiedStudentsCount}
          icon={<FaUserTimes />}
          textColor={"text-cyan-500"}
          valueText={
            statsForAdmin?.totalUnverifiedStudentsCount > 1
              ? `Students`
              : "Student"
          }
        />
      </div>
      <div className="flex sm:flex-row flex-col md:mx-0 mx-2">
        <StatCard
          title="Total Verified Jobs"
          value={statsForAdmin?.totalVerifiedJobsCount}
          icon={<BsBuildingFillCheck />}
          textColor={"text-gray-500"}
          valueText={
            statsForAdmin?.totalVerifiedJobsCount > 1 ? `Jobs` : "Job"
          }
        />
        <StatCard
          title="Total Unverified Jobs"
          value={statsForAdmin?.totalUnverifiedJobsCount}
          icon={<BsBuildingFillX />}
          textColor={"text-pink-500"}
          valueText={
            statsForAdmin?.totalUnverifiedJobsCount > 1
              ? `Jobs`
              : "Job"
          }
        />
      </div>
      <ActionCard
        title={"Placed vs Unplaced Students"}
        bgColor={"bg-violet-500"}
        icon={<BsGraphUp />}
        dropDownComponent={<PlacedChart />}
      />
      <ActionCard
        title={"Branch-wise Placements"}
        bgColor={"bg-yellow-500"}
        icon={<GiPieChart />}
        dropDownComponent={<BranchPieChart />}
      />
      <ActionCard
        title={" Branch-wise Placed vs Unplaced Students"}
        bgColor={"bg-green-500"}
        icon={<FaChartBar />}
        dropDownComponent={<BranchBarChart />}
      />
    </div>
  );
};

export default AdminStats;

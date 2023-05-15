import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BsGraphUp } from 'react-icons/bs'
import { FaChartBar } from 'react-icons/fa';
import { GiPieChart } from 'react-icons/gi'
import ActionCard from "../ActionCard";

const data = [
  { branch: "Computer Science", placed: 80, unplaced: 20 },
  { branch: "Electronics and Communication", placed: 70, unplaced: 30 },
  { branch: "Mechanical Engineering", placed: 60, unplaced: 40 },
  { branch: "Civil Engineering", placed: 50, unplaced: 50 },
  { branch: "Chemical Engineering", placed: 45, unplaced: 55 },
];

const COLORS = [ "#1a73e8",
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
"#36065D",];

const PlacedChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
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
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
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
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
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

const AdminStats = () => {
  return (
    <div>
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

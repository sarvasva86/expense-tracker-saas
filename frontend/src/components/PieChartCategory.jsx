import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChartCategory = ({ data }) => (
  <div>
    <h2>Category Breakdown</h2>
    <PieChart width={400} height={300}>
      <Pie
        dataKey="total"
        data={data}
        nameKey="_id"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </div>
);

export default PieChartCategory;

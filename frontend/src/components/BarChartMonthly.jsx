import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const BarChartMonthly = ({ data }) => {
  const formattedData = data.map(item => ({
    month: `${item._id.month}/${item._id.year}`,
    total: item.total,
  }));

  return (
    <div>
      <h2>Monthly Spending</h2>
      <BarChart width={600} height={300} data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default BarChartMonthly;

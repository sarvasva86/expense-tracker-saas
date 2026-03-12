import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const LineChartTrend = ({ data }) => {
  const formattedData = data.map(item => ({
    month: `${item._id.month}/${item._id.year}`,
    total: item.total,
  }));

  return (
    <div>
      <h2>Last 6 Months Trend</h2>
      <LineChart width={600} height={300} data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="total" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default LineChartTrend;

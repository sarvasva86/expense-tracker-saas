import React, { useEffect, useState } from "react";
import API from "../api/axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA00FF", "#FF3366"];

function Analytics() {
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [categoryExpenses, setCategoryExpenses] = useState([]);
  const [lastSixMonths, setLastSixMonths] = useState([]);

  useEffect(() => {
    fetchMonthlyExpenses();
    fetchCategoryExpenses();
    fetchLastSixMonths();
  }, []);

  const fetchMonthlyExpenses = async () => {
    try {
      const res = await API.get("/analytics/monthly");
      setMonthlyExpenses(res.data.map(item => ({
        month: `${item._id.year}-${item._id.month}`,
        total: item.total,
      })));
    } catch (err) {
      console.error(err);
      alert("Failed to load monthly expenses");
    }
  };

  const fetchCategoryExpenses = async () => {
    try {
      const res = await API.get("/analytics/categories");
      setCategoryExpenses(res.data.map(item => ({
        category: item._id,
        total: item.total,
      })));
    } catch (err) {
      console.error(err);
      alert("Failed to load category expenses");
    }
  };

  const fetchLastSixMonths = async () => {
    try {
      const res = await API.get("/analytics/last-six-months");
      setLastSixMonths(res.data.map(item => ({
        month: `${item._id.year}-${item._id.month}`,
        total: item.total,
      })));
    } catch (err) {
      console.error(err);
      alert("Failed to load last six months expenses");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h1>Analytics Dashboard</h1>

      {/* Monthly Expenses */}
      <h2>Monthly Expenses</h2>
      <BarChart width={700} height={300} data={monthlyExpenses}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>

      {/* Category Expenses */}
      <h2>Category Expenses</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={categoryExpenses}
          dataKey="total"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#82ca9d"
          label
        >
          {categoryExpenses.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Last Six Months */}
      <h2>Last Six Months Summary</h2>
      <BarChart width={700} height={300} data={lastSixMonths}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#FF8042" />
      </BarChart>
    </div>
  );
}

export default Analytics;

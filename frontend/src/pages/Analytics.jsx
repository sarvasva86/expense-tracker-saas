import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Analytics() {
  const navigate = useNavigate();

  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchMonthly();
    fetchCategory();
  }, []);

  // 📈 Monthly totals
  const fetchMonthly = async () => {
    try {
      const res = await API.get("/analytics/monthly");

      const formatted = res.data.map(item => ({
        month: `${item._id.month}/${item._id.year}`,
        total: item.total,
      }));

      setMonthlyData(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  // 🥧 Category totals
  const fetchCategory = async () => {
    try {
      const res = await API.get("/analytics/categories");
  
      const formatted = res.data.map(item => ({
        name: item._id,
        value: item.total
      }));
  
      setCategoryData(formatted);
      console.log("Category:", formatted);
    } catch (err) {
      console.error("Category error:", err);
    }
  };
  
  

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h1>📊 Analytics Dashboard</h1>

      <button
        onClick={() => navigate("/dashboard")}
        style={{ marginBottom: "20px" }}
      >
        ← Back to Dashboard
      </button>

      {/* 📈 Monthly Line Chart */}
      <h2>Monthly Expenses</h2>
      {monthlyData.length === 0 ? (
        <p>No monthly data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      )}

      <hr style={{ margin: "40px 0" }} />

      {/* 🥧 Category Pie Chart */}
      <h2>Category Breakdown</h2>
      {categoryData.length === 0 ? (
        <p>No category data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default Analytics;

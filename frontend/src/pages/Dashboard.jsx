import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Dashboard() {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  // Load expenses on page load
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Get all expenses
  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data);
    } catch (err) {
      console.error("Error loading expenses:", err);
      alert("Failed to load expenses. Are you logged in?");
    }
  };

  // Add expense
  const addExpense = async (e) => {
    e.preventDefault();
    try {
      const expenseData = {
        title: description || category,   // ✅ REQUIRED FIELD (fix)
        amount: Number(amount),
        category,
        description,
      };
      console.log("Sending expense:", expenseData);

      await API.post("/expenses", expenseData);

      // Clear form
      setAmount("");
      setCategory("");
      setDescription("");

      fetchExpenses(); // refresh list
      alert("Expense added successfully ✅");
    } catch (err) {
      console.error("Add expense error:", err);
      alert("Failed to add expense. Make sure you are logged in.");
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete expense");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // redirect to login
  };

  return (
    <div style={{ padding: "30px", maxWidth: "700px", margin: "auto" }}>
      <h1>
        Expense Dashboard
        <button
          onClick={handleLogout}
          style={{ float: "right", padding: "5px 10px", cursor: "pointer" }}
        >
          Logout
        </button>
      </h1>

      <button
        onClick={() => navigate("/analytics")}
        style={{ marginBottom: "20px", padding: "5px 10px", cursor: "pointer" }}
      >
        Go to Analytics
      </button>

      <h2>Add Expense</h2>
      <form onSubmit={addExpense}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button type="submit">Add Expense</button>
      </form>

      <hr />

      <h2>Your Expenses</h2>
      <ul>
        {expenses.map((exp) => (
          <li key={exp._id}>
            {exp.category} — ${exp.amount} — {exp.description}
            <button
              onClick={() => deleteExpense(exp._id)}
              style={{ marginLeft: "10px", cursor: "pointer" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;

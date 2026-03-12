const Expense = require("../models/Expense");

// Monthly expenses
exports.getMonthlyExpenses = async (req, res) => {
  try {
    const expenses = await Expense.aggregate([
      { $match: { user: req.user._id } }, // Correct field
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Expenses by category
exports.getCategoryExpenses = async (req, res) => {
  try {
    const expenses = await Expense.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Last 6 months summary
exports.getLastSixMonths = async (req, res) => {
  try {
    const today = new Date();
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);

    const expenses = await Expense.aggregate([
      {
        $match: {
          user: req.user._id,
          createdAt: { $gte: sixMonthsAgo, $lte: today },
        },
      },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

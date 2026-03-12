const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserID", required: true }
}, { timestamps: true }); // ✅ this adds createdAt & updatedAt

module.exports = mongoose.model("Expense", expenseSchema);

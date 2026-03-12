const express = require("express");
const router = express.Router();
const { getMonthlyExpenses, getCategoryExpenses, getLastSixMonths } = require("../controllers/analyticsController");
const { protect } = require("../middleware/authMiddleware");

// Protected routes
router.get("/monthly", protect, getMonthlyExpenses);
router.get("/categories", protect, getCategoryExpenses);
router.get("/last-six-months", protect, getLastSixMonths);

module.exports = router;

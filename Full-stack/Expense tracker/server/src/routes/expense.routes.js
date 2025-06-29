import express from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import { create, deleteExpense, getUserExpense, monthlyComparison, report, topSpendingCategoriesOfLastTwoMonths, totalExpenseAndIncome, totalExpenseAndIncomeOfSixMonths } from "../controllers/expense.controller.js";

const router = express.Router();

router.route("/").get(isLoggedIn, getUserExpense).post(isLoggedIn, create);

router.route("/expense/:expenseId").delete(isLoggedIn, deleteExpense);

router.route("/categories").get(isLoggedIn, totalExpenseAndIncome);

router.route("/total").get(isLoggedIn, totalExpenseAndIncomeOfSixMonths);

router.route("/topSpending").get(isLoggedIn, topSpendingCategoriesOfLastTwoMonths);

router.route("/monthlyInfo").get(isLoggedIn, monthlyComparison);

router.route("/report").get(isLoggedIn, report);

export default router;
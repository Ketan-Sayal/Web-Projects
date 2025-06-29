import express from "express";
import { getUser, googleLogin, login, logout, register, updateUser, updateUserPassword } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/login/google-oauth").post(googleLogin);
router.route("/").get(isLoggedIn, getUser).patch(updateUserPassword).post(isLoggedIn, logout);
router.route("/update").patch(isLoggedIn, updateUser);

export default router;
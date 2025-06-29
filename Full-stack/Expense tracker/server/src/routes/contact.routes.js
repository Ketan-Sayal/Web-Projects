import express from "express";
import { create } from "../controllers/contact.controller.js";
const router = express.Router();

router.route("/").post(create);

export default router;
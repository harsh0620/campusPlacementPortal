import express from "express";
const router = express.Router();
import { loginUser } from "../controller/authController.js";

/**
 * @desc Login an existing user
 * @route POST /api/v1/auth/login
 * @access Public
 */
router.route("/login").post(loginUser);

export default router;

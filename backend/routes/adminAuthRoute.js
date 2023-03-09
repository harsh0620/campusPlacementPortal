import express from "express";
const router = express.Router();
import {
  registerAdmin,
  loginAdmin,
  updateAdmin,
} from "../controller/adminAuthController.js";
import authenticateUser from "../middleware/auth.js";
/**
 * @desc Register a new admin user
 * @route POST /api/admin/register
 * @access Public
 */
router.route("/admin/register").post(registerAdmin);

/**
 * @desc Login an existing admin user
 * @route POST /api/admin/login
 * @access Public
 */
router.route("/admin/login").post(loginAdmin);

/**
 * @desc Update an existing admin user's profile
 * @route PUT /api/v1/auth/admin/profile
 * @access Private
 */
router.route("/admin/profile").patch(authenticateUser, updateAdmin);

export default router;

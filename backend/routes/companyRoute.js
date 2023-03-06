import express from "express";

const router = express.Router();
import { createCompany } from "../controller/companyController.js";

/**
 * @desc Register a new admin user
 * @route POST /api/v1/company/create
 * @access Private
 */
router.route("/create").post(createCompany);

// /**
//  * @desc Login an existing admin user
//  * @route POST /api/company/login
//  * @access Public
//  */
// router.route("/login").post(loginCompany);

// /**
//  * @desc Update an existing admin user's profile
//  * @route PUT /api/v1/auth/company/profile
//  * @access Private
//  */
// router.route("/updateProfile").patch(updateCompany);

export default router;

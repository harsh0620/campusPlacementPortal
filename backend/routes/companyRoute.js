import express from "express";
import authenticateUser from "../middleware/auth.js";
const router = express.Router();
import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  loginCompany,
} from "../controller/companyController.js";

/**
 * @desc Register a new company
 * @route POST /api/v1/company/create
 * @access Private
 */
router.route("/create").post(authenticateUser, createCompany);

/**
 * @desc Get All Companies
 * @route GET /api/v1/company/all
 * @access Private
 */
router.route("/all").get(authenticateUser, getAllCompanies);

/**
 * @desc Get Company by ID
 * @route GET /api/v1/company/:id
 * @access Private
 */
router.route("/:id").get(authenticateUser, getCompanyById);

/**
 * @desc Update a company
 * @route POST /api/v1/company/edit/:id
 * @access Private
 */
router.route("/edit/:id").patch(authenticateUser, updateCompanyById);
/**
 * @desc Login an existing company
 * @route POST /api/company/login
 * @access Public
 */
router.route("/login").post(loginCompany);

// /**
//  * @desc Update an existing admin user's profile
//  * @route PUT /api/v1/auth/company/profile
//  * @access Private
//  */
// router.route("/updateProfile").patch(updateCompany);

export default router;

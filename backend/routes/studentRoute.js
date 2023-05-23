import express from "express";

const router = express.Router();
import {
  registerStudent,
  updatePersonalDetailsStudent,
  updateAcademicDetailsStudent,
  updateProfessionalDetailsStudent,
  updateDocumentStudent,
} from "../controller/studentAuthController.js";
import authenticateUser from "../middleware/auth.js";
import { loginUser } from "../controller/authController.js";
import { applyToJobDrive } from "../controller/studentController.js";
/**
 * @desc Register a new student user
 * @route POST /api/v1/student/auth/register
 * @access Public
 */
router.route("/auth/register").post(registerStudent);

/**
 * @desc Login an existing student user
 * @route POST /api/v1/student/auth/login
 * @access Public
 */
router.route("/auth/login").post(loginUser);

/**
 * @desc Update an existing student user's personalDetails
 * @route PATCH /api/v1/student/personalDetails
 * @access Private
 */
router
  .route("/personalDetails")
  .patch(authenticateUser, updatePersonalDetailsStudent);

/**
 * @desc Update an existing student user's academicDetails
 * @route PATCH /api/v1/student/academicDetails
 * @access Private
 */
router
  .route("/academicDetails")
  .patch(authenticateUser, updateAcademicDetailsStudent);

/**
 * @desc Update an existing student user's professionalDetails
 * @route PATCH /api/v1/student/professionalDetails
 * @access Private
 */
router
  .route("/professionalDetails")
  .patch(authenticateUser, updateProfessionalDetailsStudent);
/**
 * @desc Update an existing student user's documentDetails
 * @route PATCH /api/v1/student/documentDetails
 * @access Private
 */
router.route("/documentDetails").patch(authenticateUser, updateDocumentStudent);

/**
 * @desc Apply to jobDrive
 * @route PATCH /api/v1/student/apply/:jobDriveId
 * @access Private
 */
router.route("/apply/:jobDriveId").patch(authenticateUser, applyToJobDrive);
export default router;

import express from "express";

const router = express.Router();
import {
  registerStudent,
  loginStudent,
  updatePersonalDetailsStudent,
  updateAcademicDetailsStudent,
  updateProfessionalDetailsStudent,
  updateDocumentStudent,
} from "../controller/studentAuthController.js";
import authenticateUser from "../middleware/auth.js";
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
router.route("/auth/login").post(loginStudent);

/**
 * @desc Update an existing student user's personalDetails
 * @route PUT /api/v1/student/personalDetails
 * @access Private
 */
router
  .route("/personalDetails")
  .patch(authenticateUser, updatePersonalDetailsStudent);

/**
 * @desc Update an existing student user's academicDetails
 * @route PUT /api/v1/student/academicDetails
 * @access Private
 */
router
  .route("/academicDetails")
  .patch(authenticateUser, updateAcademicDetailsStudent);

/**
 * @desc Update an existing student user's professionalDetails
 * @route PUT /api/v1/student/professionalDetails
 * @access Private
 */
router
  .route("/professionalDetails")
  .patch(authenticateUser, updateProfessionalDetailsStudent);
/**
 * @desc Update an existing student user's documentDetails
 * @route PUT /api/v1/student/documentDetails
 * @access Private
 */
router.route("/documentDetails").patch(authenticateUser, updateDocumentStudent);
export default router;

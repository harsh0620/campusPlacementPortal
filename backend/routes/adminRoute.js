import express from "express";
const router = express.Router();
import {
  registerAdmin,
  updateAdmin,
} from "../controller/adminAuthController.js";
import {
  verifyJobDrive,
  verifyStudent,
  sendMailToGoogleGroups,
  sendMessage,
} from "../controller/adminFeaturesController.js";
import authenticateUser from "../middleware/auth.js";

/**
 * Register a new admin user
 *
 * @route POST /api/v1/admin/register
 * @access Public
 */
router.route("/register").post(registerAdmin);

/**
 * Update an existing admin user's profile
 *
 * @route PUT /api/v1/admin/profile
 * @access Private
 */
router.route("/profile").patch(authenticateUser, updateAdmin);

/**
 * Verify a student
 *
 * @route PATCH /api/v1/admin/verifyStudent/:studentId
 * @access Private
 */
router
  .route("/verifyStudent/:studentId")
  .patch(authenticateUser, verifyStudent);

/**
 * Verify a job drive
 *
 * @route PATCH /api/v1/admin/verifyJobDrive/:jobDriveId
 * @access Private
 */
router
  .route("/verifyJobDrive/:jobDriveId")
  .patch(authenticateUser, verifyJobDrive);

/**
 * Send mails to Google groups
 *
 * @route POST /api/v1/admin/sendMails/:jobDriveId
 * @access Private
 */
router
  .route("/sendMails/:jobDriveId")
  .post(authenticateUser, sendMailToGoogleGroups);

/**
 * Send messages
 *
 * @route POST /api/v1/admin/sendMessages
 * @access Private
 */
router.route("/sendMessages").post(authenticateUser, sendMessage);

export default router;

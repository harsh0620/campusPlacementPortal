import express from "express";
const router = express.Router();
import {
  createAdmin,
  updateAdmin,
  getAdminProfileDetails,
} from "../controller/adminAuthController.js";
import {
  verifyJobDrive,
  verifyStudent,
  sendMailToGoogleGroups,
  sendMessage,
  getStudents,
  getStudentById,
  sendMailToSelectedStudent,
} from "../controller/adminFeaturesController.js";

/**
 * @desc Update an existing admin user's profile
 * @route PATCH /api/v1/admin/profile
 * @route GET /api/v1/admin/profile
 * @access Private
 */
router.route("/profile").patch(updateAdmin).get(getAdminProfileDetails);
/**
 * Create a new admin user
 *
 * @route POST /api/v1/admin/createAdmin
 * @access Private
 */
router.route("/createAdmin").post(createAdmin);

/**
 * Get students
 *
 * @route GET /api/v1/admin/students
 * @access Private
 */
router.route("/students").get(getStudents);

/**
 * Get student by id
 * @route GET /api/v1/admin/students/:studentId
 * @access Private
 * */
router.route("/students/:studentId").get(getStudentById);

/**
 * Send mail to selected student
 * @route POST /api/v1/admin/students/sendMail/:studentId
 * @access Private
 * */
router.route("/sendMail/:studentId").post(sendMailToSelectedStudent);
/**
 * Verify a student
 *
 * @route PATCH /api/v1/admin/verifyStudent/:studentId
 * @access Private
 */
router.route("/verifyStudent/:studentId").patch(verifyStudent);

/**
 * Verify a job drive
 *
 * @route PATCH /api/v1/admin/verifyJobDrive/:jobDriveId
 * @access Private
 */
router.route("/verifyJobDrive/:jobDriveId").patch(verifyJobDrive);

/**
 * Send mails to Google groups
 *
 * @route POST /api/v1/admin/sendMails/:jobDriveId
 * @access Private
 */
router.route("/sendMails/:jobDriveId").post(sendMailToGoogleGroups);

/**
 * Send messages
 *
 * @route POST /api/v1/admin/sendMessages
 * @access Private
 */
router.route("/sendMessages").post(sendMessage);

export default router;

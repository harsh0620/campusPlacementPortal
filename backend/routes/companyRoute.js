import express from "express";
import authenticateUser from "../middleware/auth.js";
const router = express.Router();
import {
  actionForStudentForJobDrive,
  createJobDrive,
  deleteJobDrive,
  getCompanyById,
  getJobDrive,
  getJobDriveById,
  getStats,
  getStudentById,
  updateCompanyById,
  updateJobDrive,
} from "../controller/companyController.js";

/**
 * @desc Get Company by ID
 * @route GET /api/v1/company/:companyId
 * @route PATCH /api/v1/company/:companyId
 * @access Private
 */

router.route("/stats").get(authenticateUser, getStats);
router
  .route("/job")
  .post(authenticateUser, createJobDrive)
  .get(authenticateUser, getJobDrive);
router
  .route("/:companyId")
  .get(authenticateUser, getCompanyById)
  .patch(authenticateUser, updateCompanyById);
router
  .route("/job/:jobId")
  .get(authenticateUser, getJobDriveById)
  .patch(authenticateUser, updateJobDrive)
  .delete(authenticateUser, deleteJobDrive);
  router.route("/action/:studentId").patch(authenticateUser, actionForStudentForJobDrive);
router.route("/student/:studentId").get(authenticateUser, getStudentById);
export default router;

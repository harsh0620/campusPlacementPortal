import express from "express";
import authenticateUser from "../middleware/auth.js";
const router = express.Router();
import {
  createJobDrive,
  getJobDrives,
  getJobDriveById,
  updateJobDrive,
  deleteJobDrive,
} from "../controller/jobDriveController.js";

/**
 * @desc Register a new jobDrive
 * @route POST /api/v1/jobDrive/create
 * @access Private
 */
router.route("/create").post(authenticateUser, createJobDrive);

/**
 * @desc Get All jobDrive
 * @route GET /api/v1/jobDrive/all
 * @access Private
 */
router.route("/all").get(authenticateUser, getJobDrives);

/**
 * @desc Get jobDrive by ID
 * @route GET /api/v1/jobDrive/:id
 * @access Private
 */
router.route("/:id").get(authenticateUser, getJobDriveById);

/**
 * @desc Update a jobDrive
 * @route POST /api/v1/jobDrive/edit/:id
 * @access Private
 */
router.route("/edit/:id").patch(authenticateUser, updateJobDrive);

/**
 * @desc Delete a jobDrive
 * @route POST /api/v1/jobDrive/delete/:id
 * @access Private
 */
router.route("/delete/:id").delete(authenticateUser, deleteJobDrive);

export default router;

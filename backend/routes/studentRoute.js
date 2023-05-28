import express from "express";

const router = express.Router();
import {
  registerStudent,
  getBasicDetailsStudent,
  updateBasicDetailsStudent,
  getPersonalDetailsStudent,
  updatePersonalDetailsStudent,
  getAcademicDetailsStudent,
  updateAcademicDetailsStudent,
  getProfessionalDetailsStudent,
  updateProfessionalDetailsStudent,
  getDocumentDetailsStudent,
  updateDocumentStudent,
} from "../controller/studentAuthController.js";
import authenticateUser from "../middleware/auth.js";
import { loginUser } from "../controller/authController.js";
import { applyToJobDrive, calculateProfileFilledPercentage, getCompany, getCompanyById, getJob, getJobById, getJobsCalendar, getStats, getStudentById } from "../controller/studentController.js";
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
 * Get company
 *
 * @route GET /api/v1/student/company
 * @access Private
 */
router.route("/company").get(authenticateUser,getCompany);

/**
 * Get company by id
 * @route GET /api/v1/student/company/:companyId
 * @access Private
 * */
router.route("/company/:companyId").get(authenticateUser,getCompanyById);
/**
 * Get job
 *
 * @route GET /api/v1/student/job
 * @access Private
 */
router.route("/job").get(authenticateUser,getJob);

/**
 * Get job by id
 * @route GET /api/v1/student/job/:jobId
 * @access Private
 * */
router.route("/job/:jobId").get(authenticateUser,getJobById);


/**
 * @desc Update an existing student user's personalDetails
 * @route PATCH /api/v1/student/basicDetails
 * @access Private
 */
router
  .route("/basicDetails")
  .patch(authenticateUser, updateBasicDetailsStudent)
  .get(authenticateUser, getBasicDetailsStudent);

/**
 * @desc Update an existing student user's personalDetails
 * @route PATCH /api/v1/student/personalDetails
 * @access Private
 */
router
  .route("/personalDetails")
  .patch(authenticateUser, updatePersonalDetailsStudent)
  .get(authenticateUser, getPersonalDetailsStudent);

/**
 * @desc Update an existing student user's academicDetails
 * @route PATCH /api/v1/student/academicDetails
 * @access Private
 */
router
  .route("/academicDetails")
  .patch(authenticateUser, updateAcademicDetailsStudent)
  .get(authenticateUser, getAcademicDetailsStudent);

/**
 * @desc Update an existing student user's professionalDetails
 * @route PATCH /api/v1/student/professionalDetails
 * @access Private
 */
router
  .route("/professionalDetails")
  .patch(authenticateUser, updateProfessionalDetailsStudent)
  .get(authenticateUser, getProfessionalDetailsStudent);
/**
 * @desc Update an existing student user's documentDetails
 * @route PATCH /api/v1/student/documentDetails
 * @access Private
 */
router
  .route("/documentDetails")
  .patch(authenticateUser, updateDocumentStudent)
  .get(authenticateUser, getDocumentDetailsStudent);

/**
 * @desc Apply to jobDrive
 * @route PATCH /api/v1/student/apply/:jobDriveId
 * @access Private
 */
router.route("/apply/:jobDriveId").patch(authenticateUser, applyToJobDrive);


router.route("/calculateProfileFilledPercentage").get(authenticateUser, calculateProfileFilledPercentage)
router.route("/stats").get(authenticateUser, getStats)
router.route("/jobsCalendar").get(authenticateUser, getJobsCalendar)

/**
 * @desc Get a student by id
 * @route GET /api/v1/student/students/:studentId
 * @access Private
 */
router.route("/:studentId").get(authenticateUser, getStudentById);

export default router;

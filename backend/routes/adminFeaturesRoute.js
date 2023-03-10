import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";
// // Import Admin Feature Controllers
import {
  verifyJobDrive,
  // createCompany,
  // updateCompany,
  // deleteCompany,
  // getAllCompanies,
  // getCompanyById,
  // createJobDrive,
  // updateJobDrive,
  // deleteJobDrive,
  // getAllJobDrives,
  // getJobDriveById,
  // createStudentDetails,
  // updateStudentDetails,
  // deleteStudentDetails,
  // getAllStudentDetails,
  // getStudentDetailsById,
  // allowApplication,
  // blockApplication,
  verifyStudent,
  // verifyCompanyDetails,
  // filterStudents,
  // filterCompanies,
} from "../controller/adminFeaturesController.js";

// // CRUD Operations for Companies
// router.route("/companies").post(createCompany).get(getAllCompanies);
// router
// .route("/companies/:id")
// .put(updateCompany)
// .delete(deleteCompany)
// .get(getCompanyById);

// // CRUD Operations for Job Drives
// router.route("/jobdrives").post(createJobDrive).get(getAllJobDrives);
// router
// .route("/jobdrives/:id")
// .put(updateJobDrive)
// .delete(deleteJobDrive)
// .get(getJobDriveById);

// // CRUD Operations for Student Details
// router
// .route("/students")
// .post(createStudentDetails)
// .get(getAllStudentDetails);
// router
// .route("/students/:id")
// .put(updateStudentDetails)
// .delete(deleteStudentDetails)
// .get(getStudentDetailsById);

// // Allow/Block Students to fill Applications
// router.route("/allowapplication/:id").put(allowApplication);
// router.route("/blockapplication/:id").put(blockApplication);

// // Verify Student and Company Details
router
  .route("/verifyStudent/:studentId")
  .patch(authenticateUser, verifyStudent);
router
  .route("/verifyJobDrive/:jobDriveId")
  .patch(authenticateUser, verifyJobDrive);

// // Filter Students and Companies
// router.route("/filterstudents").get(filterStudents);
// router.route("/filtercompanies").get(filterCompanies);

export default router;

import express from "express";
const router = express.Router();
import authenticateUser from "../middleware/auth.js";
import {
  verifyJobDrive,
  verifyStudent,
  sendMailToGoogleGroups,
  sendMessage,
} from "../controller/adminFeaturesController.js";

router
  .route("/verifyStudent/:studentId")
  .patch(authenticateUser, verifyStudent);
router
  .route("/verifyJobDrive/:jobDriveId")
  .patch(authenticateUser, verifyJobDrive);

router
  .route("/sendMails/:jobDriveId")
  .post(authenticateUser, sendMailToGoogleGroups);
router.route("/sendMessages").post(sendMessage);
export default router;

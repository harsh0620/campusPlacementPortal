import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";
import JobDrive from "../models/jobDrive.js";
import Students from "../models/students.js";
import checkPermissions from "../utils/checkPermissions.js";

/**
 * @desc Update an existing admin user's profile
 * @route PUT /api/v1/admin/verifyStudent/:studentId
 * @access Private
 */
// Define an asynchronous function called updateUser that takes in two parameters: req and res
const verifyStudent = async (req, res, next) => {
  try {
    checkPermissions(req.user, req.params.studentId);
    const studentId = req.params.studentId;
    // Find the student in the database using the studentId ID stored in the request object
    const student = await Students.findOne({ _id: studentId });
    if (!student) {
      throw new NotFoundError(`No student with id :${studentId}`);
    }
    // Update the student's verified status
    var flag = student.verified;
    student.verified = !student.verified;
    // Save the updated student object in the database
    await student.save();
    return res.status(StatusCodes.OK).json({
      message: `Student ${!flag ? "verified" : "unverified"} successfully`,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Update an existing admin user's profile
 * @route PUT /api/v1/admin/verifyJobDrive/:jobDriveId
 * @access Private
 */
// Define an asynchronous function called updateUser that takes in two parameters: req and res
const verifyJobDrive = async (req, res, next) => {
  try {
    checkPermissions(req.user, req.params.jobDriveId);
    const jobDriveId = req.params.JobDriveId;
    // Find the JobDrive in the database using the jobDriveId ID stored in the request object
    const jobDrive = await JobDrive.findOne({ _id: jobDriveId });
    if (!jobDrive) {
      throw new NotFoundError(`No JobDrive with id :${jobDriveId}`);
    }
    // Update the jobDrive's verified status
    var flag = jobDrive.verified;
    jobDrive.verified = !jobDrive.verified;
    // Save the updated jobDrive object in the database
    await jobDrive.save();
    return res.status(StatusCodes.OK).json({
      message: `JobDrive ${!flag ? "verified" : "unverified"} successfully`,
    });
  } catch (err) {
    next(err);
  }
};
export { verifyStudent, verifyJobDrive };

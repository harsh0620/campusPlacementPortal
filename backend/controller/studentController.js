import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import Student from "../models/students.js";
import JobDrive from "../models/jobDrive.js";
import Company from "../models/Company.js";
import Admin from "../models/admin.js";

/**
 * @desc Apply to jobDrive
 * @route POST /api/v1/student/apply/:jobDriveId
 * @access Private
 */
const applyToJobDrive = async (req, res, next) => {
  try {
    const jobDriveId = req.params.jobDriveId;
    const requester = req.user.userId;
    const jobDrive = await JobDrive.findById(jobDriveId);
    if (!jobDrive) {
      throw new NotFoundError(`No jobDrive with id :${jobDriveId}`);
    }
    const ifStudent = await Student.findOne({ _id: requester });
    if (!ifStudent || ifStudent.verified === false) {
      throw new UnAuthenticatedError(
        "You are not authorized to apply to this job drive"
      );
    }
    const ifApplied = await JobDrive.findOne({
      _id: jobDriveId,
      appliedBy: requester,
    });
    if (ifApplied) {
      throw new BadRequestError("You have already applied to this job drive");
    }
    const updatedJobDrive = await JobDrive.findOneAndUpdate(
      { _id: jobDriveId },
      { $push: { appliedBy: requester } },
      {
        new: true,
        runValidators: true,
      }
    );
    res
      .status(StatusCodes.OK)
      .json({ message: "Applied successfully", updatedJobDrive });
  } catch (error) {
    next(error);
  }
};
/**
 * @desc Get a student by id
 *
 * @route GET /api/v1/student/students/:studentId
 * @access Private
 */
const getStudentById = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const admin = await Admin.findOne({ _id: userId });
    const company = await Company.findOne({ _id: userId });
    console.log(admin, company);
    if (admin || company) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform this action"
      );
    }
    const studentId = req.params.studentId;
    if(studentId!==userId)
    {
      throw new UnAuthenticatedError(
        "You are not authorized to perform this action"
      );
    }
    const student = await Student.findOne({ _id: studentId });
    if (!student) {
      throw new NotFoundError(`No student with ID: ${studentId}`);
    }
    return res.status(StatusCodes.OK).json({
      student,
    });
  } catch (error) {
    next(error);
  }
};
export { applyToJobDrive,getStudentById };

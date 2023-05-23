import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import Student from "../models/students.js";
import JobDrive from "../models/jobDrive.js";

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

export { applyToJobDrive };

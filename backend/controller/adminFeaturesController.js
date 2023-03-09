import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/index.js";
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

export { verifyStudent };

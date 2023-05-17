import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import Admin from "../models/admin.js";
import Company from "../models/Company.js";
import Student from "../models/students.js";

/**

@desc Get all companies based on query parameters
@route GET /api/v1/company/all
@access Private
*/
// Define an asynchronous function called getAllCompanies that takes in three parameters: req, res, and next
const getAllStudents = async (req, res, next) => {
  try {
    // Extract the userId property from the request object
    const userId = req.user.userId;

    // Check if the authenticated user is a company; if so, throw an UnAuthenticatedError
    const ifAdmin = await Admin.findOne({ _id: userId });
    if (!ifAdmin) {
      throw new UnAuthenticatedError(
        "You are not authorized to view all students"
      );
    }
    const {
      name,
      email,
      enrollmentNo,
      gender,
      stream,
      verified,
      selected,
      yearOfPassing,
    } = req.body;
    console.log(req.body);
console.log(req.query);
    // Define the filter object for the search query
    const filter = {};
    if (name) {
      query["name"] = { $regex: name, $options: "i" };
    }
    if (email) {
      query["email"] = { $regex: email, $options: "i" };
    }
    if (enrollmentNo) {
      query["enrollmentNo"] = { $regex: enrollmentNo, $options: "i" };
    }
    if (verified) {
      query["verified"] = { $regex: verified, $options: "i" };
    }
    if (gender) {
      query["personalDetails.gender"] = { $regex: gender, $options: "i" };
    }
    if (stream) {
      query["personalDetails.stream"] = { $regex: stream, $options: "i" };
    }
    if (selected) {
      query["placementDetails.selected"] = { $regex: selected, $options: "i" };
    }
    if (yearOfPassing) {
      query["academicDetails.yearOfPassing"] = { $regex: yearOfPassing, $options: "i" };
    }
    // Search for students based on the filter
    const students = await Student.find(filter);

    // Send a response to the client with a 200 (OK) status code, including an array of company objects that match the query criteria
    res.status(StatusCodes.OK).json(students);
  } catch (error) {
    // Pass any caught errors to the error handling middleware
    next(error);
  }
};

export { getAllStudents };

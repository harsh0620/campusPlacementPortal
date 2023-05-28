import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import Admin from "../models/admin.js";
import Company from "../models/Company.js";
import Student from "../models/students.js";
import JobDrive from "../models/jobDrive.js";

/**

@desc Get a single company by ID
@route GET /api/v1/company/:companyId
@access Private
*/
const getCompanyById = async (req, res, next) => {
  try {
    // Get the userId from the authenticated user
    const userId = req.user.userId;
    const admin = await Admin.findOne({ _id: userId });
    const student = await Student.findOne({ _id: userId });
    if (admin || student) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform this action"
      );
    }
    const companyId = req.params.companyId;
    if (companyId !== userId) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform this action"
      );
    }
    // Get the company with the given ID from the database
    const company = await Company.findOne({ _id: companyId }).populate({
      path: "placementDrives",
      populate: {
        path: "company",
      },
    });
    // If no company is found, throw a NotFoundError with an error message
    if (!company) {
      throw new NotFoundError("Company not found");
    } else {
      // Otherwise, send the company object to the client with a 200 (OK) status code
      res.status(StatusCodes.OK).json({ company });
    }
  } catch (error) {
    // If an error occurs, pass it to the error handling middleware
    next(error);
  }
};

/**

@desc Update a company by ID
@route PATCH /api/v1/company/:companyId
@access Private
*/
const updateCompanyById = async (req, res, next) => {
  try {
    // Destructure the request body to get the values for updating the company
    const {
      name,
      email,
      website,
      description,
      logo,
      linkedin,
      address,
      programs,
      streams,
    } = req.body;

    // Destructure the request body to get HR details
    const { hrName, hrEmail, hrPhone } = req.body;

    // Check if any required fields are missing in the request body
    if (
      !name ||
      !email ||
      !website ||
      !description ||
      !logo ||
      !linkedin ||
      !address ||
      !hrName ||
      !hrEmail ||
      !programs ||
      !streams ||
      !hrPhone
    ) {
      // Throw a BadRequestError if any required field is missing
      throw new BadRequestError("Please provide all the required fields");
    }
    // Get the userId from the request object
    const userId = req.user.userId;
    // Check if the user is a student. If yes, throw an UnAuthenticatedError
    const ifStudent = await Student.findOne({ _id: userId });
    if (ifStudent) {
      throw new UnAuthenticatedError(
        "You are not authorized to edit this company"
      );
    }
    // Get the companyId from the request parameters
    const companyId = req.params.companyId;

    // Find the company by ID
    const company = await Company.findOne({ _id: companyId }).select(
      "+password"
    );

    // If the company is not found, throw a NotFoundError
    if (!company) {
      throw new UnAuthenticatedError(`No company with id :${companyId}`);
    }
    req.body.password = company?.password;
    // Update the company by ID with the values from the request body
    const updatedCompany = await Company.findOneAndUpdate(
      { _id: companyId },
      req.body,
      {
        new: true, // Return the updated document
        runValidators: true, // Run model validators on the update operation
      }
    );

    // Return the updated company as a response
    res.status(StatusCodes.OK).json({ updatedCompany });
  } catch (error) {
    // Pass any error to the error handling middleware
    next(error);
  }
};
const createJobDrive = async (req, res, next) => {
  try {
    const {
      designations,
      locations,
      streams,
      programs,
      startDate,
      lastDate,
      eligibilityCriteria,
      driveDate,
      packageValue,
      description,
      pdfLink,
    } = req.body;
    console.log(req.body);
    if (
      !designations ||
      !locations ||
      !streams ||
      !programs ||
      !startDate ||
      !lastDate ||
      !eligibilityCriteria ||
      !driveDate ||
      !packageValue ||
      !description ||
      !pdfLink
    ) {
      throw new BadRequestError("Please provide all the required fields");
    }
    const locationArray=locations.split(",");
    const designationArray=designations.split(",");
    req.body.locations=locationArray;
    req.body.designations=designationArray;
    const userId = req.user.userId;
    const ifAdmin = await Admin.findOne({ _id: userId });
    const ifStudent = await Student.findOne({ _id: userId });
    if (ifStudent || ifAdmin) {
      throw new UnAuthenticatedError(
        "You are not authorized to create a job drive"
      );
    }
    var company = await Company.findOne({ _id: userId });
    if (!company) {
      throw new UnAuthenticatedError(
        "You are not authorized to create a job drive"
      );
    }
    req.body.company = company?._id;
    const jobDrive = new JobDrive(req.body);
    const newJobDrive = await jobDrive.save();
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Job Created Successfully", jobDrive: newJobDrive });
  } catch (error) {
    next(error);
  }
};
const getJobDrive = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    console.log(userId);
    const ifAdmin = await Admin.findOne({ _id: userId });
    const ifStudent = await Student.findOne({ _id: userId });
    console.log(ifAdmin, ifStudent);
    if (ifStudent || ifAdmin) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform action for job drive"
      );
    }
    const jobDrive = await JobDrive.find({ company: userId }).populate(
      "company",
      "name"
    );

    console.log(jobDrive);
    res.status(StatusCodes.OK).json({ jobs: jobDrive });
  } catch (error) {
    next(error);
  }
};
const getJobDriveById = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const ifAdmin = await Admin.findOne({ _id: userId });
    const ifStudent = await Student.findOne({ _id: userId });
    if (ifStudent || ifAdmin) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform action for job drive"
      );
    }
    const jobId = req.params.jobId;
    console.log(userId, jobId);
    const jobDrive = await JobDrive.findOne({ _id: jobId })
      .populate("company", "name")
      .populate(
        "appliedBy",
        "name enrollmentNo personalDetails.stream applicationStatus placementDetails.selected"
      );
    console.log(jobDrive);

    if (jobDrive?.company?._id.toString() !== userId) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform action for job drive"
      );
    }

    if (!jobDrive) {
      throw new NotFoundError("Job Drive not found");
    }
    res.status(StatusCodes.OK).json({ job: jobDrive });
  } catch (error) {
    next(error);
  }
};

const updateJobDrive = async (req, res, next) => {
  try {
    const {
      designations,
      locations,
      streams,
      programs,
      startDate,
      lastDate,
      eligibilityCriteria,
      driveDate,
      packageValue,
      description,
      pdfLink,
    } = req.body;
    if (
      !designations ||
      !locations ||
      !streams ||
      !programs ||
      !startDate ||
      !lastDate ||
      !eligibilityCriteria ||
      !driveDate ||
      !packageValue ||
      !description ||
      !pdfLink
    ) {
      throw new BadRequestError("Please provide all the required fields");
    }
    const userId = req.user.userId;
    const jobDriveId = req.params.jobId;
    const ifAdmin = await Admin.findOne({ _id: userId });
    const ifStudent = await Student.findOne({ _id: userId });
    if (ifStudent || ifAdmin) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform action for job drive"
      );
    }
    var company = await Company.findOne({ _id: userId });
    const job = await JobDrive.findOne({ _id: jobDriveId });
    if (!company || job?.company.toString() !== company?._id.toString()) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform action for job drive"
      );
    }
    req.body.company = company?._id;
    const updatedJobDrive = await JobDrive.findOneAndUpdate(
      { _id: jobDriveId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res
      .status(StatusCodes.OK)
      .json({ message: "Job Updated Successfully", jobDrive: updatedJobDrive });
  } catch (error) {
    next(error);
  }
};
const getStudentById = async (req, res, next) => {
  try {
    const companyId = req.user.userId;
    const company = await Company.findOne({ _id: companyId });
    if (!company) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform this action"
      );
    }
    const studentId = req.params.studentId;
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
const deleteJobDrive = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const jobDriveId = req.params.jobId;
    const ifAdmin = await Admin.findOne({ _id: userId });
    const ifStudent = await Student.findOne({ _id: userId });
    if (ifStudent || ifAdmin) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform action for job drive"
      );
    }
    var company = await Company.findOne({ _id: userId });
    const job = await JobDrive.findOne({ _id: jobDriveId });
    if (!company || job?.company.toString() !== company?._id.toString()) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform action for job drive"
      );
    }
    await JobDrive.findOneAndDelete({
      _id: jobDriveId,
    });
    res
      .status(StatusCodes.OK)
      .json({ message: "Job Deleted Successfully"});
  } catch (error) {
    next(error);
  }
};
const actionForStudentForJobDrive = async (req, res, next) => {
  try {
    const {action, studentId, jobProfile, jobPackage} = req.body;
    if(!action){
      throw new BadRequestError("Please provide all the required fields");
    }
    const userId = req.user.userId;
    const jobDriveId = req.params.jobId;
    const ifAdmin = await Admin.findOne({ _id: userId });
    const ifStudent = await Student.findOne({ _id: userId });
    if (ifStudent || ifAdmin) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform action for job drive"
      );
    }
    var company = await Company.findOne({ _id: userId });
    const job = await JobDrive.findOne({ _id: jobDriveId });
    if (!company || job?.company.toString() !== company?._id.toString()) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform action for job drive"
      );
    }
    const student = await Student.findOne({ _id: studentId })
    if(!student){
      throw new NotFoundError(`No student with ID: ${studentId}`);
    }
    console.log(action);
    if(action === "hire"){
      if(!action || !studentId || !jobProfile || !jobPackage){
        throw new BadRequestError("Please provide all the required fields");
      }
      student.placementDetails.selected = true;
      student.placementDetails.selectedIn.company = company?._id;
      student.placementDetails.selectedIn.jobProfile =jobProfile;
      student.placementDetails.selectedIn.package =jobPackage;
      await student.save();
    }
    else if(action === "reject"){
      student.placementDetails.selected = false;
      await student.save();
      const updatedStudent= await Student.findOneAndUpdate(
        { _id: studentId },
        { $push: { rejectedFrom: company?._id } },
        {
          new: true,
          runValidators: true,
        }
      );
    }
    res
      .status(StatusCodes.OK)
      .json({ message: "Action Performed Successfully"});
  }
  catch (error) {
    next(error);
  }
};
export {
  getCompanyById,
  updateCompanyById,
  getJobDrive,
  getJobDriveById,
  createJobDrive,
  updateJobDrive,
  deleteJobDrive,
  getStudentById,
  actionForStudentForJobDrive,
};

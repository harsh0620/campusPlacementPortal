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
import jobDrive from "../models/jobDrive.js";
import ObjectsToCsv from "objects-to-csv";
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
    if (!ifStudent) {
      throw new UnAuthenticatedError(
        "You are not authorized to apply to this job drive"
      );
    }
    if (ifStudent.applicationStatus === "unverified" || ifStudent?.placementDetails?.selected===true) {
      throw new BadRequestError(
        "You are not veried by the admin yet. Please wait for the admin to verify you OR you are already selected in a company."
      );
    }
    if (jobDrive.lastDate < new Date()) {
      throw new BadRequestError("Last date to perform action has passed");
    }
    const ifApplied = await JobDrive.findOne({
      _id: jobDriveId,
      appliedBy: requester,
    });
    if (ifApplied) {
      //remove from appliedBy
      const updatedJobDrive = await JobDrive.findOneAndUpdate(
        { _id: jobDriveId },
        { $pull: { appliedBy: requester } },
        {
          new: true,
          runValidators: true,
        }
      );
      const updatedStudent = await Student.findOneAndUpdate(
        { _id: requester },
        { $pull: { "placementDetails.appliedIn": jobDriveId } },
        {
          new: true,
          runValidators: true,
        }
      );
      res
        .status(StatusCodes.OK)
        .json({
          message: "Discarded the job successfully",
          job: updatedJobDrive,
        });
    } else {
      const updatedJobDrive = await JobDrive.findOneAndUpdate(
        { _id: jobDriveId },
        { $push: { appliedBy: requester } },
        {
          new: true,
          runValidators: true,
        }
      );
      const updatedStudent = await Student.findOneAndUpdate(
        { _id: requester },
        { $push: { "placementDetails.appliedIn": jobDriveId } },
        {
          new: true,
          runValidators: true,
        }
      );
      res
        .status(StatusCodes.OK)
        .json({
          message: "Applied for the job successfully",
          job: updatedJobDrive,
        });
    }
  } catch (error) {
    next(error);
  }
};
/**
 * @desc Get a student by id
 *
 * @route GET /api/v1/student/:studentId
 * @access Private
 */
const getStudentById = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const admin = await Admin.findOne({ _id: userId });
    const company = await Company.findOne({ _id: userId });
    if (admin || company) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform this action"
      );
    }
    const studentId = req.params.studentId;
    if (studentId !== userId) {
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
import { Parser } from 'json2csv';

const getStudentByIdInCSV = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const admin = await Admin.findOne({ _id: userId });
    const company = await Company.findOne({ _id: userId });
    if (admin || company) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform this action"
      );
    }
    const studentId = req.params.studentId;
    if (studentId !== userId) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform this action"
      );
    }
    const student = await Student.findOne({ _id: studentId });
    if (!student) {
      throw new NotFoundError(`No student with ID: ${studentId}`);
    }

    // Convert student data to CSV format
    const csvFields = [
      'role',
      'applicationStatus',
      'enrollmentNo',
      'name',
      'email',
      'about',
      'placementDetails',
      'personalDetails',
      'academicDetails',
      'professionalDetails',
      'documents',
    ];

    const json2csvParser = new Parser({ fields: csvFields });
    const csvData = json2csvParser.parse(student);



    // Set the response headers for CSV download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="student.csv"');

    // Send the CSV data as the response
    res.send(csvData);

  } catch (error) {
    next(error);
  }
};

const getCompany = async (req, res, next) => {
  try {
    // Extract the userId property from the request object
    const userId = req.user.userId;

    // Check if the authenticated user is a admin; if so, throw an UnAuthenticatedError
    const ifStudent = await Student.findOne({ _id: userId });
    if (!ifStudent) {
      throw new UnAuthenticatedError(
        "You are not authorized to view all students"
      );
    }
    const companies = await Company.find({}).select("name email logo website");
    res.status(StatusCodes.OK).json({
      companies,
    });
  } catch (error) {
    // Pass any caught errors to the error handling middleware
    next(error);
  }
};
const getCompanyById = async (req, res, next) => {
  try {
    const studentId = req.user.userId;
    const student = await Student.findOne({ _id: studentId });
    if (!student) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform this action"
      );
    }
    const companyId = req.params.companyId;
    const company = await Company.findOne({ _id: companyId }).populate({
      path: "placementDrives",
      populate: {
        path: "company",
      },
    });

    if (!company) {
      throw new NotFoundError(`No company with ID: ${companyId}`);
    }
    return res.status(StatusCodes.OK).json({
      company,
    });
  } catch (error) {
    next(error);
  }
};
const getJob = async (req, res, next) => {
  try {
    // Extract the userId property from the request object
    const userId = req.user.userId;

    // Check if the authenticated user is a admin; if so, throw an UnAuthenticatedError
    const ifStudent = await Student.findOne({ _id: userId });
    if (!ifStudent) {
      throw new UnAuthenticatedError(
        "You are not authorized to view all students"
      );
    }
    const jobs = await jobDrive
      .find({verified: true})
      .sort({ driveDate: -1 })
      .populate("company", "name");
    res.status(StatusCodes.OK).json({
      jobs,
    });
  } catch (error) {
    // Pass any caught errors to the error handling middleware
    next(error);
  }
};
const getJobById = async (req, res, next) => {
  try {
    const studentId = req.user.userId;
    const student = await Student.findOne({ _id: studentId });
    if (!student) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform this action"
      );
    }
    const jobId = req.params.jobId;
    const job = await jobDrive
      .findOne({ _id: jobId,verified: true })
      .populate("company", "name");
    if (!job) {
      throw new NotFoundError(`No job with ID: ${jobId}`);
    }
    let applied = false;
    if (job.appliedBy.includes(studentId)) {
      applied = true;
      console.log("true");
    } else {
      applied = false;
      console.log("false");
    }
    console.log(applied);
    return res.status(StatusCodes.OK).json({
      job,
      applied,
    });
  } catch (error) {
    next(error);
  }
};
const getStats = async (req, res, next) => {
  try {
    const studentId = req.user.userId;
    const student = await Student.findOne({ _id: studentId });
    if (!student) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform this action"
      );
    }
    let stats = {};
    stats["applicationStatus"] = student?.applicationStatus;
    stats["totalAppliedCount"] =
      student?.placementDetails?.appliedIn?.length || 0;
    stats["totalRejectedCount"] =
      student?.placementDetails?.rejectedFrom?.length || 0;
    stats["totalApplied"] = await jobDrive
      .find({ _id: { $in: student?.placementDetails?.appliedIn } })
      .populate("company", "name");
    stats["totalRejected"] = await jobDrive
      .find({ _id: { $in: student?.placementDetails?.rejectedFrom } })
      .populate("company", "name");
    return res.status(StatusCodes.OK).json({
      stats,
    });
  } catch (error) {
    next(error);
  }
};
const getJobsCalendar = async (req, res, next) => {
  try {
    const studentId = req.user.userId ;
    const student = await Student.findOne({ _id: studentId });
    if (!student) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform this action"
      );
    }
    const jobs = await jobDrive.find({}).sort({ driveDate: -1 }).populate("company", "name");
    let events = [];
    for (let job of jobs) {
      const driveDate = new Date(job.driveDate);
      const formattedDate = driveDate.toISOString().substring(0, 10);
      
      const event = {
        title: job?.company?.name,
        start: formattedDate,
        end: formattedDate,
        extendedProps:{
          description: job?.description,
        }
        
      };
    
      events.push(event);
    }
    console.log(events);
    return res.status(StatusCodes.OK).json({
      events,
    });
  } catch (error) {
    next(error);
  }
};
const calculateProfileFilledPercentage = async (req, res, next) => {
  try {
    const studentId = req.user.userId ;
    const student = await Student.findOne({ _id: studentId });
    if (!student) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform this action"
      );
    }
    let filledFields = 0;
    let totalFields = 30;
    if (student?.name) {
      filledFields++;
    }
    if (student?.email) {
      filledFields++;
    }
    if (student?.enrollmentNo) {
      filledFields++;
    }
    if (student?.about) {
      filledFields++;
    }
    if (student?.personalDetails?.profileImage) {
      filledFields++;
    }
    if (student?.personalDetails?.dob) {
      filledFields++;
    }
    if (student?.personalDetails?.gender) {
      filledFields++;
    }
    if (student?.personalDetails?.contactNo) {
      filledFields++;
    }
    if (student?.personalDetails?.aadharNo) {
      filledFields++;
    }
    if (student?.personalDetails?.program) {
      filledFields++;
    }
    if (student?.personalDetails?.stream) {
      filledFields++;
    }
    if (student?.personalDetails?.collegeName) {
      filledFields++;
    }
    if (student?.personalDetails?.universityName) {
      filledFields++;
    }
    if (student?.personalDetails?.fatherName) {
      filledFields++;
    }
    if (student?.personalDetails?.motherName) {
      filledFields++;
    }

    if (student?.personalDetails?.currentAddress) {
      filledFields++;
    }
    if (student?.personalDetails?.permanentAddress) {
      filledFields++;
    }
    if (student?.personalDetails?.homeCity) {
      filledFields++;
    }
    if (student?.personalDetails?.homeState) {
      filledFields++;
    }
    if (student?.personalDetails?.homeCountry) {
      filledFields++;
    }
    if (student?.personalDetails?.pincode) {
      filledFields++;
    }
    if (student?.academicDetails?.length > 0) {
      filledFields++;
    }

    if (student?.professionalDetails?.experiences?.length > 0) {
      filledFields++;
    }
    if (student?.professionalDetails?.projects?.length > 0) {
      filledFields++;
    }
    if (student?.professionalDetails?.skills?.length > 0) {
      filledFields++;
    }
    if (student?.professionalDetails?.certifications?.length > 0) {
      filledFields++;
    }
    if (student?.documents?.resume) {
      filledFields++;
    }
    if (student?.documents?.photo) {
      filledFields++;
    }
    if (student?.documents?.aadhar) {
      filledFields++;
    }
    if (student?.documents?.allDocument) {
      filledFields++;
    }
    // Calculate the filled percentage
    const filledPercentage = (filledFields / totalFields) * 100;
    return res.status(StatusCodes.OK).json({
      filledPercentage: filledPercentage.toFixed(2),
    });
  } catch (error) {
    next(error);
  }
};

export {
  applyToJobDrive,
  getStudentById,
  getStudentByIdInCSV,
  getCompany,
  getCompanyById,
  getJob,
  getJobById,
  getStats,
  getJobsCalendar,
  calculateProfileFilledPercentage,
};

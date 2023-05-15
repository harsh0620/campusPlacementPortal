import { StatusCodes } from "http-status-codes";
import { NotFoundError, UnAuthenticatedError } from "../errors/index.js";
import Admin from "../models/admin.js";
import Student from "../models/students.js";
import JobDrive from "../models/jobDrive.js";
import Students from "../models/students.js";
import nodemailer from "nodemailer";
import Company from "../models/Company.js";

/**

@desc Get all companies based on query parameters
@route GET /api/v1/admin/students
@access Private
*/
// Define an asynchronous function called getAllCompanies that takes in three parameters: req, res, and next
const getAllStudents = async (req, res, next) => {
  try {
    // Extract the userId property from the request object
    const userId = req.user.userId;

    // Check if the authenticated user is a admin; if so, throw an UnAuthenticatedError
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
      company,
      cgpa,
    } = req.body;

    // Define the filter object for the search query
    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (email) {
      filter.email = { $regex: email, $options: "i" };
    }

    if (enrollmentNo) {
      filter.enrollmentNo = { $regex: enrollmentNo, $options: "i" };
    }

    if (gender) {
      filter.gender = gender;
    }

    if (stream) {
      filter.stream = stream;
    }

    if (verified) {
      filter.verified = verified;
    }

    if (selected) {
      filter.selected = selected;
    }

    if (yearOfPassing) {
      filter.yearOfPassing = yearOfPassing;
    }
    if (cgpa) {
      filter.cgpa = cgpa;
    }

    if (company) {
      filter.company = { $regex: company, $options: "i" };
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

const getStudents = async (req, res, next) => {
  try {
    // Extract the userId property from the request object
    const userId = req.user.userId;

    // Check if the authenticated user is a admin; if so, throw an UnAuthenticatedError
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
      selectedIn,
      cgpa,
    } = req.query;
    console.log(req.query);
    const query = {};

    if (name) {
      query["personalDetails.name"] = { $regex: name, $options: "i" };
    }
    if (email) {
      query["personalDetails.email"] = { $regex: email, $options: "i" };
    }
    if (enrollmentNo) {
      query["personalDetails.enrollmentNo"] = {
        $regex: enrollmentNo,
        $options: "i",
      };
    }
    if (gender) {
      query["personalDetails.gender"] = { $regex: gender, $options: "i" };
    }
    if (yearOfPassing) {
      query["academicDetails"] = {
        $elemMatch: { yearOfPassing: { $regex: yearOfPassing, $options: "i" } },
      };
    }
    if (stream) {
      query["academicDetails"] = {
        $elemMatch: { stream: { $regex: stream, $options: "i" } },
      };
    }
    if (cgpa) {
      query["academicDetails"] = {
        $elemMatch: { "result.value": { $gte: cgpa } },
      };
    }
    if (verified !== undefined) {
      query["verified"] = verified;
    }
    console.log(query);
    const students = await Student.find(query)
      .select(
        "personalDetails.name personalDetails.enrollmentNo academicDetails.stream verified placementDetails.selected"
      )
      .populate({
        path: "placementDetails.selectedIn.company",
        select: "name",
      });

    res.status(StatusCodes.OK).json({
      students,
    });
  } catch (error) {
    // Pass any caught errors to the error handling middleware
    next(error);
  }
};

/**
@desc Verify or unverify a student's account
@route PUT /api/v1/admin/verifyStudent/:studentId
@access Private (only accessible to admin users)
*/
// Define an asynchronous function called verifyStudent that takes in three parameters: req, res, and next
const verifyStudent = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    // Check if the user performing the action is an admin user
    const ifAdmin = await Admin.findOne({ _id: userId });
    if (!ifAdmin) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform this action"
      );
    }
    // Retrieve the student ID from the request parameters
    const studentId = req.params.studentId;
    // Find the student in the database using the studentId ID stored in the request object
    const student = await Students.findOne({ _id: studentId });
    if (!student) {
      throw new NotFoundError(`No student with id :${studentId}`);
    }
    // Toggle the verified status of the student's account
    var flag = student.verified;
    student.verified = !student.verified;
    // Save the updated student object in the database
    await student.save();
    // Return a success message with the updated verification status of the student's account
    return res.status(StatusCodes.OK).json({
      message: ` Student ${!flag ? "verified" : "unverified"} successfully`,
    });
  } catch (err) {
    next(err);
  }
};

/**
@desc Update an existing admin user's profile
@route PUT /api/v1/admin/verifyJobDrive/:jobDriveId
@access Private
*/
// Define an asynchronous function called verifyJobDrive that takes in three parameters: req, res and next
const verifyJobDrive = async (req, res, next) => {
  try {
    // Extract the user ID from the request object
    const userId = req.user.userId;
    // Find the admin user in the database using the user ID
    const ifAdmin = await Admin.findOne({ _id: userId });
    if (!ifAdmin) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform this action"
      );
    }
    // Extract the job drive ID from the request object
    const jobDriveId = req.params.jobDriveId;
    // Find the job drive in the database using the job drive ID
    const jobDrive = await JobDrive.findOne({ _id: jobDriveId });
    if (!jobDrive) {
      throw new NotFoundError(`No job drive with ID: ${jobDriveId}`);
    }
    // Update the job drive's verified status
    var flag = jobDrive.verified;
    jobDrive.verified = !jobDrive.verified;
    // Save the updated job drive object in the database
    await jobDrive.save();
    // Send a response indicating that the job drive's verified status was updated successfully
    return res.status(StatusCodes.OK).json({
      message: `Job drive ${!flag ? "verified" : "unverified"} successfully`,
    });
  } catch (err) {
    // Call the error handling middleware function
    next(err);
  }
};
/**
@desc This function converts a JSON object into an HTML string.
It loops through the properties of the JSON object, selects desired properties,
sorts them alphabetically, and creates an HTML string for each selected property.
The resulting HTML string is returned.
@param {Object} jsonData - A JSON object to convert to HTML.
@returns {String} - An HTML string representing the JSON object.
*/
function jsonToHtml(jsonData) {
  // Start building the HTML string with a div tag
  let html = "<div>";

  // Extract the desired properties and sort them alphabetically
  const properties = Object.keys(jsonData).filter((prop) => {
    return [
      "company",
      "designations",
      "locations",
      "streams",
      "program",
      "eligibilityCriteria",
      "startDate",
      "lastDate",
      "driveDate",
      "packageValue",
      "description",
      "pdfLink",
    ].includes(prop);
  });

  // Loop through the sorted properties and create the HTML
  properties.forEach((prop) => {
    let value = jsonData[prop];

    if (prop === "packageValue") {
      // If the property is packageValue, format the value as a string
      value = `Min: ${jsonData.packageValue.min} Max: ${jsonData.packageValue.max}`;
    }

    if (prop === "eligibilityCriteria") {
      // If the property is eligibilityCriteria, format the value as a paragraph tag
      value = `<p>Backlog: ${jsonData.eligibilityCriteria.backlog} CGPA: ${jsonData.eligibilityCriteria.cgpa}</p>`;
    }

    // Add a header tag and the property value to the HTML string
    html += `<h1>${prop.toUpperCase()}:</h1><p> ${value}</p>`;
  });

  // Close the div tag and return the final HTML string
  html += "</div>";
  return html;
}
/**
 * @desc @desc This function sends an email to a Google group with information about a job drive.
    It extracts the user ID from the request object and finds the admin user in the database using the user ID.
    If the user is not an admin, an error is thrown.
    It extracts the job drive ID from the request object and finds the job drive in the database using the job drive ID.
    If no job drive is found, an error is thrown.
    It converts the job drive object to an object and replaces the company ID with the company name.
    It creates an HTML string using the jsonToHtml function.
    It sets up an email transport object using nodemailer and sends the email to the specified Google group.
    If the email fails to send, an error is logged.
    If the email sends successfully, a response is sent indicating that the email was sent successfully.
    @param {Object} req - The request object.
    @param {Object} res - The response object.
    @param {Function} next - The next middleware function.
    @returns {Object} - A response indicating that the email was sent successfully.
 * @route PUT /api/v1/admin/sendMail/:jobDriveId
 * @access Private
 */
// Define an asynchronous function called sendMailToGoogleGroups that takes in three parameters: req, res and next
const sendMailToGoogleGroups = async (req, res, next) => {
  try {
    // Extract the user ID from the request object
    const userId = req.user.userId;

    // Find the admin user in the database using the user ID
    const ifAdmin = await Admin.findOne({ _id: userId });

    // If no admin user is found, throw an error
    if (!ifAdmin) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform this action"
      );
    }
    const { fromEmail, toEmail, mailSubject } = req.body;
    if (!fromEmail || !toEmail || !mailSubject) {
      throw new BadRequestError("Please provide all the required fields");
    }
    // Extract the job drive ID from the request object
    const jobDriveId = req.params.jobDriveId;

    // Find the job drive in the database using the job drive ID
    const jobDrive = await JobDrive.findOne({ _id: jobDriveId });

    // If no job drive is found, throw an error
    if (!jobDrive) {
      throw new NotFoundError(`No job drive with ID: ${jobDriveId}`);
    }

    // Convert the job drive object to a plain JavaScript object
    const jobDriveObj = jobDrive.toObject();

    // Find the company associated with the job drive
    const companyName = await Company.findOne({
      _id: jobDriveObj.company,
    });

    // Update the jobDriveObj company property with the company name
    jobDriveObj.company = companyName.name;

    // Create a nodemailer transporter object with the defined credentials
    const transporter = nodemailer.createTransport({
      service: process.env.NODEMAILER_SERVICE,
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASS,
      },
    });

    // Use the jsonToHtml function to generate the HTML email body from the job drive object
    let htmlBody = jsonToHtml(jobDriveObj);
    // setup email data with unicode symbols
    const mailOptions = {
      from: fromEmail, // sender address
      to: toEmail, // list of receivers
      subject: mailSubject, // Subject line
      html: htmlBody,
    };

    //send mail with defined transport object
    const reply = transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        // Send a response indicating that the job drive's verified status was updated successfully
        return res.status(StatusCodes.OK).json({
          message: "Mail sent successfully",
        });
      }
    });
  } catch (err) {
    // Call the error handling middleware function
    next(err);
  }
};

const sendMessage = (req, res, next) => {
  try {
    console.log("req.body", req.body);
  } catch (error) {
    next(error);
  }
};
const getStudentById = async (req, res, next) => {
  try {
    const adminId = req.user.userId;
    const admin = await Admin.findOne({ _id: adminId });
    if (!admin) {
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
//Send mail to specific student
const sendMailToSelectedStudent = async (req, res, next) => {
  try {
    const adminId = req.user.userId;
    const admin = await Admin.findOne({ _id: adminId });
    if (!admin) {
      throw new UnAuthenticatedError(
        "You are not authorized to perform this action"
      );
    }
    const studentId = req.params.studentId;
    const student = await Student.findOne({ _id: studentId });
    if (!student) {
      throw new NotFoundError(`No student with ID: ${studentId}`);
    }
    await sendMail({
      fromEmail: admin.email,
      toEmail: student.email,
      mailSubject: `Mail from ${admin.name}`,
      senderDetails: {
        name: admin.name,
        email: admin.email,
      },
      receiverDetails: {
        name: student.name,
        email: student.email,
      },
      mailBody: `
      <div>
      <h1>Message from ${admin?.name}</h1>
      <p>${req?.body?.message}</p>
      </div>`,
    });
  } catch (error) {
    next(error);
  }
};
export {
  verifyStudent,
  verifyJobDrive,
  sendMailToGoogleGroups,
  sendMessage,
  getStudents,
  getStudentById,
  sendMailToSelectedStudent,
};

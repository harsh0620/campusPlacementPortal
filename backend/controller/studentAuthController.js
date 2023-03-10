import Student from "../models/students.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import Company from "../models/Company.js";
import Admin from "../models/admin.js";

/**
 * @desc Register a new student user
 * @route POST /api/v1/student/auth/register
 * @access Public
 */
// Define an asynchronous function called register student that takes in three parameters: req, res, and next
const registerStudent = async (req, res, next) => {
  try {
    // Extract the name, email,enrollmentNo, and password properties from the request body using destructuring
    const { enrollmentNo, name, email, password } = req.body;
    // Check if all the required fields are present
    if (!name || !email || !password || !enrollmentNo) {
      // If any of the fields are missing, throw a BadRequestError with an error message
      throw new BadRequestError("Please provide all values. ");
    }
    // Check if an student with the same email already exists in the database
    const studentAlreadyExistsEmail = await Student.findOne({ email });
    const studentAlreadyExistsEnrollment = await Student.findOne({
      enrollmentNo,
    });
    if (studentAlreadyExistsEmail || studentAlreadyExistsEnrollment) {
      // If an student with the same email exists, throw a BadRequestError with an error message
      throw new BadRequestError("An student with this email already exists");
    }
    const newStudent = {
      name,
      email,
      password,
      enrollmentNo,
    };
    // If the student does not exist, create a new student object in the database with the provided name, email,enrollmentNo, and password
    const student = await Student.create({ personalDetails: newStudent });
    // Generate a JSON web token (JWT) for the newly created student
    const token = student.createJWT();
    // Send a response to the client with a 201 (Created) status code, including the student's email and name, and the generated token
    res.status(StatusCodes.CREATED).json({
      student: {
        email: student.personalDetails.email,
        name: student.personalDetails.name,
        enrollmentNo: student.personalDetails.enrollmentNo,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Login an existing student user
 * @route POST /api/v1/auth/student/login
 * @access Public
 */
// Define an asynchronous function called loginstudent that takes in two parameters: req and res
const loginStudent = async (req, res, next) => {
  try {
    // Extract the email and password properties from the request body using destructuring
    const { email, password } = req.body;
    // Check if both email and password fields are present
    if (!email || !password) {
      // If either email or password fields are missing, throw a BadRequestError with an error message
      throw new BadRequestError("Please provide all values");
    }
    // Check if an student with the given email exists in the database
    const student = await Student.findOne({
      "personalDetails.email": email,
    }).select("+personalDetails.password");
    if (!student) {
      // If no student is found, throw an UnAuthenticatedError with an error message
      throw new UnAuthenticatedError("Invalid Credentials");
    }
    // Check if the provided password matches the password stored in the database for the student
    const isPasswordCorrect = await student.comparePassword(password);
    if (!isPasswordCorrect) {
      // If the password is incorrect, throw an UnAuthenticatedError with an error message
      throw new UnAuthenticatedError("Invalid Credentials");
    }
    // Generate a JSON web token (JWT) for the authenticated student
    const token = student.createJWT();
    // Remove the password field from the student object to prevent it from being sent to the client
    student.password = undefined;
    // Send a response to the client with a 200 (OK) status code, including the authenticated student object and the generated token
    res.status(StatusCodes.OK).json({
      student: {
        email: student.personalDetails.email,
        name: student.personalDetails.name,
        enrollmentNo: student.personalDetails.enrollmentNo,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};
/**

@desc Update an existing student user's personal details
@route PUT /api/v1/student/updatePersonalDetailsStudent
@access Private
*/
// Define an asynchronous function called updatePersonalDetailsStudent that takes in three parameters: req, res, next
const updatePersonalDetailsStudent = async (req, res, next) => {
  try {
    // Find the student user in the database using the user ID stored in the request object
    const userId = req.user.userId;
    // Check if the user is a student
    const ifCompany = await Company.findOne({ _id: userId });
    if (ifCompany) {
      // If the user is not a student, throw an UnAuthenticatedError with an error message
      throw new UnAuthenticatedError("You are not a student");
    }

    // Check if the user is an admin
    const ifAdmin = await Admin.findOne({ _id: userId });
    if (ifAdmin) {
      // If the user is an admin, update the student specified in the request body
      userId = req.body.studentId;
    }

    // Extract the email, name, and enrollment number properties from the request body using destructuring
    const { email, name, enrollmentNo } = req.body;

    // Check if all the required fields are present
    if (!email || !name || !enrollmentNo) {
      // If any of the fields are missing, throw a BadRequestError with an error message
      throw new BadRequestError("Please provide all values");
    }

    // Find the student user in the database using the user ID stored in the request object
    const student = await Student.findOne({ _id: userId }).select(
      "+personalDetails.password"
    );

    // If no student is found with the provided user ID, throw a NotFoundError with an error message
    if (!student) {
      throw new NotFoundError(`No student with id :${userId}`);
    }

    // Set the password field of the request body to the current password value of the student user
    req.body.password = student.personalDetails.password;

    // Update the student user's personal details in the database
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: userId },
      { personalDetails: req.body },
      {
        new: true, // Return the updated student user object
        runValidators: true, // Run model validators on the updated object
      }
    );

    if (ifAdmin) {
      // If the user is an admin, send a response to the client with a 200 (OK) status code, including the updated student object
      res.status(StatusCodes.OK).json({
        student: updatedStudent.personalDetails,
      });
    } else {
      // Generate a new JSON web token (JWT) for the updated student object
      const token = updatedStudent.createJWT();

      // Send a response to the client with a 200 (OK) status code, including the updated student object and the new JWT token
      res.status(StatusCodes.OK).json({
        student: updatedStudent.personalDetails,
        token,
      });
    }
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

/**
 * @desc Update an existing student user's academic details
 * @route PUT /api/v1/student/updateAcademicDetailsStudent
 * @access Private
 */
// Define an asynchronous function called updateAcademicDetailsStudent that takes in three parameters: req, res, next
const updateAcademicDetailsStudent = async (req, res, next) => {
  try {
    // Find the student user in the database using the user ID stored in the request object
    const userId = req.user.userId;

    // Check if the user is a student
    const ifCompany = await Company.findOne({ _id: userId });
    if (ifCompany) {
      // If the user is not a student, throw an UnAuthenticatedError with an error message
      throw new UnAuthenticatedError("You are not a student");
    }

    // Check if the user is an admin
    const ifAdmin = await Admin.findOne({ _id: userId });
    if (ifAdmin) {
      // If the user is an admin, update the student specified in the request body
      userId = req.body.studentId;
    }

    // Find the student with the specified user ID and select the password field
    const student = await Student.findOne({ _id: userId }).select(
      "+personalDetails.password"
    );

    // If no student is found with the provided user ID, throw a NotFoundError with an error message
    if (!student) {
      throw new NotFoundError(`No student with id :${userId}`);
    }

    // Set the password field of the request body to the current password value of the student user
    req.body.password = student.personalDetails.password;

    // Update the student user's academic details in the database
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: userId },
      { academicDetails: req.body },
      {
        new: true, // Return the updated student user object
        runValidators: true, // Run model validators on the updated object
      }
    );

    if (ifAdmin) {
      // If the user is an admin, send a response to the client with a 200 (OK) status code, including the updated student object
      res.status(StatusCodes.OK).json({
        student: updatedStudent.academicDetails,
      });
    } else {
      // Generate a new JSON web token (JWT) for the updated student object
      const token = updatedStudent.createJWT();

      // Send a response to the client with a 200 (OK) status code, including the updated student object and the new JWT token
      res.status(StatusCodes.OK).json({
        student: updatedStudent.academicDetails,
        token,
      });
    }
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

/**
@desc Update an existing student user's professional details
@route PUT /api/v1/student/updateProfessionalDetailsStudent
@access Private
*/
// Define an asynchronous function called updateProfessionalDetailsStudent that takes in three parameters: req, res, and next
const updateProfessionalDetailsStudent = async (req, res, next) => {
  try {
    // Find the student user in the database using the user ID stored in the request object
    const userId = req.user.userId;
    // Check if the user is a student
    const ifCompany = await Company.findOne({ _id: userId });
    if (ifCompany) {
      // If the user is not a student, throw an UnAuthenticatedError with an error message
      throw new UnAuthenticatedError("You are not a student");
    }

    // Check if the user is an admin
    const ifAdmin = await Admin.findOne({ _id: userId });
    if (ifAdmin) {
      // If the user is an admin, update the student specified in the request body
      userId = req.body.studentId;
    }
    // Find the student in the database by ID and select their password
    const student = await Student.findOne({ _id: userId }).select(
      "+personalDetails.password"
    );
    // Throw a NotFoundError if the student is not found
    if (!student) {
      throw new NotFoundError(`No student with id :${userId}`);
    }
    // Set the password in the request body to the student's current password
    req.body.password = student.personalDetails.password;
    // Update the student's professional details in the database with the data from the request body
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: userId },
      { professionalDetails: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    // If the user is an admin, send a response to the client with a 200 (OK) status code, including the updated student object's professional details
    if (ifAdmin) {
      res.status(StatusCodes.OK).json({
        student: updatedStudent.professionalDetails,
      });
    } else {
      // Generate a new JSON web token (JWT) for the updated student object
      const token = updatedStudent.createJWT();
      // Send a response to the client with a 200 (OK) status code, including the updated student object's professional details and the new JWT token
      res.status(StatusCodes.OK).json({
        student: updatedStudent.professionalDetails,
        token,
      });
    }
  } catch (err) {
    // Pass any errors to the next middleware function
    next(err);
  }
};

/**
@desc Update an existing student user's document details
@route PUT /api/v1/student/documentDetails
@access Private
*/

// Define an asynchronous function called updateDocumentStudent that takes in three parameters: req, res, and next
const updateDocumentStudent = async (req, res, next) => {
  try {
    // Find the student user in the database using the user ID stored in the request object
    const userId = req.user.userId;
    // Check if the user is a student
    const ifCompany = await Company.findOne({ _id: userId });
    if (ifCompany) {
      // If the user is not a student, throw an UnAuthenticatedError with an error message
      throw new UnAuthenticatedError("You are not a student");
    }

    // Check if the user is an admin
    const ifAdmin = await Admin.findOne({ _id: userId });
    if (ifAdmin) {
      // If the user is an admin, update the student specified in the request body
      userId = req.body.studentId;
    }
    // Find the student user in the database using the user ID stored in the request object and select the password field
    const student = await Student.findOne({ _id: userId }).select(
      "+personalDetails.password"
    );
    if (!student) {
      // If no student is found, throw a NotFoundError with an error message
      throw new NotFoundError(`No student with id :${userId}`);
    }
    // Set the password field in the request body to the password field of the found student object
    req.body.password = student.personalDetails.password;
    // Update the student object with the document details specified in the request body
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: userId },
      { documents: req.body },
      {
        new: true, // Return the modified document rather than the original
        runValidators: true, // Validate the request body before updating the document
      }
    );
    if (ifAdmin) {
      // If the user is an admin, send a response to the client with a 200 (OK) status code, including the updated student object's document details
      res.status(StatusCodes.OK).json({
        student: updatedStudent.documents,
      });
    } else {
      // Generate a new JSON web token (JWT) for the updated student object
      const token = updatedStudent.createJWT();
      // Send a response to the client with a 200 (OK) status code, including the updated student object's document details and the new JWT token
      res.status(StatusCodes.OK).json({
        student: updatedStudent.documents,
        token,
      });
    }
  } catch (err) {
    // Call the error handling middleware function
    next(err);
  }
};

export {
  registerStudent,
  loginStudent,
  updatePersonalDetailsStudent,
  updateAcademicDetailsStudent,
  updateProfessionalDetailsStudent,
  updateDocumentStudent,
};

import Student from "../models/students.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";

/**
 * @desc Register a new student user
 * @route POST /api/v1/student/auth/register
 * @access Public
 */
// Define an asynchronous function called registerstudent that takes in three parameters: req, res, and next
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
    // If the student does not exist, create a new student object in the database with the provided name, email, and password
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
    console.log(student);
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
 * @desc Update an existing student user's updatePersonalDetailsStudent
 * @route PUT /api/v1/student/updatePersonalDetailsStudent
 * @access Private
 */
// Define an asynchronous function called updateUser that takes in two parameters: req and res
const updatePersonalDetailsStudent = async (req, res, next) => {
  try {
    // Extract the email, name, gender, designation, phone, and aadharno properties from the request body using destructuring
    const { email, name, enrollmentNo } = req.body;
    // Check if all the required fields are present
    if (!email || !name || !enrollmentNo) {
      // If any of the fields are missing, throw a BadRequestError with an error message
      throw new BadRequestError("Please provide all values");
    }
    // Find the user in the database using the user ID stored in the request object
    //@TO_CHANGE
    const userId = "6408920cbbcb37ac977fc4b3";
    const student = await Student.findOne({ _id: userId }).select(
      "+personalDetails.password"
    );
    if (!student) {
      throw new NotFoundError(`No student with id :${userId}`);
    }
    req.body.password = student.personalDetails.password;
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: userId },
      { personalDetails: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    // Generate a new JSON web token (JWT) for the updated student object
    const token = updatedStudent.createJWT();
    // Send a response to the client with a 200 (OK) status code, including the updated student object and the new JWT token
    res.status(StatusCodes.OK).json({
      student: {
        name: updatedStudent.personalDetails.name,
        email: updatedStudent.personalDetails.email,
        enrollmentNo: updatedStudent.personalDetails.enrollmentNo,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Update an existing student user's updatePersonalDetailsStudent
 * @route PUT /api/v1/student/updatePersonalDetailsStudent
 * @access Private
 */
// Define an asynchronous function called updateUser that takes in two parameters: req and res
const updateAcademicDetailsStudent = async (req, res, next) => {
  try {
    // Find the user in the database using the user ID stored in the request object
    //@TO_CHANGE
    const userId = "6408920cbbcb37ac977fc4b3";
    const student = await Student.findOne({ _id: userId }).select(
      "+personalDetails.password"
    );
    if (!student) {
      throw new NotFoundError(`No student with id :${userId}`);
    }
    req.body.password = student.personalDetails.password;
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: userId },
      { academicDetails: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    // Generate a new JSON web token (JWT) for the updated student object
    const token = updatedStudent.createJWT();
    // Send a response to the client with a 200 (OK) status code, including the updated student object and the new JWT token
    res.status(StatusCodes.OK).json({
      student: updatedStudent.academicDetails,
      token,
    });
  } catch (err) {
    next(err);
  }
};
/**
 * @desc Update an existing student user's updatePersonalDetailsStudent
 * @route PUT /api/v1/student/updateProfessionalDetailsStudent
 * @access Private
 */
// Define an asynchronous function called updateUser that takes in two parameters: req and res
const updateProfessionalDetailsStudent = async (req, res, next) => {
  try {
    // Find the user in the database using the user ID stored in the request object
    //@TO_CHANGE
    const userId = "6408920cbbcb37ac977fc4b3";
    const student = await Student.findOne({ _id: userId }).select(
      "+personalDetails.password"
    );
    if (!student) {
      throw new NotFoundError(`No student with id :${userId}`);
    }
    req.body.password = student.personalDetails.password;
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: userId },
      { professionalDetails: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    // Generate a new JSON web token (JWT) for the updated student object
    const token = updatedStudent.createJWT();
    // Send a response to the client with a 200 (OK) status code, including the updated student object and the new JWT token
    res.status(StatusCodes.OK).json({
      professionalStudent: updatedStudent.professionalDetails,
      token,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Update an existing student user's updatePersonalDetailsStudent
 * @route PUT /api/v1/student/documentDetails
 * @access Private
 */
// Define an asynchronous function called updateUser that takes in two parameters: req and res
const updateDocumentStudent = async (req, res, next) => {
  try {
    // Find the user in the database using the user ID stored in the request object
    //@TO_CHANGE
    const userId = "6408920cbbcb37ac977fc4b3";
    const student = await Student.findOne({ _id: userId }).select(
      "+personalDetails.password"
    );
    if (!student) {
      throw new NotFoundError(`No student with id :${userId}`);
    }
    req.body.password = student.personalDetails.password;
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: userId },
      { documents: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    // Generate a new JSON web token (JWT) for the updated student object
    const token = updatedStudent.createJWT();
    // Send a response to the client with a 200 (OK) status code, including the updated student object and the new JWT token
    res.status(StatusCodes.OK).json({
      documents: updatedStudent.documents,
      token,
    });
  } catch (err) {
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

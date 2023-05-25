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
    const student = await Student.create({ name,
      email,
      password,
      enrollmentNo, });
    // Generate a JSON web token (JWT) for the newly created student
    const token = student.createJWT();
    // Send a response to the client with a 201 (Created) status code, including the student's email and name, and the generated token
    res.status(StatusCodes.CREATED).json({
      user: student,
      token,
    });
  } catch (err) {
    next(err);
  }
};
/**
@desc GET an existing student user's personal details
@route GET /api/v1/student/personalDetails
@access Private
*/
const getPersonalDetailsStudent = async (req, res, next) => {
  try {
    // Find the student user in the database using the user ID stored in the request object
    const userId = req.user.userId;
    // Check if the user is a company
    const ifCompany = await Company.findOne({ _id: userId });
    // Check if the user is an admin
    const ifAdmin = await Admin.findOne({ _id: userId });
    if (ifCompany || ifAdmin) {
      // If the user is not a student, throw an UnAuthenticatedError with an error message
      throw new UnAuthenticatedError("You are not authorized to perform this action");
    }
     // Find the student user in the database using the user ID stored in the request object
     const student = await Student.findOne({ _id: userId });

     // If no student is found with the provided user ID, throw a NotFoundError with an error message
     if (!student) {
       throw new NotFoundError(`No student with id :${userId}`);
     }
      // Send a response to the client with a 200 (OK) status code, including the updated student object and the new JWT token
      res.status(StatusCodes.OK).json({
        personalDetails: student?.personalDetails,
      });
    } catch (err) {
      // Pass any errors to the error handling middleware
      next(err);
    }
  };
/**
@desc Update an existing student user's personal details
@route PUT /api/v1/student/personalDetails
@access Private
*/
// Define an asynchronous function called updatePersonalDetailsStudent that takes in three parameters: req, res, next
const updatePersonalDetailsStudent = async (req, res, next) => {
  try {
    // Find the student user in the database using the user ID stored in the request object
    const userId = req.user.userId;
    // Check if the user is a company
    const ifCompany = await Company.findOne({ _id: userId });
    // Check if the user is an admin
    const ifAdmin = await Admin.findOne({ _id: userId });
    if (ifCompany || ifAdmin) {
      // If the user is not a student, throw an UnAuthenticatedError with an error message
      throw new UnAuthenticatedError("You are not authorized to perform this action");
    }
    // Find the student user in the database using the user ID stored in the request object
    const student = await Student.findOne({ _id: userId });

    // If no student is found with the provided user ID, throw a NotFoundError with an error message
    if (!student) {
      throw new NotFoundError(`No student with id :${userId}`);
    }

    // Update the student user's personal details in the database
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: userId },
      { personalDetails: req.body },
      {
        new: true, // Return the updated student user object
        runValidators: true, // Run model validators on the updated object
      }
    );
      // Generate a new JSON web token (JWT) for the updated student object
      const token = updatedStudent.createJWT();

      // Send a response to the client with a 200 (OK) status code, including the updated student object and the new JWT token
      res.status(StatusCodes.OK).json({
        personalDetails: updatedStudent?.personalDetails,
      });
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};

/**
@desc GET an existing student user's personal details
@route GET /api/v1/student/academicDetails
@access Private
*/
const getAcademicDetailsStudent = async (req, res, next) => {
  try {
    // Find the student user in the database using the user ID stored in the request object
    const userId = req.user.userId;
    // Check if the user is a company
    const ifCompany = await Company.findOne({ _id: userId });
    // Check if the user is an admin
    const ifAdmin = await Admin.findOne({ _id: userId });
    if (ifCompany || ifAdmin) {
      // If the user is not a student, throw an UnAuthenticatedError with an error message
      throw new UnAuthenticatedError("You are not authorized to perform this action");
    }
     // Find the student user in the database using the user ID stored in the request object
     const student = await Student.findOne({ _id: userId });

     // If no student is found with the provided user ID, throw a NotFoundError with an error message
     if (!student) {
       throw new NotFoundError(`No student with id :${userId}`);
     }
      // Send a response to the client with a 200 (OK) status code, including the updated student object and the new JWT token
      res.status(StatusCodes.OK).json({
        academicDetails: student?.academicDetails,
      });
    } catch (err) {
      // Pass any errors to the error handling middleware
      next(err);
    }
  };
/**
 * @desc Update an existing student user's academic details
 * @route PUT /api/v1/student/academicDetails
 * @access Private
 */
// Define an asynchronous function called updateAcademicDetailsStudent that takes in three parameters: req, res, next
const updateAcademicDetailsStudent = async (req, res, next) => {
  try {
    // Find the student user in the database using the user ID stored in the request object
    const userId = req.user.userId;
    // Check if the user is a student
    const ifCompany = await Company.findOne({ _id: userId });
    // Check if the user is an admin
    const ifAdmin = await Admin.findOne({ _id: userId });
    if (ifCompany || ifAdmin) {
      // If the user is not a student, throw an UnAuthenticatedError with an error message
      throw new UnAuthenticatedError("You are not authorized to perform this action");
    }
    // Find the student user in the database using the user ID stored in the request object
    const student = await Student.findOne({ _id: userId });

    // If no student is found with the provided user ID, throw a NotFoundError with an error message
    if (!student) {
      throw new NotFoundError(`No student with id :${userId}`);
    }
    // Update the student user's personal details in the database
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: userId },
      { academicDetails: req.body },
      {
        new: true, // Return the updated student user object
        runValidators: true, // Run model validators on the updated object
      }
    );

      // Send a response to the client with a 200 (OK) status code, including the updated student object and the new JWT token
      res.status(StatusCodes.OK).json({
        academicDetails: updatedStudent?.academicDetails,
      });
  } catch (err) {
    // Pass any errors to the error handling middleware
    next(err);
  }
};
/**
@desc GET an existing student user's personal details
@route GET /api/v1/student/professionalDetails
@access Private
*/
const getProfessionalDetailsStudent = async (req, res, next) => {
  try {
    // Find the student user in the database using the user ID stored in the request object
    const userId = req.user.userId;
    // Check if the user is a company
    const ifCompany = await Company.findOne({ _id: userId });
    // Check if the user is an admin
    const ifAdmin = await Admin.findOne({ _id: userId });
    if (ifCompany || ifAdmin) {
      // If the user is not a student, throw an UnAuthenticatedError with an error message
      throw new UnAuthenticatedError("You are not authorized to perform this action");
    }
     // Find the student user in the database using the user ID stored in the request object
     const student = await Student.findOne({ _id: userId });

     // If no student is found with the provided user ID, throw a NotFoundError with an error message
     if (!student) {
       throw new NotFoundError(`No student with id :${userId}`);
     }
      // Send a response to the client with a 200 (OK) status code, including the updated student object and the new JWT token
      res.status(StatusCodes.OK).json({
        professionalDetails: student?.professionalDetails,
      });
    } catch (err) {
      // Pass any errors to the error handling middleware
      next(err);
    }
  };
/**
@desc Update an existing student user's professional details
@route PUT /api/v1/student/professionalDetails
@access Private
*/
// Define an asynchronous function called updateProfessionalDetailsStudent that takes in three parameters: req, res, and next
const updateProfessionalDetailsStudent = async (req, res, next) => {
  try {
   // Find the student user in the database using the user ID stored in the request object
   const userId = req.user.userId;
   // Check if the user is a student
   const ifCompany = await Company.findOne({ _id: userId });
   // Check if the user is an admin
   const ifAdmin = await Admin.findOne({ _id: userId });
   if (ifCompany || ifAdmin) {
     // If the user is not a student, throw an UnAuthenticatedError with an error message
     throw new UnAuthenticatedError("You are not authorized to perform this action");
   }
   // Find the student user in the database using the user ID stored in the request object
   const student = await Student.findOne({ _id: userId });

   // If no student is found with the provided user ID, throw a NotFoundError with an error message
   if (!student) {
     throw new NotFoundError(`No student with id :${userId}`);
   }

   // Update the student user's personal details in the database
   const updatedStudent = await Student.findOneAndUpdate(
     { _id: userId },
     { professionalDetails: req.body },
     {
       new: true, // Return the updated student user object
       runValidators: true, // Run model validators on the updated object
     }
   );

     // Send a response to the client with a 200 (OK) status code, including the updated student object and the new JWT token
     res.status(StatusCodes.OK).json({
      professionalDetails: updatedStudent?.professionalDetails,
     });
  } catch (err) {
    // Pass any errors to the next middleware function
    next(err);
  }
};
/**
@desc GET an existing student user's personal details
@route GET /api/v1/student/documentDetails
@access Private
*/
const getDocumentDetailsStudent = async (req, res, next) => {
  try {
    // Find the student user in the database using the user ID stored in the request object
    const userId = req.user.userId;
    // Check if the user is a company
    const ifCompany = await Company.findOne({ _id: userId });
    // Check if the user is an admin
    const ifAdmin = await Admin.findOne({ _id: userId });
    if (ifCompany || ifAdmin) {
      // If the user is not a student, throw an UnAuthenticatedError with an error message
      throw new UnAuthenticatedError("You are not authorized to perform this action");
    }
     // Find the student user in the database using the user ID stored in the request object
     const student = await Student.findOne({ _id: userId });

     // If no student is found with the provided user ID, throw a NotFoundError with an error message
     if (!student) {
       throw new NotFoundError(`No student with id :${userId}`);
     }
      // Send a response to the client with a 200 (OK) status code, including the updated student object and the new JWT token
      res.status(StatusCodes.OK).json({
        documentDetails: student?.documentDetails,
      });
    } catch (err) {
      // Pass any errors to the error handling middleware
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
   // Check if the user is an admin
   const ifAdmin = await Admin.findOne({ _id: userId });
   if (ifCompany || ifAdmin) {
     // If the user is not a student, throw an UnAuthenticatedError with an error message
     throw new UnAuthenticatedError("You are not authorized to perform this action");
   }
   // Find the student user in the database using the user ID stored in the request object
   const student = await Student.findOne({ _id: userId });

   // If no student is found with the provided user ID, throw a NotFoundError with an error message
   if (!student) {
     throw new NotFoundError(`No student with id :${userId}`);
   }

   // Update the student user's personal details in the database
   const updatedStudent = await Student.findOneAndUpdate(
     { _id: userId },
     { documents: req.body },
     {
       new: true, // Return the updated student user object
       runValidators: true, // Run model validators on the updated object
     }
   );

     // Send a response to the client with a 200 (OK) status code, including the updated student object and the new JWT token
     res.status(StatusCodes.OK).json({
      documentDetails: updatedStudent?.documentDetails,
     });
  } catch (err) {
    // Call the error handling middleware function
    next(err);
  }
};

export {
  registerStudent,
  getPersonalDetailsStudent,
  updatePersonalDetailsStudent,
  getAcademicDetailsStudent,
  updateAcademicDetailsStudent,
  getProfessionalDetailsStudent,
  updateProfessionalDetailsStudent,
  getDocumentDetailsStudent,
  updateDocumentStudent,
};

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
@desc Create a new company
@route POST /api/v1/company/create
@access Private
*/
// Define an asynchronous function called createCompany that takes in three parameters: req, res, and next
const createCompany = async (req, res, next) => {
  try {
    // Extract the user ID from the request object
    const userId = req.user.userId;
    // Check if the user is an admin
    const ifAdmin = await Admin.findOne({ _id: userId });
    if (!ifAdmin) {
      // If the user is not an admin, throw an UnAuthenticatedError with an error message
      throw new UnAuthenticatedError(
        "You are not authorized to create a company"
      );
    }
    // Extract the necessary fields from the request body
    const {
      name,
      email,
      password,
      website,
      description,
      logo,
      linkedin,
      address,
      programs,
      streams,
      createdBy,
    } = req.body;
    // Extract the HR information from the request body
    const { hrName, hrEmail, hrPhone } = req.body;

    // Check if all required fields are provided
    if (
      !name ||
      !email ||
      !password ||
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
      // If any required field is missing, throw a BadRequestError with an error message
      throw new BadRequestError("Please provide all the required fields");
    }

    // Set the createdBy field of the request body to the user ID
    req.body.createdBy = req.user.userId;

    // Create a new HR instance using the HR information from the request body
    const newHr = {
      name: hrName,
      email: hrEmail,
      phone: hrPhone,
    };

    // Create a new company instance with the saved HR instance as the HR field
    const newCompany = new Company({
      name,
      email,
      password,
      website,
      description,
      logo,
      linkedin,
      address,
      createdBy,
      streams,
      programs,
      hr: newHr,
    });

    // Check if a company with the same name or email already exists in the database
    const companyWithEmail = await Company.find({ email });
    const companyWithName = await Company.find({ name });
    if (companyWithName.length > 0 || companyWithEmail.length > 0) {
      // If a company with the same name or email exists, throw a BadRequestError with an error message
      throw new BadRequestError("Company already exists");
    }

    // Save the company instance to the database
    const savedCompany = await Company.create(newCompany);

    // Send a response to the client with a 201 (Created) status code, including the newly created company object with selected fields
    res.status(StatusCodes.CREATED).json({
      company: {
        name: savedCompany.name,
        email: savedCompany.email,
        website: savedCompany.website,
        logo: savedCompany.logo,
        id: savedCompany._id,
      },
    });
  } catch (error) {
    // Call the next function with the error object
    next(error);
  }
};

/**

@desc Login an existing company
@route POST /api/v1/company/login
@access Public
*/
// Define an asynchronous function called loginCompany that takes in two parameters: req and res
const loginCompany = async (req, res, next) => {
  try {
    // Extract the email and password properties from the request body using destructuring
    const { email, password } = req.body;

    // Check if both email and password fields are present
    if (!email || !password) {
      // If either email or password fields are missing, throw a BadRequestError with an error message
      throw new BadRequestError("Please provide all values");
    }

    // Check if a Company with the given email exists in the database
    const company = await Company.findOne({ email }).select("+password");
    if (!company) {
      // If no company is found, throw an UnAuthenticatedError with an error message
      throw new UnAuthenticatedError("Invalid Credentials");
    }

    // Check if the provided password matches the password stored in the database for the company
    const isPasswordCorrect = await company.comparePassword(password);
    if (!isPasswordCorrect) {
      // If the password is incorrect, throw an UnAuthenticatedError with an error message
      throw new UnAuthenticatedError("Invalid Credentials");
    }

    // Generate a JSON web token (JWT) for the authenticated company
    const token = company.createJWT();

    // Remove the password field from the company object to prevent it from being sent to the client
    company.password = undefined;

    // Send a response to the client with a 200 (OK) status code, including the authenticated company object and the generated token
    res.status(StatusCodes.OK).json({ company, token });
  } catch (err) {
    // Pass any errors to the next middleware function in the chain
    next(err);
  }
};

/**

@desc Get all companies based on query parameters
@route GET /api/v1/company/all
@access Private
*/
// Define an asynchronous function called getAllCompanies that takes in three parameters: req, res, and next
const getAllCompanies = async (req, res, next) => {
  try {
    // Extract the userId property from the request object
    const userId = req.user.userId;

    // Check if the authenticated user is a company; if so, throw an UnAuthenticatedError
    const ifCompany = await Company.findOne({ _id: userId });
    if (ifCompany) {
      throw new UnAuthenticatedError(
        "You are not authorized to view all companies"
      );
    }

    // Extract the programs and streams query parameters from the request object using destructuring
    const { programs, streams } = req.query;

    let companies;

    // Check if both programs and streams query parameters are present; if so, find companies that match both criteria
    if (programs && streams) {
      companies = await Company.find({
        programs: { $in: programs.split(",") },
        streams: { $in: streams.split(",") },
      });
    }
    // Check if only programs query parameter is present; if so, find companies that match that criteria
    else if (programs) {
      companies = await Company.find({
        programs: { $in: programs.split(",") },
      });
    }
    // Check if only streams query parameter is present; if so, find companies that match that criteria
    else if (streams) {
      companies = await Company.find({ streams: { $in: streams.split(",") } });
    }
    // If no query parameters are present, return all companies
    else {
      companies = await Company.find();
    }

    // Send a response to the client with a 200 (OK) status code, including an array of company objects that match the query criteria
    res.status(StatusCodes.OK).json(companies);
  } catch (error) {
    // Pass any caught errors to the error handling middleware
    next(error);
  }
};

/**

@desc Get a single company by ID
@route GET /api/v1/company/:companyId
@access Private
*/
const getCompanyById = async (req, res, next) => {
  try {
    // Get the userId from the authenticated user
    const userId = req.user.userId;
    // Check if the authenticated user is also a company
    const ifCompany = await Company.findOne({ _id: userId });
    // If the authenticated user is a company and is not authorized to view other companies, throw an error
    if (ifCompany && req.params.companyId !== userId) {
      throw new UnAuthenticatedError(
        "You are not authorized to view this company"
      );
    }
    // Get the company with the given ID from the database
    const company = await Company.findById(req.params.companyId);
    // If no company is found, throw a NotFoundError with an error message
    if (!company) {
      throw new NotFoundError("Company not found");
    } else {
      // Otherwise, send the company object to the client with a 200 (OK) status code
      res.status(StatusCodes.OK).json(company);
    }
  } catch (error) {
    // If an error occurs, pass it to the error handling middleware
    next(error);
  }
};

/**

@desc Update a company by ID
@route PATCH /api/v1/company/edit/:companyId
@access Private
*/
const updateCompanyById = async (req, res, next) => {
  try {
    // Destructure the request body to get the values for updating the company
    const {
      name,
      email,
      password,
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
      !password ||
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

    // Get the companyId from the request parameters
    const companyId = req.params.companyId;

    // Find the company by ID
    const company = await Company.findOne({ _id: companyId });

    // If the company is not found, throw a NotFoundError
    if (!company) {
      throw new NotFoundError(`No company with id :${companyId}`);
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

    // Check if the user is a company and the companyId matches with the requested companyId.
    // If not, throw an UnAuthenticatedError
    const ifCompany = await Company.findOne({ _id: userId });
    if (ifCompany && userId !== companyId) {
      throw new UnAuthenticatedError(
        "You are not authorized to edit this company"
      );
    }

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

export {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  loginCompany,
};

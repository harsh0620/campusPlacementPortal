import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import Company from "../models/Company.js";
import checkPermissions from "../utils/checkPermissions.js";

/**
 * @desc Create company
 * @route POST /api/v1/company/create
 * @access Private
 */
const createCompany = async (req, res, next) => {
  try {
    await checkPermissions(req.user, "temp", next);
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
    const { hrName, hrEmail, hrPhone } = req.body;

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
      throw new BadRequestError("Please provide all the required fields");
    }
    //@TODO update the createdBy field
    // req.body.createdBy = req.user.userId;

    // Create a new HR instance
    const newHr = {
      name: hrName,
      email: hrEmail,
      phone: hrPhone,
    };

    // Save the HR instance to the database
    // const savedHr = await newHr.save();

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
    // @TO_CHANGE
    req.user.role = "admin";
    if (req.user.role !== "admin") {
      throw new BadRequestError("You are not authorized to create a company");
    }
    const companyWithEmail = await Company.find({ email });
    const companyWithName = await Company.find({ name });
    if (companyWithName.length > 0 || companyWithEmail.length > 0) {
      throw new BadRequestError("Company already exists");
    }
    // Save the company instance to the database
    const savedCompany = await Company.create(newCompany);
    // Generate a JSON web token (JWT) for the newly created savedCompany
    const token = savedCompany.createJWT();
    res.status(StatusCodes.CREATED).json({
      company: {
        name: savedCompany.name,
        email: savedCompany.email,
        website: savedCompany.website,
        logo: savedCompany.logo,
        id: savedCompany._id,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Login an existing company
 * @route POST /api/v1/company/login
 * @access Public
 */
// Define an asynchronous function called loginCompany that takes in two parameters: req and res
const loginCompany = async (req, res) => {
  try {
    // Extract the email and password properties from the request body using destructuring
    const { email, password } = req.body;

    // Check if both email and password fields are present
    if (!email || !password) {
      // If either email or password fields are missing, throw a BadRequestError with an error message
      throw new BadRequestError("Please provide all values");
    }

    // Check if an Company with the given email exists in the database
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
    next(err);
  }
};

/**
 * @desc Get all companies
 * @route GET /api/v1/company/all
 * @access Public
 */
const getAllCompanies = async (req, res) => {
  try {
    const { programs, streams } = req.query;
    let companies;
    if (programs && streams) {
      companies = await Company.find({
        programs: { $in: programs.split(",") },
        streams: { $in: streams.split(",") },
      });
    } else if (programs) {
      companies = await Company.find({
        programs: { $in: programs.split(",") },
      });
    } else if (streams) {
      companies = await Company.find({ streams: { $in: streams.split(",") } });
    } else {
      companies = await Company.find();
    }
    res.status(StatusCodes.OK).json(companies);
  } catch (error) {
    throw new BadRequestError(error.message);
  }
};

/**
 * @desc Get a single company by ID
 * @route GET /api/v1/company/:id
 * @access Public
 */
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      throw new NotFoundError("Company not found");
    } else {
      res.status(StatusCodes.OK).json(company);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get a single company by ID
 * @route PATCH /api/v1/company/edit/:id
 * @access Public
 */
const updateCompanyById = async (req, res, next) => {
  try {
    const { id: companyId } = req.params;
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
    const { hrName, hrEmail, hrPhone } = req.body;

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
      throw new BadRequestError("Please provide all the required fields");
    }
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw new NotFoundError(`No company with id :${companyId}`);
    }
    // @TO_CHANGE
    req.user.role = "admin";
    if (req.user.role !== "admin") {
      throw new UnAuthenticatedError(
        "You are not authorized to create a company"
      );
    }
    const updatedCompany = await Company.findOneAndUpdate(
      { _id: companyId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(StatusCodes.OK).json({ updatedCompany });
  } catch (error) {
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

import Admin from "../models/admin.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

/**
 * @desc Register a new admin user
 * @route POST /api/v1/auth/admin/register
 * @access Public
 */
// Define an asynchronous function called registerAdmin that takes in three parameters: req, res, and next
const registerAdmin = async (req, res, next) => {
  try {
    // Extract the name, email, and password properties from the request body using destructuring
    const { name, email, password } = req.body;

    // Check if all the required fields are present
    if (!name || !email || !password) {
      // If any of the fields are missing, throw a BadRequestError with an error message
      throw new BadRequestError("Please provide all values. ");
    }

    // Check if an admin with the same email already exists in the database
    const adminAlreadyExists = await Admin.findOne({ email });
    if (adminAlreadyExists) {
      // If an admin with the same email exists, throw a BadRequestError with an error message
      throw new BadRequestError("An admin with this email already exists");
    }

    // If the admin does not exist, create a new admin object in the database with the provided name, email, and password
    const admin = await Admin.create({ name, email, password });

    // Generate a JSON web token (JWT) for the newly created admin
    const token = admin.createJWT();

    // Send a response to the client with a 201 (Created) status code, including the admin's email and name, and the generated token
    res.status(StatusCodes.CREATED).json({
      admin: {
        email: admin.email,
        name: admin.name,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Update an existing admin user's profile
 * @route PUT /api/v1/auth/admin/profile
 * @access Private
 */
// Define an asynchronous function called updateUser that takes in two parameters: req and res
const updateAdmin = async (req, res) => {
  try {
    // Extract the email, name, gender, designation, phone, and aadharno properties from the request body using destructuring
    const { email, name, gender, designation, phone, aadharno } = req.body;

    // Check if all the required fields are present
    if (!email || !name || !gender || !designation || !phone || !aadharno) {
      // If any of the fields are missing, throw a BadRequestError with an error message
      throw new BadRequestError("Please provide all values");
    }

    // Find the user in the database using the user ID stored in the request object
    //@TO_CHANGE
    const userId = "64047f984f4d420bffcf429a";
    const user = await Admin.findOne({ _id: userId });

    // Update the user's email, name, gender, designation, phone, and aadharno properties with the values from the request body
    user.email = email;
    user.name = name;
    user.gender = gender;
    user.designation = designation;
    user.phone = phone;
    user.aadharno = aadharno;

    // Save the updated user object in the database
    await user.save();

    // Generate a new JSON web token (JWT) for the updated user object
    const token = user.createJWT();

    // Send a response to the client with a 200 (OK) status code, including the updated user object and the new JWT token
    res.status(StatusCodes.OK).json({
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

export { registerAdmin, updateAdmin };

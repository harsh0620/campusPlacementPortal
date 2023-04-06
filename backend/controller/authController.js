import Admin from "../models/admin.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";

/**
 * @desc Login an existing user
 * @route POST /api/v1/auth/login
 * @access Public
 */
const loginUser = async (req, res, next) => {
  console.log("loginUser", req.body);
  try {
    // Extract the email and password properties from the request body using destructuring
    const { email, password, userType } = req.body;

    // Check if both email, password and userType fields are present
    if (!email || !password || !userType) {
      // If either email, password or userType fields are missing, throw a BadRequestError with an error message
      throw new BadRequestError("Please provide all values");
    }

    let user;
    switch (userType) {
      case "admin":
        // Check if an admin with the given email exists in the database
        user = await Admin.findOne({ email }).select("+password");
        break;
      case "student":
        // Check if a student with the given email exists in the database
        user = await Student.findOne({ email }).select("+password");
        break;
      case "company":
        // Check if a company with the given email exists in the database
        user = await Company.findOne({ email }).select("+password");
        break;
      default:
        // If an invalid userType is provided, throw a BadRequestError with an error message
        throw new BadRequestError("Invalid user type");
    }

    if (!user) {
      // If no user is found, throw an UnAuthenticatedError with an error message
      throw new UnAuthenticatedError("Invalid Credentials");
    }
    console.log(user);
    // Check if the provided password matches the password stored in the database for the user
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      // If the password is incorrect, throw an UnAuthenticatedError with an error message
      throw new UnAuthenticatedError("Invalid Credentials");
    }

    // Generate a JSON web token (JWT) for the authenticated user
    const token = user.createJWT();

    // Remove the password field from the user object to prevent it from being sent to the client
    user.password = undefined;

    // Send a response to the client with a 200 (OK) status code, including the authenticated user object and the generated token
    res.status(StatusCodes.OK).json({ user, token });
  } catch (err) {
    next(err);
  }
};

export { loginUser };

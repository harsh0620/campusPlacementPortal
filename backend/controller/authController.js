import Admin from "../models/admin.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import Company from "../models/Company.js";
import Student from "../models/students.js";

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

const changePassword = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    let user;
    const admin = await Admin.findOne({ _id: userId }).select("+password");
    const company = await Company.findOne({ _id: userId }).select("+password");
    const student = await Student.findOne({ _id: userId }).select("+password");
    if (!admin && !company && !student) {
      throw new BadRequestError(
        "Invalid Request, Please login again to change password"
      );
    }
    if (admin) {
      if (admin._id.toString() !== userId) {
        throw new UnAuthenticatedError(
          "You are not authorized to change password of this user"
        );
      }
      user = admin;
    }
    if (company) {
      if (company._id.toString() !== userId) {
        throw new UnAuthenticatedError(
          "You are not authorized to change password of this user"
        );
      }
      user = company;
    }
    if (student) {
      if (student._id.toString() !== userId) {
        throw new UnAuthenticatedError(
          "You are not authorized to change password of this user"
        );
      }
      user = student;
    }
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      throw new BadRequestError("Please provide all values");
    }
    if (newPassword !== confirmPassword) {
      throw new BadRequestError("Passwords do not match");
    }
    // Check if the provided password matches the password stored in the database for the user
    const password = oldPassword;
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      // If the password is incorrect, throw an UnAuthenticatedError with an error message
      throw new UnAuthenticatedError("Wrong password");
    }
    // Update the user's password with the new password
    user.password = newPassword;
    // Save the updated user object in the database
    await user.save();
    const token = user.createJWT();
    // Remove the password field from the user object to prevent it from being sent to the client
    user.password = undefined;
    // Send a response to the client with a 200 (OK) status code, including the updated user object
    res.status(StatusCodes.OK).json({
      message: "Password changed successfully",
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
};
export { loginUser, changePassword };

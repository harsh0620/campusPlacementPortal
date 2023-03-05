import { UnAuthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

// Middleware function to verify the JWT token
const auth = async (req, res, next) => {
  // Get the Authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists or starts with Bearer
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication invalid");
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using JWT and the secret key
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID to the request object
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    // If the token verification fails, throw an error
    throw new UnAuthenticatedError("Authentication invalid");
  }
};

export default auth;

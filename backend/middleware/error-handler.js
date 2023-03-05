import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, // if statusCode is not defined, set it to internal server error
    msg: err.message || "Something went wrong,try again later", // if msg is not defined, set it to a default message
  };
  if (err.name === "ValidationError") {
    // if the error is a validation error
    defaultError.statusCode = StatusCodes.BAD_REQUEST; // set the status code to bad request
    defaultError.msg = Object.values(err.errors) // get all the error messages
      .map((item) => item.message)
      .join(",");
  }
  if (err.code && err.code === 11000) {
    // if the error is due to duplicate key
    defaultError.statusCode = StatusCodes.BAD_REQUEST; // set the status code to bad request
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }
  // send the error message as a response
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;

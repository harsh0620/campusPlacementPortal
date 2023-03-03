import Example from "../models/Example.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

/*Due to http-status-codes module we do not 
need to write try catch code everytime.*/

const getAllExamples = async (req, res) => {
  const example = await Example.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ example });
};
const createExample = async (req, res) => {
  const { contentExample } = req.body;

  if (!contentExample) {
    throw new BadRequestError("Please Provide All Values");
  }
  req.body.createdBy = req.user.userId;
  const example = await Example.create(req.body);
  res.status(StatusCodes.CREATED).json({ example });
};

const deleteExample = async (req, res) => {
  const { id: exampleId } = req.params;
  const example = await Example.findOne({ _id: exampleId });
  if (!example) {
    throw new CustomError.NotFoundError(`No example with id : ${exampleId}`);
  }
  checkPermissions(req.user, example.createdBy);
  await example.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Example removed" });
};

const updateExample = async (req, res) => {
  const { id: exampleId } = req.params;
  const { contentExample } = req.body;
  if (!contentExample) {
    throw new BadRequestError("Please provide all values");
  }
  const example = await Example.findOne({ _id: exampleId });
  if (!example) {
    throw new NotFoundError(`No example with id :${exampleId}`);
  }
  checkPermissions(req.user, example.createdBy);
  const updatedExample = await Example.findOneAndUpdate(
    { _id: exampleId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedExample });
};
export { getAllExamples, deleteExample, createExample, updateExample };

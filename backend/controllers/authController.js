import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values. ");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new Error("A user with this email already exists");
  }
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;

  await user.save();

  // various setups
  // in this case only id
  // if other properties included, must re-generate

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
  });
};

export { register, login, updateUser };

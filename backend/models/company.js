import mongoose from "mongoose";
import validator from "validator";

const hrSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide HR name"],
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "Please provide HR email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
  },
  phone: {
    type: String,
    validate: {
      validator: validator.isMobilePhone,
      message: "Please provide valid phone number",
    },
    minlength: 10,
    maxlength: 10,
  },
});

const companySchema = mongoose.Schema({
  role: {
    type: String,
    required: true,
    default: "admin",
  },
  name: {
    type: String,
    required: [true, "Please provide company name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide company email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide company password"],
    minlength: 8,
    select: false,
  },
  website: {
    type: String,
    validate: {
      validator: validator.isURL,
      message: "Please provide valid website URL",
    },
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000,
  },
  logo: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    validate: {
      validator: validator.isURL,
      message: "Please provide valid LinkedIn URL",
    },
  },
  address: {
    type: String,
    required: [true, "Please provide company address"],
  },
  hr: hrSchema,
  placementDrives: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlacementDrive",
    },
  ],
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: [true, "Please login"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Company", companySchema);

import mongoose from "mongoose";

const jobDriveSchema = mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: [true, "Please provide company id"],
  },
  designations: {
    type: [String],
    required: [true, "Please provide at least one job designation"],
  },
  locations: {
    type: [String],
    required: [true, "Please provide at least one location"],
  },
  streams: {
    type: [String],
    required: [true, "Please provide at least one stream"],
  },
  program: {
    type: String,
    required: [true, "Please provide the program"],
  },
  startDate: {
    type: Date,
    required: [true, "Please provide the start date"],
  },
  lastDate: {
    type: Date,
    required: [true, "Please provide the last date"],
  },
  eligibilityCriteria: {
    backlog: {
      type: Number,
      required: [true, "Please provide the maximum number of backlogs allowed"],
      default: 0,
    },
    cgpa: {
      type: Number,
      required: [true, "Please provide the minimum CGPA required"],
      default: 6.0,
    },
  },
  driveDate: {
    type: Date,
    required: [true, "Please provide the job drive date"],
  },
  package: {
    type: {
      min: {
        type: Number,
      },
      max: {
        type: Number,
      },
    },
    required: [true, "Please provide the job package"],
  },
  description: {
    type: String,
    required: [true, "Please provide the link to the job description PDF"],
  },
  pdfLink: {
    type: String,
    required: [true, "Please provide the link to the job description PDF"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("JobDrive", jobDriveSchema);

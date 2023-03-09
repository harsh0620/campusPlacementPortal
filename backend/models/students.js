import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const studentSchema = mongoose.Schema({
  role: {
    type: String,
    required: true,
    default: "student",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  placementDetails: {
    applied: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    selectedIn: {
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
      jobProfile: {
        type: String,
      },
      package: {
        type: Number,
      },
      joiningDate: {
        type: Date,
      },
    },
    appliedIn: [
      {
        company: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Company",
        },
        jobProfile: {
          type: String,
        },
      },
    ],
  },
  personalDetails: {
    profileImage: {
      type: String,
    },
    enrollmentNo: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 8,
      select: false,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    contactNo: {
      type: String,
      validate: {
        validator: validator.isMobilePhone,
        message: "Please provide valid phone number",
      },
      minlength: 10,
      maxlength: 10,
      unique: true,
    },
    aadharNo: {
      type: String,
      minlength: 12,
      maxlength: 12,
      unique: true,
    },
    program: {
      type: String,
      enum: ["B.Tech", "M.Tech", "MBA", "MCA", "BBA", "BCA", "B.Sc", "M.Sc"],
    },
    stream: {
      type: String,
      enum: [
        "Computer Science",
        "Electronics",
        "Mechanical",
        "Civil",
        "Electrical",
        "Agriculture",
        "Mining",
        "Chemical",
        "Biotechnology",
        "Food Technology",
        "Textile",
      ],
    },
    collegeName: {
      type: String,
    },
    universityName: {
      type: String,
    },
    fatherName: {
      type: String, //for verification
    },
    motherName: {
      type: String, //for verification
    },
    currentAddress: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
    homeCity: {
      type: String,
    },
    homeState: {
      type: String,
    },
    homeCountry: {
      type: String,
    },
    pincode: {
      type: String,
    },
  },
  academicDetails: [
    {
      degree: {
        type: String,
      },
      specialization: {
        type: String,
      },
      institute: {
        type: String,
      },
      yearOfPassing: {
        type: Number,
      },
      board: {
        type: String,
      },
      result: {
        option: {
          type: String,
          enum: ["CGPA", "Percentage"],
        },
        value: {
          type: Number,
        },
      },
      numberOfSemesters: {
        type: Number,
      },
      semesters: [
        {
          count: {
            type: Number,
          },
          result: {
            option: {
              type: String,
              enum: ["CGPA", "Percentage"],
            },
            value: {
              type: Number,
            },
          },
          backlogSubjects: {
            type: Number,
          },
        },
      ],
    },
  ],
  professionalDetails: {
    experiences: [
      {
        companyName: {
          type: String,
        },
        designation: {
          type: String,
        },
        duration: {
          type: Number, //in months
        },
        location: {
          type: String,
        },
        jobDescription: {
          type: String,
        },
        from: {
          type: Date,
        },
        to: {
          type: Date,
        },
      },
    ],
    projects: [
      {
        projectName: {
          type: String,
        },
        projectDescription: {
          type: String,
        },
        sourceCodeLink: {
          type: String,
          validate: {
            validator: validator.isURL,
            message: "Please provide valid URL",
          },
        },
        liveLink: {
          type: String,
          validate: {
            validator: validator.isURL,
            message: "Please provide valid URL",
          },
        },
      },
    ],
    skills: {
      type: [String],
    },
    certifications: [
      {
        certificationName: {
          type: String,
        },
        certificationAuthority: {
          type: String,
        },
        certificationLink: {
          type: String,
          validate: {
            validator: validator.isURL,
            message: "Please provide valid URL",
          },
        },
      },
    ],
    others: {
      type: String,
    },
    links: {
      type: [String],
    },
  },
  documents: {
    resume: {
      type: String,
      validate: {
        validator: validator.isURL,
        message: "Please provide valid URL",
      },
    },
    photo: {
      type: String,
      validate: {
        validator: validator.isURL,
        message: "Please provide valid URL",
      },
    },
    aadhar: {
      type: String,
      validate: {
        validator: validator.isURL,
        message: "Please provide valid URL",
      },
    },
    marksheets: [
      {
        marksheetName: {
          type: String,
        },
        marksheetLink: {
          type: String,
          validate: {
            validator: validator.isURL,
            message: "Please provide valid URL",
          },
        },
      },
    ],
  },
});
// Hash password before saving the user
studentSchema.pre("save", async function () {
  if (!this.isModified("personalDetails.password")) return;
  const salt = await bcrypt.genSalt(10);
  this.personalDetails.password = await bcrypt.hash(
    this.personalDetails.password,
    salt
  );
});

// Create a JWT token for the user
studentSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

// Compare user password with hashed password
studentSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(
    candidatePassword,
    this.personalDetails.password
  );
  return isMatch;
};
export default mongoose.model("Student", studentSchema);

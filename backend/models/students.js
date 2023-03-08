import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  role: {
    type: String,
    required: true,
    default: "student",
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
      required: true,
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
      required: true,
    },
  },
  academicDetails: {
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
    semesters: {
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
  },
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
      validate: {
        validator: validator.isURL,
        message: "Please provide valid URL",
      },
    },
  },
  documents: {
    resume: {
      type: String,
    },
    photo: {
      type: String,
    },
    aadhar: {
      type: String,
    },
    marksheets: [
      {
        marksheetName: {
          type: String,
        },
        marksheetLink: {
          type: String,
        },
      },
    ],
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

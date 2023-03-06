import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  profileImage: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  aadharNo: {
    type: String,
    required: true,
  },
  marks: {
    tenth: {
      type: String,
      required: true,
    },
    twelfth: {
      type: String,
      required: true,
    },
  },
  universityName: {
    type: String,
    required: true,
  },
  yearOfPassing: {
    tenth: {
      type: Number,
      required: true,
    },
    twelfth: {
      type: Number,
      required: true,
    },
    diploma: {
      type: Number,
    },
    degree: {
      type: Number,
    },
  },
  gender: {
    type: String,
    required: true,
  },
  diploma: {
    yearOfPassing: {
      type: Number,
    },
    marks: {
      type: String,
    },
  },
  stream: {
    type: String,
  },
  degree: {
    type: String,
  },
  programs: {
    type: [String],
  },
  placementStatus: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
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
  ogpa: {
    sem1: {
      type: Number,
    },
    sem2: {
      type: Number,
    },
    sem3: {
      type: Number,
    },
    sem4: {
      type: Number,
    },
    sem5: {
      type: Number,
    },
    sem6: {
      type: Number,
    },
    sem7: {
      type: Number,
    },
    sem8: {
      type: Number,
    },
  },
  activeBacklog: {
    type: Boolean,
  },
  certificationCourses: {
    type: [String],
  },
  skills: {
    type: [String],
  },
  internshipExperience: {
    type: String,
  },
  projectsDone: {
    type: String,
  },
  other: {
    type: String,
  },
  fileLinks: {
    linkedIn: {
      type: String,
    },
    github: {
      type: String,
    },
    resumeUpload: {
      type: String,
      required: true,
    },
  },
  studentPlacementGrad: {
    type: String,
  },
  clgMarksheet: {
    type: String,
  },
  startDateToApply: {
    type: Date,
  },
  lastDateToApply: {
    type: Date,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

import React, { useReducer, useContext } from "react";
import axios from "axios";
import reducer from "./reducer";
import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  HANDLE_CHANGE,
  GET_STUDENTSBYADMIN_BEGIN,
  GET_STUDENTSBYADMIN_SUCCESS,
  GET_PROFILE_BEGIN,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE_BEGIN,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  CREATE_ADMIN_BEGIN,
  CREATE_ADMIN_SUCCESS,
  CREATE_ADMIN_ERROR,
  CREATE_COMPANY_ERROR,
  CREATE_COMPANY_SUCCESS,
  CREATE_COMPANY_BEGIN,
  GET_STUDENTSBYIDBYADMIN_BEGIN,
  GET_STUDENTSBYIDBYADMIN_SUCCESS,
  GET_COMPANIESBYIDBYADMIN_BEGIN,
  GET_COMPANIESBYIDBYADMIN_SUCCESS,
  GET_COMPANIESBYADMIN_SUCCESS,
  GET_COMPANIESBYADMIN_BEGIN,
  GET_JOBSBYIDBYADMIN_BEGIN,
  GET_JOBSBYIDBYADMIN_SUCCESS,
  GET_JOBSBYADMIN_BEGIN,
  GET_JOBSBYADMIN_SUCCESS,
  VERIFY_JOB_SUCCESS,
  VERIFY_JOB_ERROR,
  VERIFY_JOB_BEGIN,
  SEND_NOTIFICATION_BEGIN,
  SEND_NOTIFICATION_SUCCESS,
  SEND_NOTIFICATION_ERROR,
  VERIFY_STUDENT_ERROR,
  VERIFY_STUDENT_SUCCESS,
  VERIFY_STUDENT_BEGIN,
  UPDATE_PROFILE_PERSONAL_ERROR,
  UPDATE_PROFILE_PERSONAL_SUCCESS,
  UPDATE_PROFILE_PERSONAL_BEGIN,
  GET_PROFILE_PERSONAL_BEGIN,
  GET_PROFILE_PERSONAL_SUCCESS,
  UPDATE_PROFILE_ACADEMIC_ERROR,
  UPDATE_PROFILE_ACADEMIC_SUCCESS,
  UPDATE_PROFILE_ACADEMIC_BEGIN,
  GET_PROFILE_ACADEMIC_BEGIN,
  GET_PROFILE_ACADEMIC_SUCCESS,
} from "./actions";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  name: "",
  email: "",
  password: "",
  newPassword: "",
  confirmPassword: "",
  avatar: "",
  profileImage: "",
  dob: "",
  gender: "Male",
  contactNo: "",
  aadharNo: "",
  program: [],
  stream: [],
  collegeName: "",
  universityName: "",
  fatherName: "",
  motherName: "",
  currentAddress: "",
  permanentAddress: "",
  homeCity: "",
  homeState: "",
  homeCountry: "",
  pincode: "",
  academicDetails: [{
    degree: "",
    specialization: "",
    institute: "",
    yearOfPassing: "",
    board: "",
    result: {
      option: "",
      value: "",
    },
    numberOfSemesters: "",
    semesters: [{
      count: "",
      result: {
        option: "",
        value: "",
      },
      backlogSubjects:"",
  }],

  }],
  designation: "",
  phone: "",
  aadharno: "",
  studentsByAdmin: [],
  companiesByAdmin: [],
  jobsByAdmin: [],
  specificJobs: {},
  specificCompany: {
    name:"",
    address:"",
    description:"",
    email:"",
    hr:{
      name:"",
      email:"",
      phone:"",
    },
    linkedin:"",
    logo:"",
    placementDrives:[],
    programs:[],
    streams:[],
    website:"",
  },
  //company
  companyName: "",
  companyEmail: "",
  companyPassword: "",
  companyPhone: "",
  companyAddress: "",
  companyLogo: "",
  companyWebsite: "",
  companyDescription: "",
  companyLinkedin: "",
  companyPrograms: [],
  companyStreams: [],
  hrName: "",
  hrEmail: "",
  hrPhone: "",
  //custom messages
  mailsArray: [],
  mailSubject: "",
  mailBody: "",
  specificStudent: {
    applicationStatus: "unverified",
  enrollmentNo: "",
  name: "",
  email: "",
  password: "",
  placementDetails: {
    applied: false,
    selected: "no",
    selectedIn: {
      company: null,
      jobProfile: "",
      package: null,
      joiningDate: null,
    },
    appliedIn: [],
  },
  personalDetails: {
    profileImage: "",
    dob: null,
    gender: "Male",
    contactNo: "",
    aadharNo: "",
    program: "",
    stream: "",
    collegeName: "",
    universityName: "",
    fatherName: "",
    motherName: "",
    currentAddress: "",
    permanentAddress: "",
    homeCity: "",
    homeState: "",
    homeCountry: "",
    pincode: "",
  },
  academicDetails: [
    {
      degree: "",
      specialization: "",
      institute: "",
      yearOfPassing: null,
      board: "",
      result: {
        option: "CGPA",
        value: null,
      },
      numberOfSemesters: null,
      semesters: [
        {
          count: null,
          result: {
            option: "CGPA",
            value: null,
          },
          backlogSubjects: null,
        },
      ],
    },
  ],
  professionalDetails: {
    experiences: [
      {
        companyName: "",
        designation: "",
        duration: null,
        location: "",
        jobDescription: "",
        from: null,
        to: null,
      },
    ],
    projects: [
      {
        projectName: "",
        projectDescription: "",
        sourceCodeLink: "",
        liveLink: "",
      },
    ],
    skills: [],
    certifications: [
      {
        certificationName: "",
        certificationAuthority: "",
        certificationLink: "",
      },
    ],
    others: "",
    links: [],
  },
  documents: {
    resume: "",
    photo: "",
    aadhar: "",
    marksheets: [
      {
        marksheetName: "",
        marksheetLink: "",
      },
    ],
  },
  },
};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  // response interceptor
  authFetch.interceptors.request.use(
    (config) => {
      if (config.headers.common) {
        config.headers.common["Authorization"] = `Bearer ${state.token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response interceptor

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );
  const displayAlert = ({ alertType, alertText }) => {
    dispatch({
      type: DISPLAY_ALERT,
      payload: {
        alertType: alertType,
        alertText: alertText,
      },
    });
    clearAlert();
  };
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 3000);
  };
  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/student/auth/register", currentUser);
      console.log(response);
      const { user, token } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: {
          user,
          token,
        },
      });

      addUserToLocalStorage({
        user,
        token,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    clearAlert();
  };
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);
      const { user, token } = data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });

      addUserToLocalStorage({ user, token });
      clearAlert();
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    clearAlert();
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  const getAdminDetails = async (userType) => {
    dispatch({ type: GET_PROFILE_BEGIN });
    try {
      const { data } = await authFetch.get(`/${userType}/profile`);
      const { user } = data;
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: {
          user,
        },
      });
    } catch (error) {
      console.log(error);
      //logoutUser();
    }
    clearAlert();
  };
  const updateProfile = async (userType) => {
    dispatch({ type: UPDATE_PROFILE_BEGIN });
    try {
      const { name, designation, phone, aadharno, gender } = state;
      const { data } = await authFetch.patch(`/${userType}/profile`, {
        name,
        designation,
        phone,
        aadharno,
        gender,
      });
      const { user, token } = data;
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: {
          user,
          token,
        },
      });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: UPDATE_PROFILE_ERROR,
        payload: { msg: error.response.data.message },
      });
      toast.error(`Error Updating Profile: ${error.response.data.message}`);
    }
    clearAlert();
  };
  const updatePassword = async () => {
    dispatch({ type: UPDATE_PROFILE_BEGIN });
    try {
      const { password, newPassword, confirmPassword } = state;
      const { data } = await authFetch.patch(`/auth/password`, {
        oldPassword: password,
        newPassword,
        confirmPassword,
        userId: state.user._id,
      });
      const { user, token } = data;
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: {
          user,
          token,
        },
      });
      toast.success("Password Updated Successfully");
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: UPDATE_PROFILE_ERROR,
        payload: { msg: error.response.data.message },
      });
      toast.error(`Error Updating Profile: ${error.response.data.message}`);
    }
    clearAlert();
  };
  const createAdmin = async () => {
    dispatch({ type: CREATE_ADMIN_BEGIN });
    try {
      const { name, email, password } = state;
      const { data } = await authFetch.post(`/admin/createAdmin`, {
        name,
        email,
        password,
      });
      const { message } = data;
      dispatch({
        type: CREATE_ADMIN_SUCCESS,
      });
      toast.success(message);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_ADMIN_ERROR,
        payload: { msg: error.response.data.message },
      });
      toast.error(`Error Creating Admin: ${error.response.data.message}`);
    }
    clearAlert();
  };
  const createCompany = async () => {
    dispatch({ type: CREATE_COMPANY_BEGIN });
    try {
      const {
        companyName,
        companyEmail,
        companyPassword,
        companyAddress,
        companyLogo,
        companyWebsite,
        companyDescription,
        companyPrograms,
        companyLinkedin,
        companyStreams,
        hrName,
        hrEmail,
        hrPhone,
      } = state;
      const { data } = await authFetch.post(`/admin/createCompany`, {
        name: companyName,
        email: companyEmail,
        password: companyPassword,
        website: companyWebsite,
        description: companyDescription,
        logo: companyLogo,
        linkedin: companyLinkedin,
        address: companyAddress,
        programs: companyPrograms,
        streams: companyStreams,
        hrName,
        hrEmail,
        hrPhone,
      });
      const { message } = data;
      dispatch({
        type: CREATE_COMPANY_SUCCESS,
      });
      toast.success(message);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_COMPANY_ERROR,
        payload: { msg: error.response.data.message },
      });
      toast.error(`Error Creating Admin: ${error.response.data.message}`);
    }
    clearAlert();
  };
  const searchStudentsByAdmin = async ({
    name,
    enrollmentNo,
    email,
    gender,
    stream,
    verified,
    selectedIn,
  }) => {
    let url = `/admin/students?name=${name}&enrollmentNo=${enrollmentNo}&email=${email}&gender=${gender}&stream=${stream}&applicationStatus=${verified}&selectedIn=${selectedIn}`;
    console.log(url);
    dispatch({ type: GET_STUDENTSBYADMIN_BEGIN });
    try {
      const { data } = await authFetch(url);
      console.log(data);
      const { students } = data;
      dispatch({
        type: GET_STUDENTSBYADMIN_SUCCESS,
        payload: {
          students,
        },
      });
    } catch (error) {
      console.log(error);
      //logoutUser();
    }
    clearAlert();
  };
const getStudentById=async(id)=>{
  dispatch({ type: GET_STUDENTSBYIDBYADMIN_BEGIN });
  try {
    const { data } = await authFetch(`/admin/students/${id}`);
    console.log(data);
    const { student } = data;
    dispatch({
      type: GET_STUDENTSBYIDBYADMIN_SUCCESS,
      payload: {
        student,
      },
    });
  } catch (error) {
    console.log(error);
    //logoutUser();
  }
  clearAlert();
}
const searchCompaniesByAdmin = async () => {
  dispatch({ type: GET_COMPANIESBYADMIN_BEGIN });
  try {
    const { data } = await authFetch(`/admin/company`);
    const { companies } = data;
    dispatch({
      type: GET_COMPANIESBYADMIN_SUCCESS,
      payload: {
        companies,
      },
    });
  } catch (error) {
    console.log(error);
    //logoutUser();
  }
  clearAlert();
};
const getCompanyByIdByAdmin=async(id)=>{
  dispatch({ type: GET_COMPANIESBYIDBYADMIN_BEGIN });
  try {
    const { data } = await authFetch(`/admin/company/${id}`);
    console.log(data);
    const { company } = data;
    console.log(company);
    dispatch({
      type: GET_COMPANIESBYIDBYADMIN_SUCCESS,
      payload: {
        company,
      },
    });
  } catch (error) {
    console.log(error);
    //logoutUser();
  }
  clearAlert();
}
const searchJobsByAdmin = async () => {
  dispatch({ type: GET_JOBSBYADMIN_BEGIN });
  try {
    const { data } = await authFetch(`/admin/job`);
    const { jobs } = data;
    console.log(jobs)
    dispatch({
      type: GET_JOBSBYADMIN_SUCCESS,
      payload: {
        jobs,
      },
    });
  } catch (error) {
    console.log(error);
    //logoutUser();
  }
  clearAlert();
};
const getJobsByIdByAdmin=async(id)=>{
  dispatch({ type: GET_JOBSBYIDBYADMIN_BEGIN });
  try {
    const { data } = await authFetch(`/admin/job/${id}`);
    const { job } = data;
    console.log(job)
    dispatch({
      type: GET_JOBSBYIDBYADMIN_SUCCESS,
      payload: {
        job,
      },
    });
  } catch (error) {
    console.log(error);
    //logoutUser();
  }
  clearAlert();
}
const verifyJob = async (jobId) => {
  dispatch({ type: VERIFY_JOB_BEGIN });
  try {
    const { data } = await authFetch.patch(`/admin/verifyJobDrive/${jobId}`);
    const { message } = data;
    dispatch({
      type: VERIFY_JOB_SUCCESS,
    });
    toast.success(message);
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: VERIFY_JOB_ERROR,
      payload: { msg: error.response.data.message },
    });
    toast.error(`Error Creating Admin: ${error.response.data.message}`);
  }
  clearAlert();
};
const verifyStudent = async (studentId) => {
  dispatch({ type: VERIFY_STUDENT_BEGIN });
  try {
    const { data } = await authFetch.patch(`/admin/verifyStudent/${studentId}`);
    const { message } = data;
    dispatch({
      type: VERIFY_STUDENT_SUCCESS,
    });
    toast.success(message);
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: VERIFY_STUDENT_ERROR,
      payload: { msg: error.response.data.message },
    });
    toast.error(`Error Creating Admin: ${error.response.data.message}`);
  }
  clearAlert();
};
const sendJobNotification = async ({emails,jobId}) => {
  dispatch({ type: SEND_NOTIFICATION_BEGIN });
  try {
    const { data } = await authFetch.post(`/admin/sendMails/${jobId}`,{
      toEmail:emails
    });
    const { message } = data;
    dispatch({
      type: SEND_NOTIFICATION_SUCCESS,
    });
    toast.success(message);
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: SEND_NOTIFICATION_ERROR,
      payload: { msg: error.response.data.message },
    });
    toast.error(`Error Creating Admin: ${error.response.data.message}`);
  }
  clearAlert();
};
const getRandomColor = () => {
  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    // Add more Tailwind CSS color classes as needed
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
function isValidImageUrl(url) {
  // Perform a simple check to determine if the URL ends with a common image file extension
  return /\.(jpeg|jpg|gif|png|svg)$/i.test(url);
}
function convertToLPA(value) {
  if (typeof value === 'number') {
    return (value / 100000).toFixed(2); // Divide by 100000 to convert into Lakh and fix the decimal places to 2
  }
  return ''; // Return an empty string if the value is not a valid number
}
// STUDENT SIDE
const getStudentProfilePersonal = async () => {
    dispatch({ type:GET_PROFILE_PERSONAL_BEGIN });
    try {
      const { data } = await authFetch.get(`/student/personalDetails`);
      const { personalDetails } = data;
      dispatch({
        type: GET_PROFILE_PERSONAL_SUCCESS,
        payload: {
          personalDetails,
        },
      });
    } catch (error) {
      console.log(error);
      //logoutUser();
    }
    clearAlert();
  };
const updateStudentProfilePersonal = async () => {
  dispatch({ type: UPDATE_PROFILE_PERSONAL_BEGIN });
  try {
    const {
      profileImage,
      dob,
      gender,
      contactNo,
      aadharNo,
      program,
      stream,
      collegeName,
      universityName,
      fatherName,
      motherName,
      currentAddress,
      permanentAddress,
      pincode,
      homeCity,
      homeState,
      homeCountry,
    }=state;
    const { data } = await authFetch.patch(`/student/personalDetails`, {
      profileImage,
      dob,
      gender,
      contactNo,
      aadharNo,
      program,
      stream,
      collegeName,
      universityName,
      fatherName,
      motherName,
      currentAddress,
      permanentAddress,
      pincode,
      homeCity,
      homeState,
      homeCountry,
    });
    const { personalDetails } =data;
    dispatch({
      type: UPDATE_PROFILE_PERSONAL_SUCCESS,
      payload: {
        personalDetails
      },
    });
    toast.success('Profile Updated Successfully');
  } catch (error) {
    if (error.response.status === 401) return;
    dispatch({
      type: UPDATE_PROFILE_PERSONAL_ERROR,
      payload: { msg: error.response.data.message },
    });
    toast.error(`Error Updating Profile: ${error.response.data.message}`);
  }
  clearAlert();
};
const getStudentProfileAcademic = async () => {
  dispatch({ type:GET_PROFILE_ACADEMIC_BEGIN });
  try {
    const { data } = await authFetch.get(`/student/academicDetails`);
    const { academicDetails } = data;
    dispatch({
      type: GET_PROFILE_ACADEMIC_SUCCESS,
      payload: {
        academicDetails,
      },
    });
  } catch (error) {
    console.log(error);
    //logoutUser();
  }
  clearAlert();
};
const updateStudentProfileAcademic = async () => {
dispatch({ type: UPDATE_PROFILE_ACADEMIC_BEGIN });
try {
  const {
   academicDetails
  }=state;
  const { data } = await authFetch.patch(`/student/academicDetails`, {
    academicDetails
  });
  dispatch({
    type: UPDATE_PROFILE_ACADEMIC_SUCCESS,
    payload: {
      academicDetails:data?.academicDetails
    },
  });
  toast.success('Profile Updated Successfully');
} catch (error) {
  if (error.response.status === 401) return;
  dispatch({
    type: UPDATE_PROFILE_ACADEMIC_ERROR,
    payload: { msg: error.response.data.message },
  });
  toast.error(`Error Updating Profile: ${error.response.data.message}`);
}
clearAlert();
};
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        handleChange,
        registerUser,
        loginUser,
        logoutUser,
        searchStudentsByAdmin,
        getStudentById,
        searchCompaniesByAdmin,
        searchJobsByAdmin,
        getCompanyByIdByAdmin,
        getJobsByIdByAdmin,
        getAdminDetails,
        updateProfile,
        updatePassword,
        createAdmin,
        createCompany,
        getRandomColor,
        isValidImageUrl,
        convertToLPA,
        verifyJob,
        verifyStudent,
        sendJobNotification,
        // STUDENT SIDE
        getStudentProfilePersonal,
        updateStudentProfilePersonal,
        getStudentProfileAcademic,
        updateStudentProfileAcademic
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };

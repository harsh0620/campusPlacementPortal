import React, { useReducer, useContext } from "react";
import axios from "axios";
import reducer from "./reducer";
import { storage } from "../firebase";
import { toast } from "react-toastify";
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
  UPDATE_STATE_VALUES,
  UPDATE_PROFILE_PROFESSIONAL_ERROR,
  UPDATE_PROFILE_PROFESSIONAL_SUCCESS,
  UPDATE_PROFILE_PROFESSIONAL_BEGIN,
  GET_PROFILE_PROFESSIONAL_SUCCESS,
  GET_PROFILE_PROFESSIONAL_BEGIN,
  START_LOADING,
  STOP_LOADING,
  SET_PDF_URL,
  SET_IMAGE_URL,
  SET_UPLOAD_PROGRESS,
  UPDATE_PROFILE_DOCUMENT_BEGIN,
  UPDATE_PROFILE_DOCUMENT_SUCCESS,
  UPDATE_PROFILE_DOCUMENT_ERROR,
  GET_PROFILE_DOCUMENT_BEGIN,
  GET_PROFILE_DOCUMENT_SUCCESS,
  UPDATE_PROFILE_BASIC_ERROR,
  UPDATE_PROFILE_BASIC_SUCCESS,
  UPDATE_PROFILE_BASIC_BEGIN,
  GET_PROFILE_BASIC_BEGIN,
  GET_PROFILE_BASIC_SUCCESS,
  GET_JOBSBYSTUDENT_BEGIN,
  GET_JOBSBYSTUDENT_SUCCESS,
  GET_JOBSBYIDBYSTUDENT_BEGIN,
  GET_JOBSBYIDBYSTUDENT_SUCCESS,
  GET_COMPANIESBYIDBYSTUDENT_SUCCESS,
  GET_COMPANIESBYIDBYSTUDENT_BEGIN,
  GET_COMPANIESBYSTUDENT_BEGIN,
  GET_COMPANIESBYSTUDENT_SUCCESS,
  APPLY_JOBBYSTUDENT_BEGIN,
  APPLY_JOBBYSTUDENT_SUCCESS,
  APPLY_JOBBYSTUDENT_ERROR,
  GET_STATSBYSTUDENT_BEGIN,
  GET_STATSBYSTUDENT_SUCCESS,
  GET_COMPANIESBYIDBYCOMPANY_BEGIN,
  GET_COMPANIESBYIDBYCOMPANY_SUCCESS,
  UPDATE_PROFILEBYCOMPANY_BEGIN,
  UPDATE_PROFILEBYCOMPANY_SUCCESS,
  UPDATE_PROFILEBYCOMPANY_ERROR,
  GET_JOBSBYCOMPANY_BEGIN,
  GET_JOBSBYCOMPANY_SUCCESS,
  GET_JOBSBYIDBYCOMPANY_BEGIN,
  GET_JOBSBYIDBYCOMPANY_SUCCESS,
  GET_STUDENTSBYIDBYCOMPANY_BEGIN,
  GET_STUDENTSBYIDBYCOMPANY_SUCCESS,
  GET_STUDENTSBYIDBYSTUDENT_BEGIN,
  GET_STUDENTSBYIDBYSTUDENT_SUCCESS,
  CREATE_JOBDRIVEBYCOMPANY_BEGIN,
  CREATE_JOBDRIVEBYCOMPANY_SUCCESS,
  CREATE_JOBDRIVEBYCOMPANY_ERROR,
  UPDATE_JOBDRIVEBYCOMPANY_SUCCESS,
  UPDATE_JOBDRIVEBYCOMPANY_ERROR,
  UPDATE_JOBDRIVEBYCOMPANY_BEGIN,
  DELETE_JOBDRIVEBYCOMPANY_ERROR,
  DELETE_JOBDRIVEBYCOMPANY_SUCCESS,
  DELETE_JOBDRIVEBYCOMPANY_BEGIN,
  ACTIONON_JOBDRIVEBYCOMPANY_BEGIN,
  ACTIONON_JOBDRIVEBYCOMPANY_SUCCESS,
  ACTIONON_JOBDRIVEBYCOMPANY_ERROR,
  GET_STATSBYCOMPANY_BEGIN,
  GET_STATSBYCOMPANY_SUCCESS,
  GET_STATSBYADMIN_BEGIN,
  GET_STATSBYADMIN_SUCCESS,
  SEND_MESSAGEONMAIL_BEGIN,
  SEND_MESSAGEONMAIL_SUCCESS,
  SEND_MESSAGEONMAIL_ERROR,
  FORGOT_PASSWORD_BEGIN,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  filledPercentageStudent: 0,
  jobsCalendarStudent: [],
  token: token,
  imageUrl: "",
  pdfUrl: "",
  uploadProgress: 0,
  isUploading: false,
  loaderText: "Loading...",
  name: "",
  email: "",
  password: "",
  newPassword: "",
  confirmPassword: "",
  about: "",
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
  academicDetails: [
    {
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
      semesters: [
        {
          count: "",
          result: {
            option: "",
            value: "",
          },
          backlogSubjects: "",
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
    links: [],
  },
  professionalExperiences: [
    {
      companyName: "",
      designation: "",
      duration: null,
      location: "",
      jobDescription: "",
      from: new Date(),
      to: new Date(),
    },
  ],
  professionalProjects: [
    {
      projectName: "",
      projectDescription: "",
      sourceCodeLink: "",
      liveLink: "",
    },
  ],
  professionalSkills: [],
  professionalCertifications: [
    {
      certificationName: "",
      certificationAuthority: "",
      certificationLink: "",
    },
  ],
  professionalLinks: [],
  documents: {
    resume: "",
    photo: "",
    aadhar: "",
    allDocument: "",
  },
  documentResume: "",
  documentPhoto: "",
  documentAadhar: "",
  documentAllDocument: "",
  statsForAdmin: {},
  adminStatsYear: new Date().getFullYear(),
  statsForStudent: {},
  statsForCompany: {},
  designation: "",
  phone: "",
  aadharno: "",
  studentsByAdmin: [],
  companiesByAdmin: [],
  jobsByAdmin: [],
  studentsByStudent: [],
  companiesByStudent: [],
  jobsByStudent: [],
  jobsByCompany: [],
  specificAdmin: {},
  specificJob: {},
  specificJobApplied: {},
  specificCompany: {
    name: "",
    address: "",
    description: "",
    email: "",
    hr: {
      name: "",
      email: "",
      phone: "",
    },
    linkedin: "",
    logo: "",
    placementDrives: [],
    programs: [],
    streams: [],
    website: "",
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
  //company jobs
  jobDriveDesignations: "",
  jobDriveLocations: "",
  jobDriveStreams: [],
  jobDrivePrograms: [],
  jobDriveStartDate: "",
  jobDriveEndDate: "",
  jobDriveEligibilityCriteria: {
    backlog: "",
    cgpa: 6.0,
  },
  jobDriveDriveDate: "",
  jobDrivePackageValue: {
    min: 0,
    max: 0,
  },
  jobDriveEligibilityCriteriaBacklog: "",
  jobDriveEligibilityCriteriaCgpa: 6.0,
  jobDrivePackageValueMin: 0,
  jobDrivePackageValueMax: 0,
  jobDriveDescription: "",
  jobPdfLink: "",
  actionJobAction: "hire",
  actionStudentId: "",
  actionJobProfile: "",
  actionJobPackage: 0,
  //custom messages
  mailsArray: [],
  mailSubject: "",
  mailBody: "",
  specificStudent: {
    applicationStatus: "unverified",
    enrollmentNo: "",
    name: "",
    email: "",
    about: "",
    placementDetails: {
      applied: false,
      selected: "no",
      selectedIn: {
        company: "",
        jobProfile: "",
        package: "",
        joiningDate: "",
      },
      appliedIn: [
        {
          company: "",
          jobProfile: "",
        },
      ],
    },
    personalDetails: {
      profileImage: "",
      dob: "",
      gender: "Male",
      contactNo: "",
      aadharNo: "",
      program: "B.Tech",
      stream: "Computer Science",
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
        yearOfPassing: "",
        board: "",
        result: {
          option: "CGPA",
          value: 0,
        },
        numberOfSemesters: 0,
        backlogSubjects: 0,
      },
    ],
    professionalDetails: {
      experiences: [
        {
          companyName: "",
          designation: "",
          duration: 0,
          location: "",
          jobDescription: "",
          from: "",
          to: "",
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
      links: [],
    },
    documents: {
      resume: "",
      photo: "",
      aadhar: "",
      allDocument: "",
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
  const handleUpdateStateValues = ({ name, value }) => {
    dispatch({
      type: UPDATE_STATE_VALUES,
      payload: { name, value },
    });
  };
  const startLoading = () => {
    dispatch({ type: START_LOADING });
  };
  const stopLoading = () => {
    dispatch({ type: STOP_LOADING });
  };
  const imageUpload = (photo, user) => {
    return new Promise((resolve, reject) => {
      if (photo == null) {
        toast.error("First Select an image");
        reject("First Select an image");
        return;
      }

      // Upload the image to Firebase storage
      const imageRef = storage
        .ref(`/image/${user?._id}/${photo?.name}-${Date.now()}`)
        .put(photo);

      // Add an event listener for state changes
      imageRef.on(
        "state_changed",
        (snapshot) => {
          // You can optionally monitor the upload progress here
          startLoading();
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          dispatch({ type: SET_UPLOAD_PROGRESS, payload: { progress } });
        },
        (error) => {
          // Handle any upload errors here
          toast.error("Error uploading image: ", error);
          stopLoading();
          reject(error);
        },
        () => {
          // Upload complete, get the download URL
          imageRef.snapshot.ref
            .getDownloadURL()
            .then((downloadURL) => {
              // You can use the downloadURL for further processing, such as storing it in a database, displaying the image, etc.
              toast.success("Image got uploaded");
              dispatch({ type: SET_IMAGE_URL, payload: { downloadURL } });
              stopLoading();
              resolve(downloadURL);
            })
            .catch((error) => {
              toast.error("Error getting download URL: ", error);
              stopLoading();
              reject(error);
            });
        }
      );
    });
  };
  const pdfUpload = (pdfFile, user) => {
    return new Promise((resolve, reject) => {
      if (pdfFile == null) {
        toast.error("Please select a PDF file.");
        reject("Please select a PDF file.");
        return;
      }
      // Upload the PDF to Firebase storage
      const pdfRef = storage
        .ref(`/pdf/${user?._id}/${pdfFile?.name}-${Date.now()}`)
        .put(pdfFile);

      // Add an event listener for state changes
      pdfRef.on(
        "state_changed",
        (snapshot) => {
          // You can optionally monitor the upload progress here
          startLoading();
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          dispatch({ type: SET_UPLOAD_PROGRESS, payload: { progress } });
        },
        (error) => {
          // Handle any upload errors here
          toast.error("Error uploading PDF: ", error);
          stopLoading();
          reject(error);
        },
        () => {
          // Upload complete, get the download URL
          pdfRef.snapshot.ref
            .getDownloadURL()
            .then((downloadURL) => {
              // You can use the downloadURL for further processing, such as storing it in a database, displaying the PDF, etc.
              toast.success("PDF file uploaded successfully.");
              dispatch({ type: SET_PDF_URL, payload: { downloadURL } });
              stopLoading();
              resolve(downloadURL);
            })
            .catch((error) => {
              toast.error("Error getting download URL: ", error);
              stopLoading();
              reject(error);
            });
        }
      );
    });
  };
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post(
        "/api/v1/student/auth/register",
        currentUser
      );
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
  const forgotPassword = async ({email,userType}) => {
    dispatch({ type: FORGOT_PASSWORD_BEGIN });
    try {
      console.log(email);
      console.log(userType);
      const { data } = await axios.post("/api/v1/auth/forgotpassword", {
        email,
        userType
      });
      console.log(data);
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: { msg: data.message },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FORGOT_PASSWORD_ERROR,
        payload: { msg: error.response.data.message },
      });
    }
    clearAlert();
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
  const getStudentByIdByAdmin = async (id) => {
    console.log(id);
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
  };
  const getStudentByIdByStudent = async (id) => {
    console.log(id);
    dispatch({ type: GET_STUDENTSBYIDBYSTUDENT_BEGIN });
    try {
      const { data } = await authFetch(`/student/${id}`);
      console.log(data);
      const { student } = data;
      dispatch({
        type: GET_STUDENTSBYIDBYSTUDENT_SUCCESS,
        payload: {
          student,
        },
      });
    } catch (error) {
      console.log(error);
      //logoutUser();
    }
    clearAlert();
  };
  const getCSVDataByStudent = async (id) => {
    startLoading();
    try {
      const { data } = await authFetch.get(`/student/csv/${id}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "student.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      stopLoading();
      toast.success("CSV Downloaded");
    } catch (error) {
      console.log(error);
      stopLoading();
      toast.error("Error Downloading CSV");
    }
  };
  const getCSVDataByCompany = async (ids) => {
    startLoading();
    try {
      const { data } = await authFetch.post(
        `/company/csv`,
        { studentIds: ids },
        {
          responseType: "blob",
        }
      );
      console.log(data);
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "student.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      stopLoading();
      toast.success("CSV Downloaded");
    } catch (error) {
      console.log(error);
      stopLoading();
      toast.error("Error Downloading CSV");
      // Handle error
    }
  };
  const getCSVDataByAdmin = async (ids) => {
    startLoading();
    try {
      const { data } = await authFetch.post(
        `/admin/csv`,
        { studentIds: ids },
        {
          responseType: "blob",
        }
      );
      console.log(data);
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "student.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      stopLoading();
      toast.success("CSV Downloaded");
    } catch (error) {
      console.log(error);
      stopLoading();
      toast.error("Error Downloading CSV");
    }
  };

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
  const getCompanyByIdByAdmin = async (id) => {
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
  };
  const searchJobsByAdmin = async () => {
    dispatch({ type: GET_JOBSBYADMIN_BEGIN });
    try {
      const { data } = await authFetch(`/admin/job`);
      const { jobs } = data;
      console.log(jobs);
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
  const getJobsByIdByAdmin = async (id) => {
    dispatch({ type: GET_JOBSBYIDBYADMIN_BEGIN });
    try {
      const { data } = await authFetch(`/admin/job/${id}`);
      const { job } = data;
      console.log(job);
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
  };
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
      const { data } = await authFetch.patch(
        `/admin/verifyStudent/${studentId}`
      );
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
  const getStatsByAdmin = async () => {
    dispatch({ type: GET_STATSBYADMIN_BEGIN });
    try {
      const { adminStatsYear } = state;
      const { data } = await authFetch.get(
        `/admin/stats?statsYear=${adminStatsYear}`
      );
      const { stats } = data;
      console.log(stats);
      dispatch({
        type: GET_STATSBYADMIN_SUCCESS,
        payload: {
          stats,
        },
      });
    } catch (error) {
      console.log(error);
      //logoutUser();
    }
    clearAlert();
  };
  const sendJobNotification = async ({ emails, jobId }) => {
    dispatch({ type: SEND_NOTIFICATION_BEGIN });
    try {
      const { data } = await authFetch.post(`/admin/sendMails/${jobId}`, {
        toEmail: emails,
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
  const sendMessageOnMail = async () => {
    dispatch({ type: SEND_MESSAGEONMAIL_BEGIN });
    try {
      const { mailsArray, mailSubject, mailBody } = state;
      const { data } = await authFetch.post(`/admin/sendMessagesOnMail`, {
        mailsArray,
        mailSubject,
        mailBody,
      });
      const { message } = data;
      dispatch({
        type: SEND_MESSAGEONMAIL_SUCCESS,
      });
      toast.success(message);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: SEND_MESSAGEONMAIL_ERROR,
        payload: { msg: error.response.data.message },
      });
      toast.error(`Error Creating Admin: ${error.response.data.message}`);
    }
    clearAlert();
  };
  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
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
    if (typeof value === "number") {
      return (value / 100000).toFixed(2); // Divide by 100000 to convert into Lakh and fix the decimal places to 2
    }
    return ""; // Return an empty string if the value is not a valid number
  }
  // STUDENT SIDE
  const getStudentProfileBasics = async () => {
    dispatch({ type: GET_PROFILE_BASIC_BEGIN });
    try {
      const { data } = await authFetch.get(`/student/basicDetails`);
      const { basicDetails } = data;
      dispatch({
        type: GET_PROFILE_BASIC_SUCCESS,
        payload: {
          basicDetails,
        },
      });
    } catch (error) {
      console.log(error);
      //logoutUser();
    }
    clearAlert();
  };
  const updateStudentProfileBasics = async () => {
    dispatch({ type: UPDATE_PROFILE_BASIC_BEGIN });
    try {
      const { name, enrollmentNo, about } = state;

      const { data } = await authFetch.patch(`/student/basicDetails`, {
        name,
        enrollmentNo,
        about,
      });
      dispatch({
        type: UPDATE_PROFILE_BASIC_SUCCESS,
        payload: {
          basicDetails: data?.basicDetails,
        },
      });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: UPDATE_PROFILE_BASIC_ERROR,
        payload: { msg: error.response.data.message },
      });
      toast.error(`Error Updating Profile: ${error.response.data.message}`);
    }
    clearAlert();
  };
  const getStudentProfilePersonal = async () => {
    dispatch({ type: GET_PROFILE_PERSONAL_BEGIN });
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
      } = state;
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
      const { personalDetails } = data;
      dispatch({
        type: UPDATE_PROFILE_PERSONAL_SUCCESS,
        payload: {
          personalDetails,
        },
      });
      toast.success("Profile Updated Successfully");
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
    dispatch({ type: GET_PROFILE_ACADEMIC_BEGIN });
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
      const { academicDetails } = state;
      console.log(academicDetails);
      const { data } = await authFetch.patch(`/student/academicDetails`, {
        academicDetails,
      });
      dispatch({
        type: UPDATE_PROFILE_ACADEMIC_SUCCESS,
        payload: {
          academicDetails: data?.academicDetails,
        },
      });
      toast.success("Profile Updated Successfully");
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
  const getStudentProfileProfessional = async () => {
    dispatch({ type: GET_PROFILE_PROFESSIONAL_BEGIN });
    try {
      const { data } = await authFetch.get(`/student/professionalDetails`);
      const { professionalDetails } = data;
      dispatch({
        type: GET_PROFILE_PROFESSIONAL_SUCCESS,
        payload: {
          professionalDetails,
        },
      });
    } catch (error) {
      console.log(error);
      //logoutUser();
    }
    clearAlert();
  };
  const updateStudentProfileProfessional = async () => {
    dispatch({ type: UPDATE_PROFILE_PROFESSIONAL_BEGIN });
    try {
      const {
        professionalExperiences,
        professionalProjects,
        professionalSkills,
        professionalCertifications,
        professionalLinks,
      } = state;
      const helper = {
        experiences: professionalExperiences,
        projects: professionalProjects,
        skills: professionalSkills,
        certifications: professionalCertifications,
        links: professionalLinks,
      };
      console.log(helper);
      const { data } = await authFetch.patch(`/student/professionalDetails`, {
        professionalDetails: helper,
      });
      console.log(data);
      dispatch({
        type: UPDATE_PROFILE_PROFESSIONAL_SUCCESS,
        payload: {
          professionalDetails: data?.professionalDetails,
        },
      });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: UPDATE_PROFILE_PROFESSIONAL_ERROR,
        payload: { msg: error.response.data.message },
      });
      toast.error(`Error Updating Profile: ${error.response.data.message}`);
    }
    clearAlert();
  };
  const getStudentProfileDocuments = async () => {
    dispatch({ type: GET_PROFILE_DOCUMENT_BEGIN });
    try {
      const { data } = await authFetch.get(`/student/documentDetails`);
      const { documentDetails } = data;
      dispatch({
        type: GET_PROFILE_DOCUMENT_SUCCESS,
        payload: {
          documentDetails,
        },
      });
    } catch (error) {
      console.log(error);
      //logoutUser();
    }
    clearAlert();
  };
  const updateStudentProfileDocuments = async () => {
    dispatch({ type: UPDATE_PROFILE_DOCUMENT_BEGIN });
    try {
      const {
        documentResume,
        documentPhoto,
        documentAadhar,
        documentAllDocument,
      } = state;
      const helper = {
        resume: documentResume,
        photo: documentPhoto,
        aadhar: documentAadhar,
        allDocument: documentAllDocument,
      };
      const { data } = await authFetch.patch(`/student/documentDetails`, {
        documentDetails: helper,
      });
      dispatch({
        type: UPDATE_PROFILE_DOCUMENT_SUCCESS,
        payload: {
          documentDetails: data?.documentDetails,
        },
      });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: UPDATE_PROFILE_DOCUMENT_ERROR,
        payload: { msg: error.response.data.message },
      });
      toast.error(`Error Updating Profile: ${error.response.data.message}`);
    }
    clearAlert();
  };
  const searchCompaniesByStudent = async () => {
    dispatch({ type: GET_COMPANIESBYSTUDENT_BEGIN });
    try {
      const { data } = await authFetch(`/student/company`);
      const { companies } = data;
      dispatch({
        type: GET_COMPANIESBYSTUDENT_SUCCESS,
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
  const getCompanyByIdByStudent = async (id) => {
    dispatch({ type: GET_COMPANIESBYIDBYSTUDENT_BEGIN });
    try {
      const { data } = await authFetch(`/student/company/${id}`);
      console.log(data);
      const { company } = data;
      console.log(company);
      dispatch({
        type: GET_COMPANIESBYIDBYSTUDENT_SUCCESS,
        payload: {
          company,
        },
      });
    } catch (error) {
      console.log(error);
      //logoutUser();
    }
    clearAlert();
  };
  const searchJobsByStudent = async () => {
    dispatch({ type: GET_JOBSBYSTUDENT_BEGIN });
    try {
      const { data } = await authFetch(`/student/job`);
      const { jobs } = data;
      dispatch({
        type: GET_JOBSBYSTUDENT_SUCCESS,
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
  const getJobsByIdByStudent = async (id) => {
    dispatch({ type: GET_JOBSBYIDBYSTUDENT_BEGIN });
    try {
      const { data } = await authFetch(`/student/job/${id}`);
      const { job, applied } = data;
      dispatch({
        type: GET_JOBSBYIDBYSTUDENT_SUCCESS,
        payload: {
          job,
          applied,
        },
      });
    } catch (error) {
      console.log(error);
      //logoutUser();
    }
    clearAlert();
  };

  const applyJobByStudent = async ({ jobId }) => {
    dispatch({ type: APPLY_JOBBYSTUDENT_BEGIN });
    try {
      const { data } = await authFetch.patch(`/student/apply/${jobId}`);
      const { message, job } = data;
      dispatch({
        type: APPLY_JOBBYSTUDENT_SUCCESS,
        payload: {
          job,
        },
      });
      toast.success(message);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: APPLY_JOBBYSTUDENT_ERROR,
        payload: { msg: error.response.data.message },
      });
      toast.error(`Error Creating Admin: ${error.response.data.message}`);
    }
    clearAlert();
  };
  const getStatsByStudent = async () => {
    dispatch({ type: GET_STATSBYSTUDENT_BEGIN });
    try {
      const { data } = await authFetch(`/student/stats`);
      const filledPercentage = await authFetch(
        `/student/calculateProfileFilledPercentage`
      );
      const jobCalendar = await authFetch(`/student/jobsCalendar`);
      const { stats } = data;
      dispatch({
        type: GET_STATSBYSTUDENT_SUCCESS,
        payload: {
          stats,
          filledPercentageStudent: filledPercentage.data.filledPercentage,
          jobsCalendarStudent: jobCalendar.data.events,
        },
      });
    } catch (error) {
      console.log(error);
      //logoutUser();
    }
    clearAlert();
  };
  //company side
  const getCompanyByIdByCompany = async (id) => {
    dispatch({ type: GET_COMPANIESBYIDBYCOMPANY_BEGIN });
    try {
      const { data } = await authFetch(`/company/${id}`);
      console.log(data);
      const { company } = data;
      console.log(company);
      dispatch({
        type: GET_COMPANIESBYIDBYCOMPANY_SUCCESS,
        payload: {
          company,
        },
      });
    } catch (error) {
      console.log(error);
      //logoutUser();
    }
    clearAlert();
  };

  const updateCompanyProfile = async (id) => {
    dispatch({ type: UPDATE_PROFILEBYCOMPANY_BEGIN });
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

      const { data } = await authFetch.patch(`/company/${id}`, {
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
      const { company } = data;
      dispatch({
        type: UPDATE_PROFILEBYCOMPANY_SUCCESS,
        payload: {
          company,
        },
      });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: UPDATE_PROFILEBYCOMPANY_ERROR,
        payload: { msg: error.response.data.message },
      });
      toast.error(`Error Updating Profile: ${error.response.data.message}`);
    }
    clearAlert();
  };
  const searchJobsByCompany = async () => {
    dispatch({ type: GET_JOBSBYCOMPANY_BEGIN });
    try {
      const { data } = await authFetch(`/company/job`);
      const { jobs } = data;
      console.log(jobs);
      dispatch({
        type: GET_JOBSBYCOMPANY_SUCCESS,
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
  const getJobsByIdByCompany = async (id) => {
    dispatch({ type: GET_JOBSBYIDBYCOMPANY_BEGIN });
    try {
      const { data } = await authFetch(`/company/job/${id}`);
      const { job } = data;
      console.log(job);
      dispatch({
        type: GET_JOBSBYIDBYCOMPANY_SUCCESS,
        payload: {
          job,
        },
      });
    } catch (error) {
      console.log(error);
      //logoutUser();
    }
    clearAlert();
  };
  const getStudentByIdByCompany = async (id) => {
    console.log(id);
    dispatch({ type: GET_STUDENTSBYIDBYCOMPANY_BEGIN });
    try {
      const { data } = await authFetch(`/company/student/${id}`);
      console.log(data);
      const { student } = data;
      dispatch({
        type: GET_STUDENTSBYIDBYCOMPANY_SUCCESS,
        payload: {
          student,
        },
      });
    } catch (error) {
      console.log(error);
      //logoutUser();
    }
    clearAlert();
  };
  const createJobDrive = async () => {
    dispatch({ type: CREATE_JOBDRIVEBYCOMPANY_BEGIN });
    try {
      const {
        jobDriveDesignations,
        jobDriveLocations,
        jobDriveStreams,
        jobDrivePrograms,
        jobDriveStartDate,
        jobDriveEndDate,
        jobDriveEligibilityCriteriaBacklog,
        jobDriveEligibilityCriteriaCgpa,
        jobDriveDriveDate,
        jobDrivePackageValueMin,
        jobDrivePackageValueMax,
        jobDriveDescription,
        jobPdfLink,
      } = state;

      const { data } = await authFetch.post(`/company/job`, {
        designations: jobDriveDesignations,
        locations: jobDriveLocations,
        streams: jobDriveStreams,
        programs: jobDrivePrograms,
        startDate: jobDriveStartDate,
        lastDate: jobDriveEndDate,
        eligibilityCriteria: {
          backlog: jobDriveEligibilityCriteriaBacklog,
          cgpa: jobDriveEligibilityCriteriaCgpa,
        },
        driveDate: jobDriveDriveDate,
        packageValue: {
          min: jobDrivePackageValueMin,
          max: jobDrivePackageValueMax,
        },
        description: jobDriveDescription,
        pdfLink: jobPdfLink,
      });
      const { message } = data;
      dispatch({
        type: CREATE_JOBDRIVEBYCOMPANY_SUCCESS,
      });
      toast.success(message);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOBDRIVEBYCOMPANY_ERROR,
        payload: { msg: error.response.data.message },
      });
      toast.error(`Error Creating Job: ${error.response.data.message}`);
    }
    clearAlert();
  };
  const updateJobDrive = async (id) => {
    dispatch({ type: UPDATE_JOBDRIVEBYCOMPANY_BEGIN });
    try {
      const {
        jobDriveDesignations,
        jobDriveLocations,
        jobDriveStreams,
        jobDrivePrograms,
        jobDriveStartDate,
        jobDriveEndDate,
        jobDriveEligibilityCriteriaBacklog,
        jobDriveEligibilityCriteriaCgpa,
        jobDriveDriveDate,
        jobDrivePackageValueMin,
        jobDrivePackageValueMax,
        jobDriveDescription,
        jobPdfLink,
      } = state;

      const { data } = await authFetch.patch(`/company/job/${id}`, {
        designations: jobDriveDesignations,
        locations: jobDriveLocations,
        streams: jobDriveStreams,
        programs: jobDrivePrograms,
        startDate: jobDriveStartDate,
        lastDate: jobDriveEndDate,
        eligibilityCriteria: {
          backlog: jobDriveEligibilityCriteriaBacklog,
          cgpa: jobDriveEligibilityCriteriaCgpa,
        },
        driveDate: jobDriveDriveDate,
        packageValue: {
          min: jobDrivePackageValueMin,
          max: jobDrivePackageValueMax,
        },
        description: jobDriveDescription,
        pdfLink: jobPdfLink,
      });
      const { job } = data;
      dispatch({
        type: UPDATE_JOBDRIVEBYCOMPANY_SUCCESS,
        payload: {
          job,
        },
      });
      toast.success("Job Updated Successfully");
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: UPDATE_JOBDRIVEBYCOMPANY_ERROR,
        payload: { msg: error.response.data.message },
      });
      toast.error(`Error Updating Job: ${error.response.data.message}`);
    }
    clearAlert();
  };
  const actionForStudentForJobDrive = async ({ studentId }) => {
    dispatch({ type: ACTIONON_JOBDRIVEBYCOMPANY_BEGIN });
    try {
      const { actionJobAction, actionJobProfile, actionJobPackage } = state;
      console.log(studentId);
      const { data } = await authFetch.patch(`/company/action/${studentId}`, {
        action: actionJobAction,
        jobProfile: actionJobProfile,
        jobPackage: actionJobPackage,
      });
      const { message } = data;
      dispatch({
        type: ACTIONON_JOBDRIVEBYCOMPANY_SUCCESS,
      });
      toast.success(message);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ACTIONON_JOBDRIVEBYCOMPANY_ERROR,
        payload: { msg: error.response.data.message },
      });
      toast.error(`Error deleting Job: ${error.response.data.message}`);
    }
    clearAlert();
  };
  const deleteJobDrive = async (id) => {
    dispatch({ type: DELETE_JOBDRIVEBYCOMPANY_BEGIN });
    try {
      const { data } = await authFetch.delete(`/company/job/${id}`);
      const { message } = data;
      dispatch({
        type: DELETE_JOBDRIVEBYCOMPANY_SUCCESS,
      });
      toast.success(message);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_JOBDRIVEBYCOMPANY_ERROR,
        payload: { msg: error.response.data.message },
      });
      toast.error(`Error deleting Job: ${error.response.data.message}`);
    }
    clearAlert();
  };
  const getStatsByCompany = async () => {
    dispatch({ type: GET_STATSBYCOMPANY_BEGIN });
    try {
      const { data } = await authFetch(`/company/stats`);
      const { stats } = data;
      console.log(stats);
      dispatch({
        type: GET_STATSBYCOMPANY_SUCCESS,
        payload: {
          stats,
        },
      });
    } catch (error) {
      console.log(error);
      //logoutUser();
    }
    clearAlert();
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        handleChange,
        handleUpdateStateValues,
        pdfUpload,
        imageUpload,
        registerUser,
        loginUser,
        logoutUser,
        forgotPassword,
        searchStudentsByAdmin,
        getStudentByIdByAdmin,
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
        sendMessageOnMail,
        getStatsByAdmin,
        // STUDENT SIDE
        getStudentByIdByStudent,
        getCSVDataByStudent,
        getStudentProfileBasics,
        updateStudentProfileBasics,
        getStudentProfilePersonal,
        updateStudentProfilePersonal,
        getStudentProfileAcademic,
        updateStudentProfileAcademic,
        getStudentProfileProfessional,
        updateStudentProfileProfessional,
        getStudentProfileDocuments,
        updateStudentProfileDocuments,
        searchCompaniesByStudent,
        getCompanyByIdByStudent,
        searchJobsByStudent,
        getJobsByIdByStudent,
        applyJobByStudent,
        getStatsByStudent,
        //COMPANY SIDE
        getCompanyByIdByCompany,
        updateCompanyProfile,
        searchJobsByCompany,
        getJobsByIdByCompany,
        getStudentByIdByCompany,
        createJobDrive,
        updateJobDrive,
        deleteJobDrive,
        actionForStudentForJobDrive,
        getStatsByCompany,
        getCSVDataByCompany,
        getCSVDataByAdmin,
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

import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  HANDLE_CHANGE,
  LOGOUT_USER,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  GET_STUDENTSBYADMIN_BEGIN,
  GET_STUDENTSBYADMIN_SUCCESS,
  GET_PROFILE_BEGIN,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE_BEGIN,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  CREATE_ADMIN_ERROR,
  CREATE_ADMIN_SUCCESS,
  CREATE_ADMIN_BEGIN,
  CREATE_COMPANY_BEGIN,
  CREATE_COMPANY_SUCCESS,
  CREATE_COMPANY_ERROR,
  GET_STUDENTSBYIDBYADMIN_BEGIN,
  GET_STUDENTSBYIDBYADMIN_SUCCESS,
  GET_COMPANIESBYIDBYADMIN_BEGIN,
  GET_COMPANIESBYIDBYADMIN_SUCCESS,
  GET_COMPANIESBYADMIN_BEGIN,
  GET_COMPANIESBYADMIN_SUCCESS,
  GET_JOBSBYADMIN_BEGIN,
  GET_JOBSBYADMIN_SUCCESS,
  GET_JOBSBYIDBYADMIN_BEGIN,
  GET_JOBSBYIDBYADMIN_SUCCESS,
  VERIFY_JOB_BEGIN,
  VERIFY_JOB_SUCCESS,
  VERIFY_JOB_ERROR,
  SEND_NOTIFICATION_BEGIN,
  SEND_NOTIFICATION_ERROR,
  SEND_NOTIFICATION_SUCCESS,
  VERIFY_STUDENT_BEGIN,
  VERIFY_STUDENT_SUCCESS,
  VERIFY_STUDENT_ERROR,
  UPDATE_PROFILE_PERSONAL_BEGIN,
  UPDATE_PROFILE_PERSONAL_SUCCESS,
  UPDATE_PROFILE_PERSONAL_ERROR,
  GET_PROFILE_PERSONAL_BEGIN,
  GET_PROFILE_PERSONAL_SUCCESS,
  UPDATE_PROFILE_ACADEMIC_ERROR,
  UPDATE_PROFILE_ACADEMIC_SUCCESS,
  UPDATE_PROFILE_ACADEMIC_BEGIN,
  GET_PROFILE_ACADEMIC_SUCCESS,
  GET_PROFILE_ACADEMIC_BEGIN,
  UPDATE_STATE_VALUES,
  UPDATE_PROFILE_PROFESSIONAL_ERROR,
  UPDATE_PROFILE_PROFESSIONAL_SUCCESS,
  UPDATE_PROFILE_PROFESSIONAL_BEGIN,
  GET_PROFILE_PROFESSIONAL_SUCCESS,
  GET_PROFILE_PROFESSIONAL_BEGIN,
  START_LOADING,
  STOP_LOADING,
  SET_UPLOAD_PROGRESS,
  SET_IMAGE_URL,
  SET_PDF_URL,
  UPDATE_PROFILE_DOCUMENT_ERROR,
  UPDATE_PROFILE_DOCUMENT_SUCCESS,
  UPDATE_PROFILE_DOCUMENT_BEGIN,
  GET_PROFILE_DOCUMENT_SUCCESS,
  GET_PROFILE_DOCUMENT_BEGIN,
  UPDATE_PROFILE_BASIC_ERROR,
  UPDATE_PROFILE_BASIC_SUCCESS,
  UPDATE_PROFILE_BASIC_BEGIN,
  GET_PROFILE_BASIC_SUCCESS,
  GET_PROFILE_BASIC_BEGIN,
  GET_COMPANIESBYSTUDENT_BEGIN,
  GET_COMPANIESBYSTUDENT_SUCCESS,
  GET_COMPANIESBYIDBYSTUDENT_BEGIN,
  GET_COMPANIESBYIDBYSTUDENT_SUCCESS,
  GET_JOBSBYSTUDENT_BEGIN,
  GET_JOBSBYSTUDENT_SUCCESS,
  GET_JOBSBYIDBYSTUDENT_BEGIN,
  GET_JOBSBYIDBYSTUDENT_SUCCESS,
  APPLY_JOBBYSTUDENT_BEGIN,
  APPLY_JOBBYSTUDENT_SUCCESS,
  APPLY_JOBBYSTUDENT_ERROR,
  GET_STATSBYSTUDENT_SUCCESS,
  GET_STATSBYSTUDENT_BEGIN,
} from "./actions";
import { initialState } from "./appContext";
const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: action.payload.alertType,
        alertText: action.payload.alertText,
      };
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertText: "",
        alertType: "",
      };
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case SET_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: action.payload.progress,
      };
    case SET_IMAGE_URL:
      return {
        ...state,
        imageUrl: action.payload.downloadURL,
      };
    case SET_PDF_URL:
      return {
        ...state,
        pdfUrl: action.payload.downloadURL,
      };
    case REGISTER_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        specificStudent: action?.payload?.user,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "User registered successfully! Redirecting...",
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "error",
        alertText: action.payload.msg,
      };
    case LOGIN_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action?.payload?.user,
        name: action?.payload?.user?.name,
        email: action?.payload?.user?.email,
        avatar: action?.payload?.user?.avatar,
        gender: action?.payload?.user?.gender,
        designation: action?.payload?.user?.designation,
        phone: action?.payload?.user?.phone,
        aadharno: action?.payload?.user?.aadharno,
        specificStudent: action?.payload?.user,
        token: action.payload.token,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "User logged in successfully! Redirecting...",
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "error",
        alertText: action.payload.msg,
      };
    case LOGOUT_USER:
      return {
        ...initialState,
        user: null,
        token: null,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "User logged out successfully! Redirecting...",
      };
    case HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case UPDATE_STATE_VALUES:
      return { ...state, [action.payload.name]: action.payload.value };
    case GET_PROFILE_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        name:
          action?.payload?.user?.name === undefined
            ? ""
            : action?.payload?.user?.name,
        email:
          action?.payload?.user?.email === undefined
            ? ""
            : action?.payload?.user?.email,
        avatar:
          action?.payload?.user?.avatar === undefined
            ? ""
            : action?.payload?.user?.avatar,
        gender:
          action?.payload?.user?.gender === undefined
            ? "Male"
            : action?.payload?.user?.gender,
        designation:
          action?.payload?.user?.designation === undefined
            ? ""
            : action?.payload?.user?.designation,
        phone:
          action?.payload?.user?.phone === undefined
            ? ""
            : action?.payload?.user?.phone,
        aadharno:
          action?.payload?.user?.aadharno === undefined
            ? ""
            : action?.payload?.user?.aadharno,
        isLoading: false,
      };
    case UPDATE_PROFILE_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action?.payload?.user,
        name: action?.payload?.user?.name,
        email: action?.payload?.user?.email,
        avatar: action?.payload?.user?.avatar,
        gender: action?.payload?.user?.gender,
        designation: action?.payload?.user?.designation,
        phone: action?.payload?.user?.phone,
        aadharno: action?.payload?.user?.aadharno,
        token: action?.payload?.token,
        password: "",
        confirmPassword: "",
        newPassword: "",
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "User profile updated successfully! Redirecting...",
      };
    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "error",
        alertText: action.payload.msg,
      };
    case CREATE_ADMIN_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case CREATE_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        name: "",
        email: "",
        password: "",
      };
    case CREATE_ADMIN_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "error",
        alertText: action.payload.msg,
      };
    case CREATE_COMPANY_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case CREATE_COMPANY_SUCCESS:
      return {
        ...state,
        isLoading: false,
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
      };
    case CREATE_COMPANY_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "error",
        alertText: action.payload.msg,
      };
    case GET_STUDENTSBYADMIN_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case GET_STUDENTSBYADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        studentsByAdmin: action.payload.students,
      };
    case GET_STUDENTSBYIDBYADMIN_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case GET_STUDENTSBYIDBYADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        specificStudent: action.payload.student,
      };
    case GET_COMPANIESBYADMIN_BEGIN || GET_COMPANIESBYSTUDENT_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case GET_COMPANIESBYADMIN_SUCCESS || GET_COMPANIESBYSTUDENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        companiesByStudent: action.payload.companies,
        companiesByAdmin: action.payload.companies,
      };
    case GET_COMPANIESBYIDBYADMIN_BEGIN || GET_COMPANIESBYIDBYSTUDENT_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case GET_COMPANIESBYIDBYADMIN_SUCCESS || GET_COMPANIESBYIDBYSTUDENT_SUCCESS:
      console.log(action.payload.company);
      return {
        ...state,
        isLoading: false,
        specificCompany: action.payload.company,
      };
    case GET_JOBSBYADMIN_BEGIN || GET_JOBSBYSTUDENT_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case GET_JOBSBYADMIN_SUCCESS || GET_JOBSBYSTUDENT_SUCCESS:
      console.log(action.payload.jobs);
      return {
        ...state,
        isLoading: false,
        jobsByStudent: action.payload.jobs,
        jobsByAdmin: action.payload.jobs,
      };
    case GET_JOBSBYIDBYADMIN_BEGIN || GET_JOBSBYIDBYSTUDENT_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case GET_JOBSBYIDBYADMIN_SUCCESS || GET_JOBSBYIDBYSTUDENT_SUCCESS:
      console.log(action.payload.job);
      return {
        ...state,
        isLoading: false,
        specificJob: action.payload.job,
      };
    case VERIFY_JOB_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case VERIFY_JOB_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case VERIFY_JOB_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "error",
        alertText: action.payload.msg,
      };
    case VERIFY_STUDENT_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case VERIFY_STUDENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case VERIFY_STUDENT_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "error",
        alertText: action.payload.msg,
      };
    case SEND_NOTIFICATION_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case SEND_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case SEND_NOTIFICATION_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "error",
        alertText: action.payload.msg,
      };
    // STUDENT SIDE:
    case GET_PROFILE_BASIC_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PROFILE_BASIC_SUCCESS:
      return {
        ...state,
        name: action?.payload?.basicDetails?.name,
        enrollmentNo: action?.payload?.basicDetails?.enrollmentNo,
        about: action?.payload?.basicDetails?.about,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Profile updated successfully!",
      };
    case UPDATE_PROFILE_BASIC_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_PROFILE_BASIC_SUCCESS:
      return {
        ...state,
        name: action?.payload?.basicDetails?.name,
        enrollmentNo: action?.payload?.basicDetails?.enrollmentNo,
        about: action?.payload?.basicDetails?.about,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Profile updated successfully!",
      };
    case UPDATE_PROFILE_BASIC_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "error",
        alertText: action.payload.msg,
      };

    case GET_PROFILE_PERSONAL_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PROFILE_PERSONAL_SUCCESS:
      return {
        ...state,
        dob: action?.payload?.personalDetails?.dob,
        gender: action?.payload?.personalDetails?.gender,
        contactNo: action?.payload?.personalDetails?.contactNo,
        aadharNo: action?.payload?.personalDetails?.aadharNo,
        program: action?.payload?.personalDetails?.program,
        stream: action?.payload?.personalDetails?.stream,
        collegeName: action?.payload?.personalDetails?.collegeName,
        universityName: action?.payload?.personalDetails?.universityName,
        fatherName: action?.payload?.personalDetails?.fatherName,
        motherName: action?.payload?.personalDetails?.motherName,
        currentAddress: action?.payload?.personalDetails?.currentAddress,
        permanentAddress: action?.payload?.personalDetails?.permanentAddress,
        pincode: action?.payload?.personalDetails?.pincode,
        homeCity: action?.payload?.personalDetails?.homeCity,
        homeState: action?.payload?.personalDetails?.homeState,
        homeCountry: action?.payload?.personalDetails?.homeCountry,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Profile updated successfully!",
      };
    case UPDATE_PROFILE_PERSONAL_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_PROFILE_PERSONAL_SUCCESS:
      return {
        ...state,
        dob: action?.payload?.personalDetails?.dob,
        gender: action?.payload?.personalDetails?.gender,
        contactNo: action?.payload?.personalDetails?.contactNo,
        aadharNo: action?.payload?.personalDetails?.aadharNo,
        program: action?.payload?.personalDetails?.program,
        stream: action?.payload?.personalDetails?.stream,
        collegeName: action?.payload?.personalDetails?.collegeName,
        universityName: action?.payload?.personalDetails?.universityName,
        fatherName: action?.payload?.personalDetails?.fatherName,
        motherName: action?.payload?.personalDetails?.motherName,
        currentAddress: action?.payload?.personalDetails?.currentAddress,
        permanentAddress: action?.payload?.personalDetails?.permanentAddress,
        pincode: action?.payload?.personalDetails?.pincode,
        homeCity: action?.payload?.personalDetails?.homeCity,
        homeState: action?.payload?.personalDetails?.homeState,
        homeCountry: action?.payload?.personalDetails?.homeCountry,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Profile updated successfully!",
      };
    case UPDATE_PROFILE_PERSONAL_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "error",
        alertText: action.payload.msg,
      };
    case GET_PROFILE_ACADEMIC_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PROFILE_ACADEMIC_SUCCESS:
      return {
        ...state,
        academicDetails: action?.payload?.academicDetails,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Profile updated successfully!",
      };
    case UPDATE_PROFILE_ACADEMIC_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_PROFILE_ACADEMIC_SUCCESS:
      return {
        ...state,
        academicDetails: action?.payload?.academicDetails,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Profile updated successfully!",
      };
    case UPDATE_PROFILE_ACADEMIC_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "error",
        alertText: action.payload.msg,
      };
    case GET_PROFILE_PROFESSIONAL_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PROFILE_PROFESSIONAL_SUCCESS:
      return {
        ...state,
        professionalDetails: action?.payload?.professionalDetails,
        professionalExperiences:
          action?.payload?.professionalDetails?.experiences,
        professionalProjects: action?.payload?.professionalDetails?.projects,
        professionalCertifications:
          action?.payload?.professionalDetails?.certifications,
        professionalSkills: action?.payload?.professionalDetails?.skills,
        professionalLinks: action?.payload?.professionalDetails?.links,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Profile updated successfully!",
      };
    case UPDATE_PROFILE_PROFESSIONAL_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_PROFILE_PROFESSIONAL_SUCCESS:
      return {
        ...state,
        professionalDetails: action?.payload?.professionalDetails,
        professionalExperiences:
          action?.payload?.professionalDetails?.experiences,
        professionalProjects: action?.payload?.professionalDetails?.projects,
        professionalCertifications:
          action?.payload?.professionalDetails?.certifications,
        professionalSkills: action?.payload?.professionalDetails?.skills,
        professionalLinks: action?.payload?.professionalDetails?.links,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Profile updated successfully!",
      };
    case UPDATE_PROFILE_PROFESSIONAL_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "error",
        alertText: action.payload.msg,
      };

    case GET_PROFILE_DOCUMENT_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PROFILE_DOCUMENT_SUCCESS:
      return {
        ...state,
        documentDetails: action?.payload?.documentDetails,
        documentResume: action?.payload?.documentDetails?.resume,
        documentPhoto: action?.payload?.documentDetails?.photo,
        documentAadhar: action?.payload?.documentDetails?.aadhar,
        documentAllDocument: action?.payload?.documentDetails?.allDocument,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Profile updated successfully!",
      };
    case UPDATE_PROFILE_DOCUMENT_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_PROFILE_DOCUMENT_SUCCESS:
      return {
        ...state,
        documentDetails: action?.payload?.documentDetails,
        documentResume: action?.payload?.documentDetails?.resume,
        documentPhoto: action?.payload?.documentDetails?.photo,
        documentAadhar: action?.payload?.documentDetails?.aadhar,
        documentAllDocument: action?.payload?.documentDetails?.allDocument,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Profile updated successfully!",
      };
    case UPDATE_PROFILE_DOCUMENT_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "error",
        alertText: action.payload.msg,
      };
    case GET_COMPANIESBYSTUDENT_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case GET_COMPANIESBYSTUDENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        companiesByStudent: action.payload.companies,
      };
    case GET_COMPANIESBYIDBYSTUDENT_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case GET_COMPANIESBYIDBYSTUDENT_SUCCESS:
      console.log(action.payload.company);
      return {
        ...state,
        isLoading: false,
        specificCompany: action.payload.company,
      };
    case GET_JOBSBYSTUDENT_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case GET_JOBSBYSTUDENT_SUCCESS:
      console.log(action.payload.jobs);
      return {
        ...state,
        isLoading: false,
        jobsByStudent: action.payload.jobs,
      };
    case GET_JOBSBYIDBYSTUDENT_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case GET_JOBSBYIDBYSTUDENT_SUCCESS:
      console.log(action.payload.job);
      return {
        ...state,
        isLoading: false,
        specificJob: action.payload.job,
        specificJobApplied: action.payload.applied,
      };
    case APPLY_JOBBYSTUDENT_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case APPLY_JOBBYSTUDENT_SUCCESS:
      return {
        ...state,
        specificJob: action.payload.job,
        isLoading: false,
        showAlert: true,
        alertType: "success",
        alertText: "Applied successfully!",
      };
    case APPLY_JOBBYSTUDENT_ERROR:
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: "error",
        alertText: action.payload.msg,
      };
    case GET_STATSBYSTUDENT_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case GET_STATSBYSTUDENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        statsForStudent: action.payload.stats,
        filledPercentageStudent: action.payload.filledPercentage,
        jobsCalendarStudent: action.payload.jobsCalendarStudent,
      };
    default:
      throw new Error(`no such action :${action.type}`);
  }
};
export default reducer;

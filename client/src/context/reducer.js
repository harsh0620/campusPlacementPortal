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
    case GET_COMPANIESBYADMIN_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case GET_COMPANIESBYADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        companiesByAdmin: action.payload.companies,
      };
    case GET_COMPANIESBYIDBYADMIN_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case GET_COMPANIESBYIDBYADMIN_SUCCESS:
      console.log(action.payload.company);
      return {
        ...state,
        isLoading: false,
        specificCompany: action.payload.company,
      };
    case GET_JOBSBYADMIN_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case GET_JOBSBYADMIN_SUCCESS:
      console.log(action.payload.jobs);
      return {
        ...state,
        isLoading: false,
        jobsByAdmin: action.payload.jobs,
      };
    case GET_JOBSBYIDBYADMIN_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case GET_JOBSBYIDBYADMIN_SUCCESS:
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
    default:
      throw new Error(`no such action :${action.type}`);
  }
};
export default reducer;

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
    case GET_STUDENTSBYADMIN_BEGIN:
      return { ...state, isLoading: true, showAlert: false };
    case GET_STUDENTSBYADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        studentsByAdmin: action.payload.students,
      };
    default:
      throw new Error(`no such action :${action.type}`);
  }
};
export default reducer;

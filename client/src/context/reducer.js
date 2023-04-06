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
        user: action.payload.user,
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
    default:
      throw new Error(`no such action :${action.type}`);
  }
};
export default reducer;

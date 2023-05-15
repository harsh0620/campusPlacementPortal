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
  gender: "Male",
  designation: "",
  phone: "",
  aadharno: "",
  studentsByAdmin: [],
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
      const response = await axios.post("/api/v1/auth/register", currentUser);
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
  const searchStudentsByAdmin = async ({
    name,
    enrollmentNo,
    email,
    gender,
    stream,
    verified,
    selectedIn,
  }) => {
    let url = `/admin/students?name=${name}@enrollmentNo=${enrollmentNo}@email=${email}&gender=${gender}&stream=${stream}&
    verified=${verified}&selectedIn=${selectedIn}`;
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
        getAdminDetails,
        updateProfile,
        updatePassword,
        createAdmin,
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

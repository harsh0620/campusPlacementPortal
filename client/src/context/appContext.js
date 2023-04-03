import React, { useReducer, useContext } from "react";
import axios from "axios";
import reducer from "./reducer";
import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

export const initialState = {};
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const registerUser = async (user) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", user);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: REGISTER_USER_ERROR, payload: error.response.data });
    }
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        registerUser,
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

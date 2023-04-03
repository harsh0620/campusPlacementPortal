import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from "./actions";
import { initialState } from "./appContext";
const reducer = (state, action) => {
  switch (action.type) {
    case REGISTER_USER_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      throw new Error(`no such action :${action.type}`);
  }
};
export default reducer;

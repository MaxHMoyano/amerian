import { userConstants } from "../constants";

let user = JSON.parse(sessionStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : { loggedIn: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggingIn: false,
        welcomePage: false,
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_WELCOME:
      return {
        ...state,
        loggedIn: true,
        welcomePage: true,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case userConstants.LOGOUT:
      return {};
    case userConstants.CLEAR_LOGIN_ERROR:
      return {
        ...state,
        error: "",
      };
    default:
      return state;
  }
};

import { userConstants } from "../constants";

let INITIAL_STATE = {
  current: "",
  error: "",
  pending: false
};

export default (state = INITIAL_STATE, { type, payload, error }) => {
  switch (type) {
    case userConstants.GET_USER_REQUEST:
      return {
        ...state,
        pending: true
      };
    case userConstants.GET_USER_SUCCESS:
      return {
        ...state,
        current: payload,
        pending: false,
      };
    case userConstants.GET_USER_ERROR:
      return {
        ...state,
        error: error,
        pending: false
      };
    default:
      return state;
  }
};
import { clientsConstants } from "../constants";

let INITIAL_STATE = {
  payload: [],
  error: "",
  pending: false
};

export default (state = INITIAL_STATE, { type, payload, error }) => {
  switch (type) {
    case clientsConstants.FETCH_CLIENTS_REQUEST:
      return {
        ...state,
        pending: true
      };
    case clientsConstants.FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        payload,
        pending: false,
      };
    case clientsConstants.FETCH_CLIENTS_ERROR:
      return {
        ...state,
        error: error,
        pending: false
      };
    default:
      return state;
  }
};
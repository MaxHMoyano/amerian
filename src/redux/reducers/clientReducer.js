import { clientConstants } from "../constants";

let INITIAL_STATE = {
  results: [],
  error: "",
  pending: false
};

export default (state = INITIAL_STATE, { type, payload, error }) => {
  switch (type) {
    case clientConstants.FETCH_CLIENTS_REQUEST:
      return {
        ...state,
        pending: true
      };
    case clientConstants.FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        results: payload,
        pending: false,
      };
    case clientConstants.FETCH_CLIENTS_ERROR:
      return {
        ...state,
        error: error,
        pending: false
      };
    default:
      return state;
  }
};
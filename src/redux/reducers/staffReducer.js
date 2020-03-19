import { staffConstants } from "../constants";

const initialState = {
  payload: [],
  error: "",
  pending: false
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {

    case staffConstants.FETCH_STAFF_REQUEST:
      return { ...state, pending: true };
    case staffConstants.FETCH_STAFF_SUCCESS:
      return { ...state, payload, pending: false };
    case staffConstants.FETCH_STAFF_ERROR:
      return { ...state, error, pending: false };

    default:
      return state;
  }
};

import { rateConstants } from "../constants";
const initialState = {
  results: [],
  pending: false,
  error: "",
  types: [],
  states: [],
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {

    case rateConstants.FETCH_RATES_REQUEST:
      return { ...state, pending: true };
    case rateConstants.FETCH_RATES_SUCCESS:
      return { ...state, pending: false, ...payload };
    case rateConstants.FETCH_RATES_ERROR:
      return { ...state, pending: false, error };
    case rateConstants.FETCH_RATES_TYPES_SUCCESS:
      return { ...state, types: payload };
    case rateConstants.FETCH_RATES_STATES_SUCCESS:
      return { ...state, states: payload };
    default:
      return state;
  }
};

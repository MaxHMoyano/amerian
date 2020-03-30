import { rateConstants } from "../constants";
const initialState = {
  results: [],
  pending: false,
  error: "",
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {

    case rateConstants.FETCH_RATES_REQUEST:
      return { ...state, pending: true };

    default:
      return state;
  }
};

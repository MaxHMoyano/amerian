import { currencyConstants } from "../constants";

let INITIAL_STATE = {
  payload: [],
  error: "",
  pending: false
};

export default (state = INITIAL_STATE, { type, payload, error }) => {
  switch (type) {
    case currencyConstants.FETCH_CURRENCIES_REQUEST:
      return {
        ...state,
        pending: true
      };
    case currencyConstants.FETCH_CURRENCIES_SUCCESS:
      return {
        ...state,
        payload,
        pending: false,
      };
    case currencyConstants.FETCH_CURRENCIES_ERROR:
      return {
        ...state,
        error: error,
        pending: false
      };
    default:
      return state;
  }
};
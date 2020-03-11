import { currenciesConstants } from "../constants";

let INITIAL_STATE = {
  list: [],
  error: "",
  pending: false
};

export default (state = INITIAL_STATE, { type, payload, error }) => {
  switch (type) {
    case currenciesConstants.FETCH_CURRENCIES_REQUEST:
      return {
        ...state,
        pending: true
      };
    case currenciesConstants.FETCH_CURRENCIES_SUCCESS:
      return {
        ...state,
        list: payload,
        pending: false,
      };
    case currenciesConstants.FETCH_CURRENCIES_ERROR:
      return {
        ...state,
        error: error,
        pending: false
      };
    default:
      return state;
  }
};
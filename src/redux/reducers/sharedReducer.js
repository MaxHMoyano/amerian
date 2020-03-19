import { sharedConstants } from "../constants";


const initialState = {
  countries: {
    payload: [],
    error: "",
    pending: false,
  },
  provinces: {
    payload: [],
    error: "",
    pending: false
  }
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {

    case sharedConstants.FETCH_COUNTRIES_REQUEST:
      return { ...state, countries: { ...state.countries, pending: true } };
    case sharedConstants.FETCH_COUNTRIES_SUCCESS:
      return { ...state, countries: { ...state.countries, payload, pending: false } };
    case sharedConstants.FETCH_COUNTRIES_ERROR:
      return { ...state, countries: { ...state.countries, error } };
    case sharedConstants.FETCH_PROVINCES_REQUEST:
      return { ...state, provinces: { ...state.provinces, pending: true } };
    case sharedConstants.FETCH_PROVINCES_SUCCESS:
      return { ...state, provinces: { ...state.provinces, payload, pending: false } };
    case sharedConstants.FETCH_PROVINCES_ERROR:
      return { ...state, provinces: { ...state.provinces, error, pending: false } };

    default:
      return state;
  }
};

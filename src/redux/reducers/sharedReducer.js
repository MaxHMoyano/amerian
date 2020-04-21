import { sharedConstants } from "../constants";


const initialState = {
  countries: {
    results: [],
    error: "",
    pending: false,
  },
  regions: {
    results: [],
    error: "",
    pending: false
  }
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {

    case sharedConstants.FETCH_COUNTRIES_REQUEST:
      return { ...state, countries: { ...state.countries, pending: true } };
    case sharedConstants.FETCH_COUNTRIES_SUCCESS:
      return { ...state, countries: { ...state.countries, pending: false, ...payload } };
    case sharedConstants.FETCH_COUNTRIES_ERROR:
      return { ...state, countries: { ...state.countries, error } };
    case sharedConstants.FETCH_REGIONS_REQUEST:
      return { ...state, regions: { ...state.regions, pending: true } };
    case sharedConstants.FETCH_REGIONS_SUCCESS:
      return { ...state, regions: { ...state.regions, ...payload, pending: false } };
    case sharedConstants.FETCH_REGIONS_ERROR:
      return { ...state, regions: { ...state.regions, error, pending: false } };

    default:
      return state;
  }
};

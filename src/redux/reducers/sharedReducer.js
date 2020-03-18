import { sharedConstants } from "../constants";


const initialState = {
  provinces: {
    payload: [],
    error: "",
    pending: false
  }
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {

    case sharedConstants.FETCH_PROVINCES_REQUEST:
      return { ...state, provinces: { ...state.provinces, pending: true } };
    case sharedConstants.FETCH_PROVINCES_SUCCESS:
      return { ...state, provinces: { ...state.provinces, payload } };
    case sharedConstants.FETCH_PROVINCES_ERROR:
      return { ...state, provinces: { ...state.provinces, error } };

    default:
      return state;
  }
};

import { hotelConstants } from '../constants/';

const INITIAL_STATE = {
  results: [],
  error: "",
  pending: false
};

export default (state = INITIAL_STATE, { type, payload, error }) => {
  switch (type) {
    case hotelConstants.FETCH_HOTELS_REQUEST:
      return {
        ...state,
        pending: true
      };
    case hotelConstants.FETCH_HOTELS_SUCCESS:
      return {
        ...state,
        ...payload,
        pending: false,
      };
    case hotelConstants.FETCH_HOTELS_ERROR:
      return {
        ...state,
        error: error,
        pending: false
      };
    default:
      return state;
  }
};

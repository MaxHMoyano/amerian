import { hotelsConstants } from '../constants/hotelsConstants';

const INITIAL_STATE = {
  list: [],
  error: "",
  pending: false
};

export default (state = INITIAL_STATE, { type, payload, error }) => {
  switch (type) {
    case hotelsConstants.FETCH_HOTELS_REQUEST:
      return {
        ...state,
        pending: true
      };
    case hotelsConstants.FETCH_HOTELS_SUCCESS:
      return {
        ...state,
        list: payload,
        pending: false,
      };
    case hotelsConstants.FETCH_HOTELS_ERROR:
      return {
        ...state,
        error: error,
        pending: false
      };
    default:
      return state;
  }
};

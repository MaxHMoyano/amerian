import { hotelConstants } from '../constants/';

const INITIAL_STATE = {
  results: [],
  error: '',
  pending: false,
  count: 0,
  current: null,
};

export default (state = INITIAL_STATE, { type, payload, error }) => {
  switch (type) {
    case hotelConstants.FETCH_HOTELS_REQUEST:
      return {
        ...state,
        pending: true,
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
        pending: false,
      };
    case hotelConstants.SET_CURRENT_HOTEL:
      return {
        ...state,
        current: payload,
      };
    case hotelConstants.EDIT_HOTEL_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case hotelConstants.EDIT_HOTEL_SUCCESS:
      return {
        ...state,
        pending: false,
      };
    case hotelConstants.EDIT_HOTEL_ERROR:
      return {
        ...state,
        error,
      };
    default:
      return state;
  }
};

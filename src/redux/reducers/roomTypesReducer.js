import { hotelsConstants } from '../constants/hotelsConstants';

const INITIAL_STATE = {
  payload: [],
  error: "",
  pending: false
};

export default (state = INITIAL_STATE, { type, payload, error }) => {
  switch (type) {
    case hotelsConstants.FETCH_ROOM_TYPES_REQUEST:
      return {
        ...state,
        pending: true
      };
    case hotelsConstants.FETCH_ROOM_TYPES_SUCCESS:
      return {
        ...state,
        payload,
        pending: false,
      };
    case hotelsConstants.FETCH_ROOM_TYPES_ERROR:
      return {
        ...state,
        error: error,
        pending: false
      };
    default:
      return state;
  }
};

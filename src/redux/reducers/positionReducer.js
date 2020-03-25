import { positionConstants } from '../constants/';

const initialState = {
  results: [],
  pending: false,
  error: ""
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {

    case positionConstants.FETCH_POSITIONS_REQUEST:
      return { ...state, pending: true };
    case positionConstants.FETCH_POSITIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        ...payload
      };
    case positionConstants.FETCH_POSITIONS_ERROR:
      return {
        ...state,
        pending: false,
        error,
      };
    case positionConstants.CLEAN_POSITIONS:
      return {
        results: [],
        pending: false,
        error: "",
      };

    default:
      return state;
  }
};

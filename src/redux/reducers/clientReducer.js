import { clientConstants } from '../constants';

let INITIAL_STATE = {
  types: [],
  results: [],
  error: '',
  current: null,
  pending: false,
  previous: null,
  next: null,
  count: 0,
};

export default (state = INITIAL_STATE, { type, payload, error }) => {
  switch (type) {
    case clientConstants.FETCH_CLIENTS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case clientConstants.FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        ...payload,
        pending: false,
      };
    case clientConstants.FETCH_CLIENTS_ERROR:
      return {
        ...state,
        error: error,
        pending: false,
      };
    case clientConstants.SET_CURRENT_CLIENT:
      return {
        ...state,
        current: payload,
      };
    case clientConstants.FETCH_CLIENT_TYPES_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case clientConstants.FETCH_CLIENT_TYPES_SUCCESS:
      return {
        ...state,
        types: payload,
        pending: false,
      };
    case clientConstants.FETCH_CLIENT_TYPES_ERROR:
      return {
        ...state,
        error: error,
        pending: false,
      };
    default:
      return state;
  }
};

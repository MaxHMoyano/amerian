import { hotelConstants } from "../constants";

const initialState = {
  payload: [],
  pending: false,
  error: "",
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {

    case hotelConstants.FETCH_CHAINS_REQUEST:
      return { ...state, pending: true };
    case hotelConstants.FETCH_CHAINS_SUCCESS:
      return { ...state, pending: false, payload };
    case hotelConstants.FETCH_CHAINS_ERRROR:
      return { ...state, pending: false, error };

    default:
      return state;
  }
};

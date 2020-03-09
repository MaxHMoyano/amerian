import { clientsConstants } from "../constants";

let INITIAL_STATE = {
  clients: [],
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case clientsConstants.GET_CLIENTS:
      return {
        ...state,
        clients: payload
      };
    default:
      return state;
  }
};
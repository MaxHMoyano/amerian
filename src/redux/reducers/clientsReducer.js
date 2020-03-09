import { clientsConstants } from "../constants";

let INITIAL_STATE = {
  clients: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case clientsConstants.GET_CLIENTS:
    default:
      return state;
  }
};
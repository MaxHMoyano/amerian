import { LOGIN, SET_LOADING } from "../actions/types";

const INITIAL_STATE = {
  isAuthenticated: true,
  isUserLoading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        isUserLoading: false
      };
    case SET_LOADING:
      return {
        ...state,
        isUserLoading: true
      };
    default:
      return state;
  }
};

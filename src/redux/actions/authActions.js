import { LOGIN, SET_LOADING } from "./types";

export const login = () => async dispatch => {
  dispatch(setLoading());
  setTimeout(() => {
    dispatch({
      type: LOGIN
    });
  }, 3000);
};

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

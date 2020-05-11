import { userConstants } from '../constants';

let INITIAL_STATE = {
  current: {
    rol: [2],
  },
  error: '',
  pending: false,
};

export default (state = INITIAL_STATE, { type, payload, error }) => {
  switch (type) {
    case userConstants.GET_USER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case userConstants.GET_USER_SUCCESS:
      return {
        ...state,
        current: payload,
        pending: false,
      };
    case userConstants.GET_USER_ERROR:
      return {
        ...state,
        error: error,
        pending: false,
      };
    case userConstants.SHOW_CONTENT_AS_IN_HOTEL:
      if (payload) {
        return {
          ...state,
          current: {
            ...state.current,
            rol: [...state.current.rol, 3],
          },
        };
      } else {
        return {
          ...state,
          current: {
            ...state.current,
            rol: state.current.rol.filter((e) => e !== 3),
          },
        };
      }
    default:
      return state;
  }
};

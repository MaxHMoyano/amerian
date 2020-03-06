import { hotelsConstants } from '../constants/hotelsConstants';

const INITIAL_STATE = {
  list: []
};
export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {

    case hotelsConstants.GET_HOTELS:
      return {
        ...state,
        list: payload
      };
    default:
      return state;
  }
};

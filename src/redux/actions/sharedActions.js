import { sharedConstants } from "../constants";
import { sharedService } from '../services';

export const sharedActions = {
  fetchProvinces
};

function fetchProvinces() {
  return (dispatch) => {
    dispatch({
      type: sharedConstants.FETCH_PROVINCES_REQUEST,
    });
    sharedService.fetchProvinces().then((payload) => {
      dispatch({
        type: sharedConstants.FETCH_PROVINCES_SUCCESS,
        payload,
      });
    }, (error) => {
      dispatch({
        type: sharedConstants.FETCH_PROVINCES_ERROR,
        error: error,
      });
    });
  };
}
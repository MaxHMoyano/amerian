import { sharedConstants } from "../constants";
import { sharedService } from '../services';

export const sharedActions = {
  fetchCountries,
  fetchProvinces,
};

function fetchCountries() {
  return (dispatch) => {
    dispatch({
      type: sharedConstants.FETCH_COUNTRIES_REQUEST,
    });
    sharedService.fetchCountries().then((payload) => {
      dispatch({
        type: sharedConstants.FETCH_COUNTRIES_SUCCESS,
        payload,
      });
    }, (error) => {
      dispatch({
        type: sharedConstants.FETCH_COUNTRIES_ERROR,
        error: error,
      });
    });
  };
}

function fetchProvinces(countryId) {
  return (dispatch) => {
    dispatch({
      type: sharedConstants.FETCH_PROVINCES_REQUEST,
    });
    sharedService.fetchProvinces(countryId).then((payload) => {
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
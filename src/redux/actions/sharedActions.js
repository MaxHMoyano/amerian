import { sharedConstants } from "../constants";
import { sharedService } from '../services';

export const sharedActions = {
  fetchCountries,
  fetchRegions,
  fetchRegion,
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

function fetchRegions(countryId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: sharedConstants.FETCH_REGIONS_REQUEST,
      });
      sharedService.fetchRegions(countryId).then((payload) => {
        dispatch({
          type: sharedConstants.FETCH_REGIONS_SUCCESS,
          payload,
        });
        resolve();
      }, (error) => {
        dispatch({
          type: sharedConstants.FETCH_REGIONS_ERROR,
          error: error,
        });
      });
    });
  };
}

function fetchRegion(countryId, regionId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      sharedService.fetchRegion(countryId, regionId).then((region) => {
        resolve(region);
      });
    });
  };
}
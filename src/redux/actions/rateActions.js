import { rateConstants } from "../constants";
import { rateService } from "../services/rateService";

export const rateActions = {
  fetchRates,
  createRate,
  fetchRateTypes,
  fetchRateStates,
};

function fetchRates() {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(request());
      rateService.fetchRates().then((rates) => {
        Promise.all(rates.results.map(getRateData)).then((data) => {
          rates.results = data;
          dispatch(success(rates));
          resolve();
        });
      }, error => {
        dispatch(failure(error));
        reject(error);
      });
    });
  };

  function request() {
    return {
      type: rateConstants.FETCH_RATES_REQUEST
    };
  }

  function success(rates) {
    return {
      type: rateConstants.FETCH_RATES_SUCCESS,
      payload: rates
    };
  }

  function failure(error) {
    return {
      type: rateConstants.FETCH_RATES_ERROR,
      error,
    };
  }
}

function createRate(rate) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      rateService.createRate(rate).then((rate) => {
        resolve();
      });
    });
  };
}

function fetchRateStates() {
  return dispatch => {
    return new Promise((resolve, reject) => {
      rateService.fetchRateStates().then((states) => {
        let mappedStates = mapStates(states);
        dispatch({
          type: rateConstants.FETCH_RATES_STATES_SUCCESS,
          payload: mappedStates,
        });
      });
    });
  };
}

function fetchRateTypes() {
  return dispatch => {
    rateService.fetchRateTypes().then((types) => {
      dispatch({
        type: rateConstants.FETCH_RATES_TYPES_SUCCESS,
        payload: types
      });
    });
  };
}

function mapStates(states) {
  return states.map((state) => {
    switch (state.value) {
      case 0:
      case 1:
        return {
          ...state,
          code: "info"
        };
      case 2:
      case 3:
        return {
          ...state,
          code: "warning"
        };
      case 4:
        return {
          ...state,
          code: "success"
        };
      default:
        break;
    }
    return state;
  });
}


function getRateData(rate) {
  return new Promise((resolve, reject) => {
    resolve(rate);
  });
}
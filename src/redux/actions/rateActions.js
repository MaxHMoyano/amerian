import { rateConstants } from "../constants";
import { hotelService, rateService } from "../services";

export const rateActions = {
  fetchRates,
  createRate,
  fetchRateTypes,
  fetchRateStates,
  createRateAmount,
  createRateDetail,
  createRateCondition,
  fetchRate,
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

function createRate(hotelId, rate) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      rateService.createRate(hotelId, rate).then((rate) => {
        resolve(rate);
      });
    });
  };
}

function createRateAmount(hotelId, rateId, rateAmount) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      rateService.createRateAmount(hotelId, rateId, rateAmount).then((rateAmount) => {
        resolve(rateAmount);
      });
    });
  };
}

function createRateDetail(hotelId, rateId, rateDetail) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      rateService.createRateDetail(hotelId, rateId, rateDetail).then((rateDetail) => {
        resolve(rateDetail);
      });
    });
  };
}

function createRateCondition(hotelId, rateId, condition) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      rateService.createRateCondition(hotelId, rateId, condition).then((condition) => {
        resolve(condition);
      });
    });
  };
}

function fetchRate(rateId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      rateService.fetchRate(rateId).then((rate) => {

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
    Promise.all([hotelService.fetchHotel(rate.hotel)]).then(([hotel]) => {
      resolve({
        ...rate,
        hotel: hotel.name
      });
    });
  });
}
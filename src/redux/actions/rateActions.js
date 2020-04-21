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
  fetchRateConditions,
  partialUpdateRate,
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

function fetchRateConditions(hotelId, rateId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      rateService.fetchRateConditions(hotelId, rateId).then((conditions) => {
        resolve(conditions);
      });
    });
  };
}

function fetchRate(rateId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      rateService.fetchRate(rateId).then((rate) => {
        Promise.all([
          hotelService.fetchHotel(rate.hotel),
          rateService.fetchRateConditions(rate.hotel, rate.id),
          rateService.fetchRateDetails(rate.hotel, rate.id),
          rateService.fetchRateAmounts(rate.hotel, rate.id)
        ]).then(([hotel, conditions, details, amounts]) => {
          Promise.all(amounts.results.map(e => getAmountData(e, rate.hotel))).then((data) => {
            resolve({
              ...rate,
              hotel: {
                id: hotel.id,
                name: hotel.name,
              },
              conditions: [
                { name: "COR", list: conditions.results.filter((e) => e.client_type === "COR") },
                { name: "COA", list: conditions.results.filter((e) => e.client_type === "COA") },
                { name: "AGE", list: conditions.results.filter((e) => e.client_type === "AGE") },
                { name: "OPE", list: conditions.results.filter((e) => e.client_type === "OPE") },
              ],
              details: details.results,
              amounts: data
            });
          });
        });
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
        resolve(mappedStates);
      });
    });
  };
}

function fetchRateTypes() {
  return dispatch => {
    return new Promise((resolve, reject) => {
      rateService.fetchRateTypes().then((types) => {
        resolve(types);
        dispatch({
          type: rateConstants.FETCH_RATES_TYPES_SUCCESS,
          payload: types
        });
      });
    });
  };
}

function partialUpdateRate(hotelId, rateId, rate) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      rateService.partialUpdateRate(hotelId, rateId, rate).then((rate) => {
        resolve(rate);
      });
    });
  };
}

function getAmountData(amount, hotel) {
  return new Promise((resolve, reject) => {
    hotelService.fetchRoomType(hotel, amount.roomCategory).then((data) => {
      resolve({
        ...amount,
        roomCategory: {
          id: data.id,
          name: data.name
        }
      });
    });
  });
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
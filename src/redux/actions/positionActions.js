import { positionConstants } from "../constants";
import { positionService, hotelService } from "../services/";

export const positionActions = {
  fetchPositions,
  createNewPosition,
  cleanState
};

function cleanState() {
  return dispatch => {
    dispatch({
      type: positionConstants.CLEAN_POSITIONS,
    });
  };
}

function fetchPositions(hotelId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(request());
      positionService.fetchPositions(hotelId).then((positions) => {
        Promise.all(positions.results.map(position => getPositionsProperties(position))).then(data => {
          positions.results = data;
          dispatch(success(positions));
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
      type: positionConstants.FETCH_POSITIONS_REQUEST
    };
  }
  function success(positions) {
    return {
      type: positionConstants.FETCH_POSITIONS_SUCCESS,
      payload: positions,
    };
  }
  function failure(error) {
    return {
      type: positionConstants.FETCH_POSITIONS_SUCCESS,
      error,
    };
  }
}

function createNewPosition(hotelId, position) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      positionService.createNewPosition(hotelId, position).then((position) => {
        resolve();
      }, reject);

    });
  };

}

async function getPositionsProperties(position) {
  return new Promise((resolve, reject) => {
    hotelService.fetchHotel(position.hotel).then(hotel => {
      resolve({
        ...position,
        hotel: hotel.name
      });
    });
  });

}
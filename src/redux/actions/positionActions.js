import { positionConstants } from "../constants";
import { positionService, hotelService } from "../services/";

export const positionActions = {
  fetchPositions,
  createNewPosition,
  fetchPosition,
  deletePosition,
  updatePosition,
  cleanState
};

function cleanState() {
  return dispatch => {
    dispatch({
      type: positionConstants.CLEAN_POSITIONS,
    });
  };
}

function fetchPositions(hotelId, searchParams) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(request());
      positionService.fetchPositions(hotelId, searchParams).then((positions) => {
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

function fetchPosition(positionId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      positionService.fetchPosition(positionId).then(resolve);
    });
  };
}
function deletePosition(positionId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      positionService.deletePosition(positionId).then(resolve);
    });
  };
}
function updatePosition(positionId, position) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      positionService.updatePosition(positionId).then(resolve);
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
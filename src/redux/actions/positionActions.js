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
    dispatch(request());
    positionService.fetchPositions(hotelId).then((positions) => {

      Promise.all(positions.results.map(position => getPositionsProperties(position))).then(data => {
        positions.results = data;
        dispatch(success(positions));
      });

    }, error => dispatch(failure(error)));
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
    positionService.createNewPosition(hotelId, position).then((position) => {
      dispatch(fetchPositions());
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
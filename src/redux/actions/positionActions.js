import { positionConstants } from "../constants";
import { positionService } from "../services/";

export const positionActions = {
  fetchPositions,
  createNewPosition
};

function fetchPositions(hotelId) {
  return dispatch => {
    dispatch(request());
    positionService.fetchPositions(hotelId).then((positions) => {
      dispatch(success(positions));
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

function createNewPosition(position) {
  return dispatch => {
    positionService.createNewPosition(position).then((position) => {
      dispatch(fetchPositions());
    });
  };

}
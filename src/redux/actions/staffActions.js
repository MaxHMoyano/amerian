import { staffConstants } from "../constants";
import { staffService } from "../services/staffService";
import { positionService } from "../services";

export const staffActions = {
  fetchStaff,
  createNewStaff
};


function fetchStaff(hotelId) {
  return dispatch => {
    dispatch(request());
    Promise.all([staffService.fetchStaff(), positionService.fetchPositions()])
      .then(([staff, positions]) => {
        staff.results = staff.results.map(staff => {
          return {
            ...staff,
            position: positions.results.find(e => e.id === staff.position).name
          };
        });
        dispatch(success(staff));
      }, error => dispatch(failure(error)));
  };


  function request() {
    return { type: staffConstants.FETCH_STAFF_REQUEST };
  }
  function success(staff) {
    return { type: staffConstants.FETCH_STAFF_SUCCESS, payload: staff };
  }
  function failure(error) {
    return { type: staffConstants.FETCH_STAFF_ERROR, error };
  }
}

function createNewStaff(hotelId, staff) {
  return dispatch => {
    staffService.createStaff(hotelId, staff).then(() => {
      dispatch(fetchStaff());
    });
  };
}
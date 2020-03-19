import { staffConstants } from "../constants";
import { staffService } from "../services/staffService";

export const staffActions = {
  fetchStaff,
};


function fetchStaff(hotelId) {
  return dispatch => {
    dispatch(request());
    staffService.fetchStaff().then((staff) => {
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
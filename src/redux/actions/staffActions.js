import { staffConstants } from "../constants";
import { staffService, positionService, hotelService } from "../services/";

export const staffActions = {
  fetchStaff,
  createNewStaff
};


function fetchStaff() {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(request());
      staffService.fetchStaff().then((staff) => {
        Promise.all(staff.results.map(getStaffData)).then((data) => {
          staff.results = data;
          dispatch(success(staff));
          resolve();
        });
      }, error => {
        dispatch(failure(error));
        reject(error);
      });

    });
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
    return new Promise((resolve, reject) => {
      staffService.createStaff(hotelId, staff).then(() => {
        resolve();
      }, reject);
    });
  };
}

function getStaffData(staff) {
  return new Promise((resolve, reject) => {
    Promise.all([positionService.fetchPosition(staff.position), hotelService.fetchHotel(staff.hotel)]).then(([position, hotel]) => {
      resolve({
        ...staff,
        position: position.name,
        hotel: hotel.name
      });
    }, reject);
  });
}
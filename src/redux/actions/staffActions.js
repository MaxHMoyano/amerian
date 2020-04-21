import { staffConstants } from "../constants";
import { staffService, positionService, hotelService } from "../services/";

export const staffActions = {
  fetchStaff,
  createNewStaff,
  updateStaff,
  deleteStaff,
  fetchStaffById
};


function fetchStaff(searchParams, url) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      dispatch(request());
      staffService.fetchStaff(searchParams, url).then((staff) => {
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

function fetchStaffById(hotelId, staffId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      staffService.fetchStaffById(hotelId, staffId).then((staff) => {
        resolve(staff);
      });
    });
  };
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

function updateStaff(hotelId, staffId, staff) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      staffService.updateStaff(hotelId, staffId, staff).then((staff) => {
        resolve(staff);
      });
    });
  };
}

function deleteStaff(hotelId, staffId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      staffService.deleteStaff(hotelId, staffId).then(() => {
        resolve();
      });
    });
  };
}

function getStaffData(staff) {
  return new Promise((resolve, reject) => {
    Promise.all([positionService.fetchPosition(staff.position), hotelService.fetchHotel(staff.hotel)]).then(([position, hotel]) => {
      resolve({
        ...staff,
        position: position.name,
        hotel: {
          id: hotel.id,
          name: hotel.name
        }
      });
    }, reject);
  });
}


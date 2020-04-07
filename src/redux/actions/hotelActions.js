import { hotelConstants } from "../constants";
import { hotelService, sharedService } from '../services';

export const hotelActions = {
  fetchHotels,
  createHotel,
  deleteHotel,
  fetchRoomTypes,
  createRoomType,
  editRoomType,
  deleteRoomType,
  fetchChains,
};

function fetchHotels() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(request());
      hotelService.fetchHotels().then((hotels) => {
        Promise.all(hotels.results.map(getHotelData)).then((data) => {
          hotels.results = data;
          dispatch(success(hotels));
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
      type: hotelConstants.FETCH_HOTELS_REQUEST,
    };
  }

  function success(hotels) {
    return {
      type: hotelConstants.FETCH_HOTELS_SUCCESS,
      payload: hotels,
    };
  }

  function failure(error) {
    return {
      type: hotelConstants.FETCH_HOTELS_ERROR,
      error: error,
    };
  }

}

function deleteRoomType(hotelId, roomTypeId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      hotelService.deleteRoomType(hotelId, roomTypeId).then((res) => {
        resolve();
      });
    });
  };
}

function createRoomType(hotelId, roomType) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      hotelService.createRoomType(hotelId, roomType).then((roomType) => {
        resolve(roomType);
      });
    });
  };
}

function editRoomType(hotelId, roomTypeId, roomType) {
  console.log(hotelId, roomTypeId, roomType);
  return dispatch => {
    return new Promise((resolve, reject) => {
      hotelService.editRoomType(hotelId, roomTypeId, roomType).then(() => {
        resolve();
      });
    });
  };
}

function fetchRoomTypes(hotelId) {
  return (dispatch) => {
    dispatch({ type: hotelConstants.FETCH_ROOM_TYPES_REQUEST });
    hotelService.fetchRoomTypes(hotelId).then((rooms) => {
      dispatch({
        type: hotelConstants.FETCH_ROOM_TYPES_SUCCESS,
        payload: rooms,
      });
    }, (error) => dispatch({
      type: hotelConstants.FETCH_ROOM_TYPES_ERROR,
      error
    }));
  };
}

function createHotel(hotel) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      hotelService.createHotel(hotel).then((hotel) => {
        resolve(hotel);
      });
    });
  };
}


function fetchChains() {
  return (dispatch) => {
    dispatch(request());
    hotelService.fetchChains().then((chains) => {
      dispatch(success(chains));
    }, error => dispatch(failure(error)));
  };


  function request() {
    return { type: hotelConstants.FETCH_CHAINS_REQUEST };
  }
  function success(chains) {
    return { type: hotelConstants.FETCH_CHAINS_SUCCESS, payload: chains };
  }
  function failure(error) {
    return { type: hotelConstants.FETCH_CHAINS_ERROR, error };
  }
}

function deleteHotel(hotelId) {
  return dispatch => {
    hotelService.deleteHotel(hotelId).then((res) => {
      dispatch(fetchHotels());
    });
  };
}




function getHotelData(hotel) {
  return new Promise((resolve, reject) => {
    Promise.all([sharedService.fetchCountry(hotel.country), sharedService.fetchRegion(hotel.country, hotel.region)]).then(([country, region]) => {
      resolve({
        ...hotel,
        country: country.name,
        region: region.name
      });
    });
  });
}
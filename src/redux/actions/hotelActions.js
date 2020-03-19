import { hotelConstants } from "../constants";
import { hotelService } from '../services';

export const hotelActions = {
  fetchHotels,
  fetchRoomTypes,
  createNewHotel,
  fetchChains,
};

function fetchHotels() {
  return (dispatch) => {
    dispatch({
      type: hotelConstants.FETCH_HOTELS_REQUEST,
    });
    hotelService.fetchHotels().then((clients) => {
      dispatch({
        type: hotelConstants.FETCH_HOTELS_SUCCESS,
        payload: clients,
      });
    }, (error) => {
      dispatch({
        type: hotelConstants.FETCH_HOTELS_ERROR,
        error: error,
      });
    });
  };
}


function fetchRoomTypes(hotelId) {
  return (dispatch) => {
    dispatch({ type: hotelConstants.FETCH_ROOM_TYPES_REQUEST });
    hotelService.fetchRoomTypesByHotelId(hotelId).then((rooms) => {
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

function createNewHotel(hotel) {
  return (dispatch) => {
    dispatch(request());
    hotelService.createNewHotel(hotel).then((newHotel) => {
      dispatch(success(hotel));
    }, error => dispatch(failure(error)));
  };


  function request() {
    return { type: hotelConstants.CREATE_NEW_HOTEL_REQUEST };
  }
  function success(hotel) {
    return { type: hotelConstants.CREATE_NEW_HOTEL_SUCCESS, payload: hotel };
  }
  function failure(error) {
    return { type: hotelConstants.CREATE_NEW_HOTEL_ERROR, error };
  }
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
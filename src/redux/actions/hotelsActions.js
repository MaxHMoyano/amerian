import { hotelsConstants } from "../constants";
import { hotelsService } from '../services/';

export const hotelsActions = {
  fetchHotels,
  fetchRoomTypes,
};

function fetchHotels() {
  return (dispatch) => {
    dispatch({
      type: hotelsConstants.FETCH_HOTELS_REQUEST,
    });
    hotelsService.fetchHotels().then((clients) => {
      dispatch({
        type: hotelsConstants.FETCH_HOTELS_SUCCESS,
        payload: clients,
      });
    }, (error) => {
      dispatch({
        type: hotelsConstants.FETCH_HOTELS_ERROR,
        error: error,
      });
    });
  };
}


function fetchRoomTypes(hotelId) {
  return (dispatch) => {
    dispatch({ type: hotelsConstants.FETCH_ROOM_TYPES_REQUEST });
    hotelsService.fetchRoomTypesByHotelId(hotelId).then((rooms) => {
      dispatch({
        type: hotelsConstants.FETCH_ROOM_TYPES_SUCCESS,
        payload: rooms,
      });
    }, (error) => dispatch({
      type: hotelsConstants.FETCH_ROOM_TYPES_ERROR,
      error
    }));
  };
}
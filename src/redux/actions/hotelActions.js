import { hotelConstants } from "../constants";
import { hotelService, sharedService } from '../services';

export const hotelActions = {
  fetchHotels,
  fetchRoomTypes,
  createHotel,
  fetchChains,
  deleteHotel,
};

function fetchHotels() {
  return async (dispatch) => {
    dispatch(request());
    let hotels = await hotelService.fetchHotels();
    let countries = await sharedService.fetchCountries();
    hotels.results = hotels.results.map((hotel) => {
      let country = countries.results.find(country => country.id === hotel.country);
      return {
        ...hotel,
        country
      };
    });
    dispatch(success(hotels));
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

function createHotel(hotel) {
  return (dispatch) => {
    hotelService.createHotel(hotel).then((newHotel) => {
      dispatch(fetchHotels());
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
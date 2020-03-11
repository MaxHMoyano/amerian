import { hotelsConstants } from "../constants";
import { hotelsService } from '../../services/';

export const hotelsActions = {
  fetchHotels
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
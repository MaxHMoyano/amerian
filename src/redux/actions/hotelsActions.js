import { hotelsConstants } from "../constants";
import { hotelsService } from '../../services/';

export const hotelsActions = {
  getHotels
};

function getHotels() {
  return (dispatch) => {
    hotelsService.getHotels().then((hotels) => {
      dispatch({ type: hotelsConstants.GET_HOTELS, payload: hotels });
    });
  };
}

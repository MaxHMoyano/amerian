import { currencyConstants } from "../constants";
import { currencyService } from '../services';

export const currencyActions = {
  fetchCurrencies
};

function fetchCurrencies() {
  return (dispatch) => {
    dispatch({
      type: currencyConstants.FETCH_CURRENCIES_REQUEST,
    });
    currencyService.fetchCurrencies().then((clients) => {
      dispatch({
        type: currencyConstants.FETCH_CURRENCIES_SUCCESS,
        payload: clients,
      });
    }, (error) => {
      dispatch({
        type: currencyConstants.FETCH_CURRENCIES_ERROR,
        error: error,
      });
    });
  };
}
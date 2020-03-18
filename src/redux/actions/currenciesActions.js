import { currenciesConstants } from "../constants";
import { currenciesService } from '../services';

export const currenciesActions = {
  fetchCurrencies
};

function fetchCurrencies() {
  return (dispatch) => {
    dispatch({
      type: currenciesConstants.FETCH_CURRENCIES_REQUEST,
    });
    currenciesService.fetchCurrencies().then((clients) => {
      dispatch({
        type: currenciesConstants.FETCH_CURRENCIES_SUCCESS,
        payload: clients,
      });
    }, (error) => {
      dispatch({
        type: currenciesConstants.FETCH_CURRENCIES_ERROR,
        error: error,
      });
    });
  };
}
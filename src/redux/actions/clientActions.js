import { clientConstants } from "../constants";
import { clientService } from '../services';

export const clientActions = {
  fetchClients
};

function fetchClients(type) {
  return (dispatch) => {
    dispatch({
      type: clientConstants.FETCH_CLIENTS_REQUEST,
    });
    clientService.fetchClients(type).then((clients) => {
      dispatch({
        type: clientConstants.FETCH_CLIENTS_SUCCESS,
        payload: clients,
      });
    }, (error) => {
      dispatch({
        type: clientConstants.FETCH_CLIENTS_ERROR,
        error: error,
      });
    });
  };
}
import { clientsConstants } from "../constants";
import { clientsService } from '../services';

export const clientsActions = {
  fetchClients
};

function fetchClients(type) {
  return (dispatch) => {
    dispatch({
      type: clientsConstants.FETCH_CLIENTS_REQUEST,
    });
    clientsService.fetchClients(type).then((clients) => {
      dispatch({
        type: clientsConstants.FETCH_CLIENTS_SUCCESS,
        payload: clients,
      });
    }, (error) => {
      dispatch({
        type: clientsConstants.FETCH_CLIENTS_ERROR,
        error: error,
      });
    });
  };
}
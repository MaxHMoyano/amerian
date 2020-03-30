import { clientConstants } from "../constants";
import { clientService } from '../services';

export const clientActions = {
  fetchClients,
  fetchClientTypes
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

function fetchClientTypes() {
  return dispatch => {
    dispatch(request());
    clientService.fetchClientTypes().then((clientTypes) => {
      dispatch(success(clientTypes));
    }, error => dispatch(failure(error)));
  };

  function request() {
    return {
      type: clientConstants.FETCH_CLIENT_TYPES_REQUEST
    };
  }

  function success(clientTypes) {
    return {
      type: clientConstants.FETCH_CLIENT_TYPES_SUCCESS,
      payload: clientTypes
    };
  }

  function failure(error) {
    return {
      type: clientConstants.FETCH_CLIENT_TYPES_ERROR,
      error,
    };
  }
}
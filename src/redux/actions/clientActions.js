import { clientConstants } from "../constants";
import { clientService } from '../services';

export const clientActions = {
  fetchClients,
  fetchClientTypes,
  createClient
};

function fetchClients(type) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(request());
      clientService.fetchClients(type).then((clients) => {
        dispatch(success(clients));
        resolve();
      }, (error) => {
        dispatch(failure());
        reject(error);
      });
    });
  };

  function request() {
    return {
      type: clientConstants.FETCH_CLIENTS_REQUEST,
    };
  }

  function success(clients) {
    return {
      type: clientConstants.FETCH_CLIENTS_SUCCESS,
      payload: clients,
    };
  }

  function failure(error) {
    return {
      type: clientConstants.FETCH_CLIENTS_ERROR,
      error: error,
    };
  }
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

function createClient(client) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      clientService.createClient(client).then((client) => {
        resolve(client);
      }, reject);
    });
  };
}
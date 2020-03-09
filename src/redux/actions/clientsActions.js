import { clientsConstants } from "../constants";

export const clientsActions = {
  getClients
};

function getClients(type) {
  return (dispatch) => {
    dispatch({
      type: clientsConstants.GET_CLIENTS,
      payload: type,
    });
  };
}
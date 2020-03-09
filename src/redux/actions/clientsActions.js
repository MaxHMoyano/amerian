import { clientsConstants } from "../constants";
import { clientsService } from '../../services';

export const clientsActions = {
  getClients
};

function getClients() {
  return async (dispatch) => {
    let clients = await clientsService.getClients();
    dispatch({
      type: clientsConstants.GET_CLIENTS,
      payload: clients,
    });
  };
}
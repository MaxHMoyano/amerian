import config from "config";
import { authHeader } from "../helpers/auth-header";
import { API_VERSION } from "../helpers/apiVersion";

export const clientsService = {
  getClients
};

function getClients(type) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/${API_VERSION}/clients/`, requestOptions).then(res =>
    res.json()
  );
}

import config from "config";
import { authHeader } from "../../helpers/auth-header";
import { API_VERSION } from "../../helpers/apiVersion";
import { handleResponse, buildUrl } from "../../helpers/utilities";

export const clientService = {
  fetchClients,
  fetchClientTypes,
  createClient,
  fetchClient,
  updateClient,
  deleteClient,
};

function fetchClients(searchParams, url) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  if (!url) {
    url = buildUrl(`${config.apiUrl}/${API_VERSION}/clients/`, searchParams);
  }
  return fetch(url, requestOptions).then(handleResponse);
}

function fetchClientTypes() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/clients/types/`);

  return fetch(url, requestOptions).then(handleResponse);

}

function createClient(client) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(client)
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/clients/`);

  return fetch(url, requestOptions).then(handleResponse);

}

function fetchClient(clientId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/clients/${clientId}/`);

  return fetch(url, requestOptions).then(handleResponse);

}
function updateClient(clientId, client) {
  const requestOptions = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(client)
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/clients/${clientId}`);

  return fetch(url, requestOptions).then(handleResponse);

}
function deleteClient(clientId) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/clients/${clientId}/`);

  return fetch(url, requestOptions).then(handleResponse);

}


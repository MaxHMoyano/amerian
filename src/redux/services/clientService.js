import config from "config";
import { authHeader } from "../../helpers/auth-header";
import { API_VERSION } from "../../helpers/apiVersion";

export const clientService = {
  fetchClients,
  fetchClientTypes,
  createClient,
};

function fetchClients(type) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/clients/`);
  if (type) {
    let params = {
      type
    };
    url.search = new URLSearchParams(params).toString();
  }
  return fetch(url, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });
}

function fetchClientTypes() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/clients/types/`);

  return fetch(url, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });

}

function createClient(client) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(client)
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/clients/`);

  return fetch(url, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });

}


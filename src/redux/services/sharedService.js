import config from "config";
import { authHeader } from "../../helpers/auth-header";
import { API_VERSION } from "../../helpers/apiVersion";

export const sharedService = {
  fetchCountries,
  fetchProvinces,
};

function fetchCountries() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };


  return fetch(`${config.apiUrl}/${API_VERSION}/countries/`, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });
}

function fetchProvinces() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };


  return fetch(`${config.apiUrl}/${API_VERSION}/countries/1/regions/`, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });
}
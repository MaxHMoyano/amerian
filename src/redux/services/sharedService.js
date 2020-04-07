import config from "config";
import { authHeader } from "../../helpers/auth-header";
import { API_VERSION } from "../../helpers/apiVersion";
import { handleResponse } from "../../helpers/utilities";

export const sharedService = {
  fetchCountries,
  fetchCountry,
  fetchRegions,
  fetchRegion,
};

function fetchCountries() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };


  return fetch(`${config.apiUrl}/${API_VERSION}/countries/`, requestOptions).then(handleResponse);
}

function fetchRegions(countryId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };


  return fetch(`${config.apiUrl}/${API_VERSION}/countries/${countryId}/regions/`, requestOptions).then(handleResponse);
}

function fetchCountry(countryId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };


  return fetch(`${config.apiUrl}/${API_VERSION}/countries/${countryId}/`, requestOptions).then(handleResponse);
}

function fetchRegion(countryId, regionId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };


  return fetch(`${config.apiUrl}/${API_VERSION}/countries/${countryId}/regions/${regionId}/`, requestOptions).then(handleResponse);
}
import config from "config";
import { authHeader } from "../../helpers/auth-header";
import { API_VERSION } from "../../helpers/apiVersion";

export const rateService = {
  fetchRates,
  createRate,
  fetchRateTypes,
  fetchRateStates,
};


function fetchRates() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/rates/`);
  return fetch(url, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });
}

function createRate(hotelId, rate) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(rate)
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/rates/`);
  return fetch(url, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });
}

function fetchRateTypes() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/rates/types/`);
  return fetch(url, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });
}

function fetchRateStates() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/rates/status/`);
  return fetch(url, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });

}
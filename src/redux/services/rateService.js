import config from "config";
import { authHeader } from "../../helpers/auth-header";
import { API_VERSION } from "../../helpers/apiVersion";

export const rateService = {
  createNewRate,
  fetchRateTypes,
};

function createNewRate(hotelId, rate) {
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
  let url = new URL(`${config.apiUrl}/${API_VERSION}/rates/special-dates/`);
  return fetch(url, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });

}
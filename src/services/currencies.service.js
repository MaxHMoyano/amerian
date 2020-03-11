import config from "config";
import { authHeader } from "../helpers/auth-header";
import { API_VERSION } from "../helpers/apiVersion";

export const currenciesService = {
  fetchCurrencies
};

function fetchCurrencies(type) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/${API_VERSION}/currencies/`, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });
}

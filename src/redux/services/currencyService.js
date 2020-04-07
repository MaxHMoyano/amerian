import config from "config";
import { authHeader } from "../../helpers/auth-header";
import { API_VERSION } from "../../helpers/apiVersion";
import { handleResponse } from "../../helpers/utilities";

export const currencyService = {
  fetchCurrencies
};

function fetchCurrencies(type) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/${API_VERSION}/currencies/`, requestOptions).then(handleResponse);
}

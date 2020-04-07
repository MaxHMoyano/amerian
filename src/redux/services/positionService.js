import config from "config";
import { authHeader } from "../../helpers/auth-header";
import { API_VERSION } from "../../helpers/apiVersion";
import { handleResponse } from "../../helpers/utilities";

export const positionService = {
  fetchPositions,
  fetchPosition,
  createNewPosition
};

function fetchPositions(hotelId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  let url = "";
  if (hotelId) {
    url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/positions/`);
  } else {
    url = new URL(`${config.apiUrl}/${API_VERSION}/human_capital/positions/`);
  }
  return fetch(url, requestOptions).then(handleResponse);
}

function fetchPosition(positionId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/human_capital/positions/${positionId}/`);
  return fetch(url, requestOptions).then(handleResponse);
}



function createNewPosition(hotelId, position) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(position),
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/positions/`);
  return fetch(url, requestOptions).then(handleResponse);

}

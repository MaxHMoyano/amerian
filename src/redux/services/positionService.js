import config from "config";
import { authHeader } from "../../helpers/auth-header";
import { API_VERSION } from "../../helpers/apiVersion";
import { handleResponse, buildUrl } from "../../helpers/utilities";

export const positionService = {
  fetchPositions,
  fetchPosition,
  deletePosition,
  updatePosition,
  createNewPosition
};

function fetchPositions(hotelId, searchParams, url) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  if (!url) {
    if (hotelId) {
      url = buildUrl(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/positions/`, searchParams);
    } else {
      url = buildUrl(`${config.apiUrl}/${API_VERSION}/human_capital/positions/`, searchParams);
    }
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
function deletePosition(positionId) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader()
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/human_capital/positions/${positionId}/`);
  return fetch(url, requestOptions).then(handleResponse);
}
function updatePosition(positionId, position) {
  const requestOptions = {
    method: "PUT",
    headers: authHeader(),
    body: JSON.stringify(position),
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

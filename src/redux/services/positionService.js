import config from "config";
import { authHeader } from "../../helpers/auth-header";
import { API_VERSION } from "../../helpers/apiVersion";

export const positionService = {
  fetchPositions,
  createNewPosition
};

function fetchPositions(hotelId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  let url = "";
  if (hotelId) {
    url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/human_capital/positions/`);
  } else {
    url = new URL(`${config.apiUrl}/${API_VERSION}/human_capital/positions/`);
  }
  return fetch(url, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });
}

function createNewPosition(position) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(position),
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/human_capital/positions/`);
  return fetch(url, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });

}

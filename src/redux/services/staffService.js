import config from "config";
import { authHeader } from "../../helpers/auth-header";
import { API_VERSION } from "../../helpers/apiVersion";
import { handleResponse } from "../../helpers/utilities";

export const staffService = {
  fetchStaff,
  createStaff
};

function fetchStaff() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/human_capital/staff/`);
  return fetch(url, requestOptions).then(handleResponse);
}


function createStaff(hotelId, staff) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(staff)
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/staff/`);

  return fetch(url, requestOptions).then(handleResponse);
}

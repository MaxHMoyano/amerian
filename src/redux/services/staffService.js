import config from "config";
import { authHeader } from "../../helpers/auth-header";
import { API_VERSION } from "../../helpers/apiVersion";


export const staffService = {
  fetchStaff,
  createStaff
};

function fetchStaff(hotelId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  let url = "";
  if (hotelId) {
    url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/human_capital/staff/`);
  } else {
    url = new URL(`${config.apiUrl}/${API_VERSION}/human_capital/staff/`);
  }
  return fetch(url, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });
}


function createStaff(hotelId, staff) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify(staff)
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/staff/`);

  return fetch(url, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });
}

import config from 'config';
import { authHeader } from '../../helpers/auth-header';
import { API_VERSION } from '../../helpers/apiVersion';
import { handleResponse, buildUrl } from '../../helpers/utilities';

export const staffService = {
  fetchStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  fetchStaffById,
};

function fetchStaff(searchParams, url) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  if (!url) {
    if (searchParams.hotel) {
      url = buildUrl(
        `${config.apiUrl}/${API_VERSION}/hotels/${searchParams.hotel}/staff/`,
        searchParams
      );
    } else {
      url = buildUrl(
        `${config.apiUrl}/${API_VERSION}/human_capital/staff/`,
        searchParams
      );
    }
  }
  return fetch(url, requestOptions).then(handleResponse);
}

function createStaff(hotelId, staff) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(staff),
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/staff/`);

  return fetch(url, requestOptions).then(handleResponse);
}

function updateStaff(hotelId, staffId, staff) {
  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(staff),
  };
  let url = new URL(
    `${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/staff/${staffId}/`
  );
  return fetch(url, requestOptions).then(handleResponse);
}

function deleteStaff(hotelId, staffId) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };
  let url = new URL(
    `${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/staff/${staffId}/`
  );
  return fetch(url, requestOptions).then(handleResponse);
}

function fetchStaffById(hotelId, staffId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  let url = new URL(
    `${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/staff/${staffId}/`
  );

  return fetch(url, requestOptions).then(handleResponse);
}

import config from "config";
import { authHeader } from "../../helpers/auth-header";
import { API_VERSION } from "../../helpers/apiVersion";
import { handleResponse } from "../../helpers/utilities";

export const hotelService = {
  fetchHotels,
  fetchHotel,
  createHotel,
  deleteHotel,
  fetchRoomTypes,
  createRoomType,
  editRoomType,
  deleteRoomType,
  fetchChains,
};

function fetchHotels() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };


  return fetch(`${config.apiUrl}/${API_VERSION}/hotels/`, requestOptions).then(handleResponse);
}

function fetchHotel(hotelId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  return fetch(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/`, requestOptions).then(handleResponse);
}

function fetchRoomTypes(hotelId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  const url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/room_categories/`);
  return fetch(url, requestOptions).then(handleResponse);
}

function createRoomType(hotelId, roomType) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(roomType),
    headers: authHeader(),
  };

  const url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/room_categories/`);
  return fetch(url, requestOptions).then(handleResponse);
}

function editRoomType(hotelId, roomTypeId, roomType) {
  const requestOptions = {
    method: "PUT",
    body: JSON.stringify(roomType),
    headers: authHeader(),
  };

  const url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/room_categories/${roomTypeId}/`);
  return fetch(url, requestOptions).then(handleResponse);
}

function deleteRoomType(hotelId, roomTypeId) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  const url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/room_categories/${roomTypeId}/`);
  return fetch(url, requestOptions).then(handleResponse);
}

function createHotel(hotel) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(hotel),
    headers: authHeader(),
  };

  const url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/`);
  return fetch(url, requestOptions).then(handleResponse);
}

function deleteHotel(hotelId) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  const url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/`);
  return fetch(url, requestOptions).then(handleResponse);
}


function fetchChains() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  const url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/chains/`);
  return fetch(url, requestOptions).then(handleResponse);
}

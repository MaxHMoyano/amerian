import config from "config";
import { authHeader } from "../../helpers/auth-header";
import { API_VERSION } from "../../helpers/apiVersion";
// import { handleResponse } from "../../helpers/utilities";

export const hotelService = {
  fetchHotels,
  fetchHotel,
  createHotel,
  deleteHotel,
  fetchRoomTypesByHotelId,
  fetchChains,
};

function fetchHotels() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };


  return fetch(`${config.apiUrl}/${API_VERSION}/hotels/`, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });
}

function fetchHotel(hotelId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  return fetch(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/`, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });

}

function fetchRoomTypesByHotelId(hotelId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  const url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/room_categories/`);
  return fetch(url, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });
}

function createHotel(hotel) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(hotel),
    headers: authHeader(),
  };

  const url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/`);
  return fetch(url, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });
}

function deleteHotel(hotelId) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  const url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/${hotelId}/`);
  return fetch(url, requestOptions).then(res => {
    if (res.ok) {
      return res.text();
    }
    throw res.statusText;
  });
}


function fetchChains() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  const url = new URL(`${config.apiUrl}/${API_VERSION}/hotels/chains/`);
  return fetch(url, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });
}

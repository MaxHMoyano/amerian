import config from "config";
import { authHeader } from "../helpers/auth-header";
import { API_VERSION } from "../helpers/apiVersion";

export const hotelsService = {
  fetchHotels
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

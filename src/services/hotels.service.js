import config from "config";
import { authHeader } from "../helpers/auth-header";
import { API_VERSION } from "../helpers/apiVersion";

export const hotelsService = {
  getHotels
};

function getHotels() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/${API_VERSION}/hotels/`, requestOptions).then(res =>
    res.json()
  );
}

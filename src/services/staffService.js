import config from "config";
import { authHeader } from "../helpers/auth-header";

export const staffService = {
  getStaff
};

function getStaff() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/staff`, requestOptions).then(res =>
    res.json()
  );
}

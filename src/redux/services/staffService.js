import config from "config";
import { authHeader } from "../../helpers/auth-header";
import { API_VERSION } from "../../helpers/apiVersion";


export const staffService = {
  getStaff
};

function getStaff() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/${API_VERSION}/staff`, requestOptions).then(res =>
    res.json()
  );
}

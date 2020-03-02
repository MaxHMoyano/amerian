import config from "config";
import { authHeader } from "../helpers/auth-header";

export const userService = {
  login,
  logout,
  getAll
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };
  return fetch(`${config.apiUrl}/token/`, requestOptions)
    .then(handleResponse)
    .then((tokens) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      const user = {
        id: JSON.parse(atob(tokens.access.split('.')[1])).user_id,
        access_token: tokens.access,
        refresh_token: tokens.refresh
      };
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

import config from "config";
import { authHeader } from "../../helpers/auth-header";
import { API_VERSION } from "../../helpers/apiVersion";

export const userService = {
  login,
  logout,
  getAll,
  fetchUser,
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };
  return fetch(`${config.apiUrl}/${API_VERSION}/token/`, requestOptions)
    .then(handleResponse)
    .then((tokens) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      const user = {
        id: JSON.parse(atob(tokens.access.split('.')[1])).user_id,
        access_token: tokens.access,
        refresh_token: tokens.refresh
      };
      sessionStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

function fetchUser(userId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };
  let url = new URL(`${config.apiUrl}/${API_VERSION}/users/${userId}/`);
  return fetch(url, requestOptions).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw res.statusText;
  });
}

function logout() {
  // remove user from local storage to log user out
  sessionStorage.removeItem("user");
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
        // window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

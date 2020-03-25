export function authHeader() {
  // return authorization header with jwt token
  // let user = JSON.parse(sessionStorage.getItem("user"));
  let headers = {
    "Content-Type": "application/json",
  };
  // if (user && user.access_token) {
  //   return {
  //     ...headers,
  //     "Authorization": `Bearer ${user.access_token}`,
  //   };
  // }
  return headers;
}

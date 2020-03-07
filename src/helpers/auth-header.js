export function authHeader() {
  // return authorization header with jwt token
  let user = JSON.parse(sessionStorage.getItem("user"));

  // if (user && user.access_token) {
  //   return { Authorization: `Bearer ${user.access_token}` };
  // } else {
  //   return {};
  // }
}

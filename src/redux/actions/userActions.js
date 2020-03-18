import { userConstants, menuConstants } from "../constants";
import { userService } from "../services";
import { history } from "../../helpers/history";

export const userActions = {
  login,
  logout,
  getAll,
  fetchUser
};

function login(email, password) {
  return dispatch => {
    dispatch(request({ email }));

    userService.login(email, password).then(
      user => {
        dispatch(welcomePage(user));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function welcomePage(user) {
    return dispatch => {
      dispatch(fetchUser(user.id));
      dispatch({ type: userConstants.LOGIN_WELCOME, user });
      setTimeout(() => {
        history.push("/home");
        dispatch(success(user));
        dispatch({ type: menuConstants.SET_ACTIVE_MENU_TO_HOME });
      }, 2000);
    };
  }

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function fetchUser(userId) {
  return (dispatch) => {
    dispatch({
      type: userConstants.GET_USER_REQUEST
    });
    userService.fetchUser(userId).then((user) => {
      dispatch({
        type: userConstants.GET_USER_SUCCESS,
        payload: user
      });
    }, (error) => {
      dispatch({
        type: userConstants.GET_USER_ERROR,
        error
      });
    });
  };
}

function logout() {
  userService.logout();
  history.push("/login");
  return { type: userConstants.LOGOUT };
}

function getAll() {
  return dispatch => {
    dispatch(request());

    userService.getAll().then(
      users => dispatch(success(users)),
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}

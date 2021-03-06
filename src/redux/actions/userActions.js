import {
  userConstants,
  menuConstants,
  clientConstants,
  hotelConstants,
} from '../constants';
import { userService, clientService, hotelService } from '../services';
import { history } from '../../helpers/history';

export const userActions = {
  login,
  logout,
  getAll,
  fetchUser,
  clearLoginError,
  showContentAsInHotel,
};

function clearLoginError() {
  return (dispatch) => {
    dispatch({
      type: userConstants.CLEAR_LOGIN_ERROR,
    });
  };
}

function login(email, password) {
  return (dispatch) => {
    dispatch(request({ email }));

    userService.login(email, password).then(
      (user) => {
        dispatch(fetchUser(user.id)).then((user) => {
          dispatch(welcomePage(user));
        });
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function welcomePage(user) {
    return (dispatch) => {
      dispatch({ type: userConstants.LOGIN_WELCOME, user });
      setTimeout(() => {
        history.push('/home/');
        dispatch(success(user));
        dispatch({ type: menuConstants.SET_ACTIVE_MENU });
      }, 2000);
    };
  }

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure() {
    return {
      type: userConstants.LOGIN_FAILURE,
      error: 'Ha ocurrido un error, por favor verifique sus credenciales',
    };
  }
}

function showContentAsInHotel(show, hotelId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      if (hotelId) {
        hotelService.fetchHotel(hotelId).then((hotel) =>
          dispatch({
            type: hotelConstants.SET_CURRENT_HOTEL,
            payload: hotel,
          })
        );
      } else {
        dispatch({
          type: hotelConstants.SET_CURRENT_HOTEL,
          payload: null,
        });
      }
      dispatch({
        type: userConstants.SHOW_CONTENT_AS_IN_HOTEL,
        payload: show,
      });
      history.push('/home/');
      dispatch({ type: menuConstants.SET_ACTIVE_MENU });
      resolve();
    });
  };
}

function fetchUser(userId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: userConstants.GET_USER_REQUEST,
      });
      userService.fetchUser(userId).then(
        (user) => {
          switch (user.rol) {
            case 2:
              clientService.fetchClient(user.client).then((client) =>
                dispatch({
                  type: clientConstants.SET_CURRENT_CLIENT,
                  payload: client,
                })
              );
              break;
            case 3:
              hotelService.fetchHotel(user.hotel).then((hotel) =>
                dispatch({
                  type: hotelConstants.SET_CURRENT_HOTEL,
                  payload: hotel,
                })
              );
              break;
            default:
              break;
          }
          user = {
            ...user,
            rol: [user.rol],
          };
          dispatch({
            type: userConstants.GET_USER_SUCCESS,
            payload: user,
          });
          resolve(user);
        },
        (error) => {
          dispatch({
            type: userConstants.GET_USER_ERROR,
            error,
          });
          reject(error);
        }
      );
    });
  };
}

function logout() {
  userService.logout();
  history.push('/login');
  return { type: userConstants.LOGOUT };
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll().then(
      (users) => dispatch(success(users)),
      (error) => {
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

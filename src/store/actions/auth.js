import * as actionTypes from "./actionTypes";
import Axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: authData.idToken,
    localId: authData.localId,
  };
};

export const logOut = (time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, time * 1000);
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, pass, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = { email: email, password: pass, returnSecureToken: true };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQiESYirY5EUkeMzD_H5ydulxOSAa8Q9g";

    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQiESYirY5EUkeMzD_H5ydulxOSAa8Q9g";
    }

    Axios.post(url, authData)
      .then((res) => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );

        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("userId", res.data.localId);
        localStorage.setItem("expirationDate", expirationDate);

        dispatch(authSuccess(res.data));
        dispatch(logOut(res.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const authData = { idToken: token, localId: userId };

    if (!token) {
      dispatch(authLogout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));

      if (expirationDate > new Date()) {
        dispatch(authSuccess(authData));
      } else {
        dispatch(logOut((expirationDate.getTime() - new Date().getTime())/1000));
      }
    }
  };
};

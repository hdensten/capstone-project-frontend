// post data to login api
// if 200, set cookie, post session id to sessions route
// push home
import React, { Component } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import uuidv1 from "uuid/v1";

// import { returnErrors } from "./messages";

// import {
//   USER_LOADED,
//   USER_LOADING,
//   AUTH_ERROR,
//   LOGIN_SUCCESS,
//   LOGIN_FAIL,
//   LOGOUT_SUCCESS,
//   REGISTER_SUCCESS,
//   REGISTER_FAIL
// } from "./types";

// // CHECK TOKEN & LOAD USER
// export const loadUser = () => (dispatch, getState) => {
//   // User Loading
//   dispatch({ type: USER_LOADING });

//   axios
//     .get("http://localhost:8000/api/auth/user", tokenConfig(getState))
//     .then(res => {
//       console.log(res);
//       dispatch({
//         type: USER_LOADED,
//         payload: res.data
//       });
//     })
//     .catch(err => {
//       dispatch({
//         type: AUTH_ERROR
//       });
//     });
// };

// // LOGIN USER
// export const login = (username, password) => dispatch => {
//   // Headers
//   const config = {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };

//   // Request Body
//   const body = JSON.stringify({ username, password });

//   axios
//     .post("http://localhost:8000/api/auth/login", body, config)
//     .then(res => {
//       console.log(res);
//       Cookie.set("_user_Session", uuidv1(), { expires: 1 });
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: res.data
//       });
//     })
//     .then(() => {
//       axios
//         .post("http://localhost:8000/api/auth/session", {
//           username: `${uuidv1()}--${body.username}`,
//           session: Cookie.get("_user_Session")
//         })
//         .then(res => {
//           console.log("userSession", res);
//         })
//         .catch(err => {
//           console.log("userSession", err);
//         });
//     })
//     .catch(err => {
//       dispatch(returnErrors(err.response.data, err.response.status));
//       dispatch({
//         type: LOGIN_FAIL
//       });
//     });
// };

// // REGISTER USER
// export const register = ({ username, password, email }) => dispatch => {
//   // Headers
//   const config = {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };

//   // Request Body
//   const body = JSON.stringify({ username, email, password });

//   axios
//     .post("http://localhost:8000/api/auth/register", body, config)
//     .then(res => {
//       dispatch({
//         type: REGISTER_SUCCESS,
//         payload: res.data
//       });
//     })
//     .catch(err => {
//       dispatch({
//         type: REGISTER_FAIL
//       });
//     });
// };

// // LOGOUT USER
// export const logout = () => (dispatch, getState) => {
//   axios
//     .post("http://localhost:8000/api/auth/logout/", null, tokenConfig(getState))
//     .then(res => {
//       dispatch({ type: "CLEAR_MOVIES" });
//       dispatch({
//         type: LOGOUT_SUCCESS
//       });
//     })
//     .catch(err => {});
// };

// Setup config with token - helper function
export const tokenConfig = getState => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};

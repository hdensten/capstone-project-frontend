import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import { GET_MOVIES, DELETE_MOVIE, ADD_MOVIE } from "./types";

// GET MOVIES
export const getMovies = () => (dispatch, getState) => {
  axios
    .get("http://localhost:8000/api/movies/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_MOVIES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// DELETE MOVIE
export const deleteMovie = id => (dispatch, getState) => {
  axios
    .delete(`http://localhost:8000/api/movies/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteMovie: "Movie Deleted" }));
      dispatch({
        type: DELETE_MOVIE,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD MOVIE
export const addMovie = movie => (dispatch, getState) => {
  axios
    .post("http://localhost:8000/api/movies/", movie, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addMovie: "Movie Added" }));
      dispatch({
        type: ADD_MOVIE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

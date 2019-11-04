import {
  GET_MOVIES,
  GET_MOVIE,
  DELETE_MOVIE,
  ADD_MOVIE
} from "../actions/types";

const initialState = {
  movies: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
    case GET_MOVIE:
      return {
        ...state,
        movies: action.payload
      };
    case DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter(movie => movie.id !== action.payload)
      };
    case ADD_MOVIE:
      return {
        ...state,
        movies: [...state.movies, action.payload]
      };
    default:
      return state;
  }
}

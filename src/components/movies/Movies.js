import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { getMovies, deleteMovie } from "../../actions/movies";

export class Movies extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    getMovies: PropTypes.func.isRequired,
    deleteMovie: PropTypes.func.isRequired
  };

  state = {
    data: []
  };

  getMovieInfo(movieId) {
    let TMDB_API_KEY = `${process.env.REACT_APP_TMDB_API_KEY}`;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
      )
      .then(response => {
        console.log(response.data);
        // this.setState({
        //   data: response.data
        // });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.props.getMovies();
  }

  render() {
    return (
      <Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: "20px",
            marginBottom: "10px"
          }}
        >
          <h2 style={{ marginBottom: "0" }}>Movies</h2>
          <div className="nav-item">
            <Link to="/add-movie">
              <button className="nav-link btn btn-primary btn-dm text-light">
                Log Movie
              </button>
            </Link>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Movie ID</th>
              <th>Date Watched</th>
              <th>Rating</th>
              <th>Review</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.movies.map(movie => (
              <tr key={movie.id}>
                {this.getMovieInfo(movie.movie_id)}
                <td>{movie.title}</td>
                <td>{movie.movie_id}</td>
                <td>{movie.watch_date}</td>
                <td>{movie.rating}</td>
                <td>{movie.review}</td>
                <td>
                  <button
                    onClick={this.props.deleteMovie.bind(this, movie.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button className="btn btn-info btn-sm">View Log</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies
});

export default connect(
  mapStateToProps,
  { getMovies, deleteMovie }
)(Movies);

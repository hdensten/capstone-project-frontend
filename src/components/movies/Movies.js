import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { getMovies, deleteMovie } from "../../actions/movies";
import MovieLog from "./MovieLog";

export class Movies extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    getMovies: PropTypes.func.isRequired,
    deleteMovie: PropTypes.func.isRequired
  };

  state = {
    data: [],
    movieId: ""
  };

  getMovieInfo(movieId) {
    let TMDB_API_KEY = `${process.env.REACT_APP_TMDB_API_KEY}`;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
      )
      .then(response => {
        // this.setState({
        //   data: response.data
        // });
        console.log("getMovieInfo resonse:", response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  onClick(id) {
    console.log("Selected movie id:", id);
    this.setState(
      {
        movieId: id,
        movieSelected: true
      },
      () => {
        console.log("movie id state", this.state.movieId);
      }
    );
  }

  componentDidMount() {
    this.props.getMovies();
  }

  componentWillUnmount() {
    this.setState({
      movieSelected: false
    });
  }

  dateFormatter(date) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];

    if (date.length === 10) {
      const dateList = date.split("-");
      const year = dateList[0];
      const month = dateList[1];
      const day = dateList[2].replace(/^0+/, "");
      return monthNames[month - 1] + " " + day + ", " + year;
    } else {
      return "N/A";
    }
  }

  render() {
    const emojiRating = rating => {
      if (rating <= 20) {
        return (
          <span role="img" aria-label="nauseated-face">
            🤢
          </span>
        );
      } else if ((rating > 20) & (rating <= 40)) {
        return (
          <span role="img" aria-label="unhappy-face">
            😣
          </span>
        );
      } else if ((rating > 40) & (rating <= 60)) {
        return (
          <span role="img" aria-label="sligtly-smiling-face">
            🙂
          </span>
        );
      } else if ((rating > 60) & (rating <= 80)) {
        return (
          <span role="img" aria-label="smiling-face">
            😊
          </span>
        );
      } else if (rating > 80) {
        return (
          <span role="img" aria-label="grinning-face">
            😁
          </span>
        );
      }
    };
    if (this.state.movieSelected === false) {
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
                  <td>{movie.title}</td>
                  <td>{movie.movie_id}</td>
                  <td>{this.dateFormatter(movie.watch_date)}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      {movie.rating}% {emojiRating(movie.rating)}
                    </div>
                  </td>
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
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => this.onClick(movie.id)}
                    >
                      View Log
                    </button>
                  </td>
                  {/* <td>
                  <Link to={`/${movie.id}`}>
                    <button className="btn btn-info btn-sm">View Log</button>
                  </Link>
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
      );
    } else {
      return (
        <div>
          <MovieLog movieId={this.state.movieId} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies
});

export default connect(
  mapStateToProps,
  { getMovies, deleteMovie }
)(Movies);

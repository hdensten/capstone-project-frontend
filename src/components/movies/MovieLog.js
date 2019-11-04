import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import { getMovie, deleteMovie } from "../../actions/movies";

export class MovieLog extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    getMovie: PropTypes.func.isRequired,
    deleteMovie: PropTypes.func.isRequired
  };

  state = {
    data: []
  };

  componentDidMount() {
    this.props.getMovie(this.props.movieId);
    // const { id } = this.props.match.params.id;
    // console.log("id sent to MovieLog:", id);

    let TMDB_API_KEY = `${process.env.REACT_APP_TMDB_API_KEY}`;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.props.movieId}?api_key=${TMDB_API_KEY}&language=en-US`
      )
      .then(response => {
        console.log("response from getMovieInfo", response.data);
        // this.setState({
        //   data: response.data
        // });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // dateFormatter(date) {
  //   const monthNames = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Aug",
  //     "Sept",
  //     "Oct",
  //     "Nov",
  //     "Dec"
  //   ];

  //   if (date.length === 10) {
  //     const dateList = date.split("-");
  //     const year = dateList[0];
  //     const month = dateList[1];
  //     const day = dateList[2].replace(/^0+/, "");
  //     return monthNames[month - 1] + " " + day + ", " + year;
  //   } else {
  //     return "N/A";
  //   }
  // }

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
    return (
      <Fragment>
        {/* <div className="card mb-3" style={{ maxWidth: "540px" }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={`https://image.tmdb.org/t/p/original${this.data.poster_path}`}
                className="card-img"
                alt=""
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{this.data.title}</h5>
                <p className="card-text">{this.data.overview}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Release date: {this.data.release_date}
                    <br />
                    Runtime: {this.data.runtime} minutes
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div> */}
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
            <tr key={this.props.movies.id}>
              {console.log("movie info from backend:", this.props.movies)}
              <td>{this.props.movies.title}</td>
              <td>{this.props.movies.movie_id}</td>
              <td>{this.props.movies.watch_date}</td>
              <td>
                <div style={{ display: "flex" }}>
                  {this.props.movies.rating}%{" "}
                  {emojiRating(this.props.movies.rating)}
                </div>
              </td>
              <td>{this.props.movies.review}</td>
              <td>
                <button
                  onClick={this.props.deleteMovie.bind(
                    this,
                    this.props.movies.id
                  )}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
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
  { getMovie, deleteMovie }
)(MovieLog);

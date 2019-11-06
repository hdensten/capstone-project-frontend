import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class MovieLog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      tmdbData: [],
      id: this.props.match.params.id
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick() {
    axios
      .delete(
        `http://localhost:5000/movie/delete/${this.props.currentUser.id}/${this.state.id}`
      )
      .then(response => {
        console.log(response);
        this.props.history.push("/");
      })
      .catch(error => {
        console.log("delete error", error);
      });
  }

  getMovieInfo() {
    axios
      .get(
        `http://localhost:5000/movie/${this.props.currentUser.id}/${this.state.id}`
      )
      .then(response => {
        console.log("getMovieInfo:", response);
        this.setState({
          data: response.data
        });
      })
      .then(() => {
        let TMDB_API_KEY = `${process.env.REACT_APP_TMDB_API_KEY}`;
        axios
          .get(
            `https://api.themoviedb.org/3/movie/${this.state.data.tmdb_id}?api_key=${TMDB_API_KEY}&language=en-US`
          )
          .then(response => {
            console.log("response from getMovieInfo", response.data);
            this.setState({
              tmdbData: response.data
            });
          });
      })
      .catch(error => {
        console.log("getMovieInfo:", error);
      });
  }

  componentDidMount() {
    this.getMovieInfo();
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
    return (
      <Fragment>
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={`https://image.tmdb.org/t/p/original${this.state.tmdbData.poster_path}`}
                className="card-img"
                alt=""
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{this.state.tmdbData.title}</h5>
                <p className="card-text">{this.state.tmdbData.overview}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Release date: {this.state.tmdbData.release_date}
                    <br />
                    Runtime: {this.state.tmdbData.runtime} minutes
                  </small>
                </p>
              </div>
            </div>
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
            <tr key={this.state.data.id}>
              <td>{this.state.tmdbData.title}</td>
              <td>{this.state.data.tmdb_id}</td>
              <td>{this.state.data.date}</td>
              <td>
                <div style={{ display: "flex" }}>
                  {this.state.data.rating}%{" "}
                  {emojiRating(this.state.data.rating)}
                </div>
              </td>
              <td>{this.state.data.review}</td>
              <td>
                <button
                  onClick={this.handleDeleteClick}
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

export default withRouter(MovieLog);

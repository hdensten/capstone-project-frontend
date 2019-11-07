import React, { Component, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Icons from "../helpers/icons";

class MovieLog extends Component {
  constructor(props) {
    super(props);

    Icons();

    this.state = {
      data: [],
      tmdbData: [],
      id: this.props.match.params.id,
      hover: false
    };
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.dateFormatter = this.dateFormatter.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.hoverStyle = this.hoverStyle.bind(this);
  }

  handleDeleteClick() {
    axios
      .delete(
        `https://reellog.herokuapp.com/movie/delete/${this.props.currentUser.id}/${this.state.id}`
        // `http://localhost:5000/movie/delete/${this.props.currentUser.id}/${this.state.id}`
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
        `https://reellog.herokuapp.com/movie/${this.props.currentUser.id}/${this.state.id}`
        // `http://localhost:5000/movie/${this.props.currentUser.id}/${this.state.id}`
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

  toggleHover() {
    this.setState({ hover: !this.state.hover });
  }

  componentDidMount() {
    this.getMovieInfo();
  }

  dateFormatter(date) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
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

  hoverStyle() {
    if (this.state.hover === false) {
      return "#f57a00";
    } else {
      return "#CF6701";
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
      <div>
        <div style={{ height: "10px" }} />
        <div
          className="card-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            className="card mb-3"
            style={{
              maxWidth: "540px"
            }}
          >
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
                      Release date:{" "}
                      {this.state.tmdbData.release_date
                        ? this.dateFormatter(this.state.tmdbData.release_date)
                        : this.state.tmdbData.release_date}
                      <br />
                      Runtime: {this.state.tmdbData.runtime} minutes
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="review-container"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
        >
          <div className="review-left-side">
            <h5>Date watched:</h5>
            <p>
              {this.state.data.date
                ? this.dateFormatter(this.state.data.date)
                : this.state.data.date}
            </p>
            <h5>Rating:</h5>
            <p style={{ display: "flex" }}>
              {this.state.data.rating}% {emojiRating(this.state.data.rating)}
            </p>
          </div>
          <div className="review-right-side">
            <h5>Review:</h5>
            <p>{this.state.data.review}</p>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarColor03">
            <ul className="navbar-nav mr-auto">
              <Link to="/">
                <button type="button" className="btn btn-link">
                  Back to All Movies
                </button>
              </Link>
            </ul>
            <a
              onClick={this.handleDeleteClick}
              onMouseEnter={this.toggleHover}
              onMouseLeave={this.toggleHover}
              style={{
                cursor: "pointer",
                fontSize: "1.5em",
                color: `${this.hoverStyle()}`
              }}
            >
              <FontAwesomeIcon icon="trash" />
            </a>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(MovieLog);

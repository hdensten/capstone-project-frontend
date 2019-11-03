import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Form from "./Form";

export default class SearchMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      data: [],
      movieId: 0,
      movieSelected: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onSubmit(e) {
    let TMDB_API_KEY = `${process.env.REACT_APP_TMDB_API_KEY}`;
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${this.state.title}&page=1&include_adult=false`
      )
      .then(response => {
        this.setState({
          title: "",
          data: response.data.results
        });
      })
      .catch(error => {
        console.log(error);
      });
    e.preventDefault();
  }

  getSelectedMovie(movie) {
    let TMDB_API_KEY = `${process.env.REACT_APP_TMDB_API_KEY}`;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie}?api_key=${TMDB_API_KEY}&language=en-US`
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          data: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onClick(movie, title) {
    this.setState({ movieSelected: true, movieId: movie, title: title });
    this.getSelectedMovie(movie);
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
    if (this.state.movieSelected === false) {
      return (
        <div>
          <h2>Search for a Movie or Show</h2>
          <form onSubmit={this.onSubmit} className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              name="title"
              onChange={this.onChange}
              value={this.state.title}
            />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
          <div className="album py-5 bg-light">
            <div className="container">
              <div className="row">
                {this.state.data.map(movie => {
                  return (
                    <div className="col-md-3">
                      <div className="card mb-4 shadow-sm">
                        <svg
                          className="bd-placeholder-img card-img-top"
                          width="100"
                          height="400"
                          xmlns="http://www.w3.org/2000/svg"
                          preserveAspectRatio="xMidYMid slice"
                          focusable="false"
                          role="img"
                          aria-label="Placeholder: Thumbnail"
                          style={{
                            backgroundImage:
                              "url(" +
                              `https://image.tmdb.org/t/p/original${movie.poster_path}` +
                              ")",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat"
                            // height: "60%",
                            // width: "60%"
                          }}
                        />
                        <div className="card-body">
                          <h5>{movie.title}</h5>
                          <div className="card-text">
                            Release date:{" "}
                            {this.dateFormatter(movie.release_date)}
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() =>
                                  this.onClick(movie.id, movie.title)
                                }
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="card mb-3" style={{ maxWidth: "540px" }}>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img
                  src={`https://image.tmdb.org/t/p/original${this.state.data.poster_path}`}
                  className="card-img"
                  alt=""
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{this.state.data.title}</h5>
                  <p className="card-text">{this.state.data.overview}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      Release date: {this.state.data.release_date}
                      <br />
                      Runtime: {this.state.data.runtime} minutes
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Form movieId={this.state.movieId} title={this.state.title} />
          <Link to="/">
            <button type="button" className="btn btn-link">
              Back to Logs
            </button>
          </Link>
        </div>
      );
    }
  }
}

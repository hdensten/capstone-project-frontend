import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      data: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
                        }}
                      />
                      <div className="card-body">
                        <h5>{movie.title}</h5>
                        <div className="card-text">
                          Release date: {this.dateFormatter(movie.release_date)}
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <Link to={`/add-movie/${movie.id}`}>
                              <button
                                type="button"
                                className="btn btn-sm btn-success"
                              >
                                Add
                              </button>
                            </Link>
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
        <Link to="/">
          <button type="button" className="btn btn-link">
            Back to Logs
          </button>
        </Link>
      </div>
    );
  }
}

import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

export default class SearchMovie extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      data: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // onSubmit(e) {
  //   let API_KEY = `${process.env.REACT_APP_API_KEY}`;
  //   axios({
  //     method: "GET",
  //     url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
  //     headers: {
  //       "content-type": "application/octet-stream",
  //       "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
  //       "x-rapidapi-key": API_KEY
  //     },
  //     params: {
  //       page: "1",
  //       r: "json",
  //       s: this.state.title
  //     }
  //   })
  //     .then(response => {
  //       this.setState({
  //         title: "",
  //         data: response.data.Search[0]
  //         // data: response.data.Search
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  //   e.preventDefault();
  // }

  // BETTER API
  onSubmit(e) {
    let TMDB_API_KEY = `${process.env.REACT_APP_TMDB_API_KEY}`;
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${this.state.title}&page=1&include_adult=false`
      )
      .then(response => {
        console.log(response.data);
        console.log(response);
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

  render() {
    return (
      <div>
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
              {this.state.data.map(item => {
                return (
                  <div className="col-md-4">
                    <div className="card mb-4 shadow-sm">
                      <svg
                        className="bd-placeholder-img card-img-top"
                        width="100"
                        height="225"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                        role="img"
                        aria-label="Placeholder: Thumbnail"
                        style={{
                          backgroundImage:
                            "url(" +
                            `https://image.tmdb.org/t/p/original${item.poster_path}` +
                            ")",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          height: "50%",
                          width: "50%"
                        }}
                      >
                        <title>Placeholder</title>
                      </svg>
                      <div className="card-body">
                        <h5>{item.title}</h5>
                        <div className="card-text">
                          Release date: {item.release_date}
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
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
  }
}

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

  onSubmit(e) {
    let API_KEY = `${process.env.REACT_APP_API_KEY}`;
    axios({
      method: "GET",
      url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": API_KEY
      },
      params: {
        page: "1",
        r: "json",
        s: this.state.title
      }
    })
      .then(response => {
        this.setState({
          title: "",
          data: response.data.Search[0]
          // data: response.data.Search
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
        <div>{this.state.data.Title}</div>
        <div>{this.state.data.Year}</div>
        <div>{this.state.data.imdbID}</div>
        <div>{this.state.data.Type}</div>
        <img src={this.state.data.Poster} alt="" />
        {/* {this.state.data.slice(0, 5).map(item => {
          return (
            <div className="movie-search-results-container">
              <div className="movie-search-results">
                <div className="movie">{item.Title}</div>
                <div className="movie">{item.Year}</div>
                <div className="movie">{item.imdbID}</div>
                <div className="movie">{item.Type}</div>
                <img src={item.Poster} alt="" />
                <hr />
              </div>
            </div>
          );
        })} */}
      </div>
    );
  }
}

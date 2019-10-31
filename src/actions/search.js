// import axios from "axios";
// import { tokenConfig } from "./auth";

// // GET MOVIES
// export const searchMovie = title => {
//   console.log(typeof title.title);
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
//       s: title.title
//     }
//   })
//     .then(response => {
//       console.log("ID Response:", response);
//       // this.setState({
//       //   data: response.data.Search[0]
//       // });
//       console.log(
//         "in axios call:",
//         response.data.Search,
//         "title:",
//         response.data.Search[0].Title
//       );
//     })
//     .catch(error => {
//       console.log(error);
//     });
// };

import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

export default class SearchMovie extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    };
  }

  searchMovie = title => {
    let API_KEY = `${process.env.IMDB_API_KEY}`;
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
        s: title
      }
    })
      .then(response => {
        console.log("ID Response:", response);
        this.setState({
          data: response.data.Search[0]
        });
        console.log("in axios call:", this.state.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.searchMovie();
  }

  render() {
    return (
      <div>
        <div>{this.state.data.Title}</div>
        <div>{this.state.data.Year}</div>
        <div>{this.state.data.imdbID}</div>
        <div>{this.state.data.Type}</div>
        <img src={this.state.data.Poster} alt="" />
      </div>
    );
  }
}

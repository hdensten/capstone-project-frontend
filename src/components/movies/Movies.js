import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      borderStyle: "",
      borderColor: "",
      borderWidth: ""
    };

    this.getMovieInfo = this.getMovieInfo.bind(this);
  }

  getUserMovies() {
    axios
      .get(`https://reellog.herokuapp.com/movies/${this.props.currentUser.id}`)
      // .get(`http://localhost:5000/movies/${this.props.currentUser.id}`)
      .then(response => {
        console.log("getUserMovies:", response);
        this.setState({
          data: response.data
        });
      })
      .catch(error => {
        console.log("getUserMovies:", error);
      });
  }

  getMovieInfo(tmdbId) {
    var moviePosters = [];
    let TMDB_API_KEY = `${process.env.REACT_APP_TMDB_API_KEY}`;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`
      )
      .then(response => {
        console.log("getMovieInfo resonse:", response.data);
        moviePosters.push(response.data.poster_path);
        console.log(moviePosters);
      })
      .catch(error => {
        console.log(error);
      });

    console.log(moviePosters);
    return moviePosters[0];
  }

  handleMouseEnter() {
    this.setState({
      borderColor: "#F2A09E",
      borderStyle: "outset",
      borderWidth: "7px"
    });
  }

  handleMouseLeave() {
    this.setState({ borderStyle: "", borderColor: "", borderWidth: "" });
  }

  componentDidMount() {
    this.getUserMovies();
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
            <Link to="/search">
              <button className="nav-link btn btn-primary btn-dm text-light">
                Log Movie
              </button>
            </Link>
          </div>
        </div>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              {this.state.data.map(movie => {
                return (
                  <div className="col-md-3">
                    <Link to={`/movie/${movie.id}`}>
                      <div className="card mb-4 shadow-sm">
                        <svg
                          // onMouseEnter={() => this.handleMouseEnter()}
                          // onMouseLeave={() => this.handleMouseLeave()}
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
                            backgroundRepeat: "no-repeat",
                            borderStyle: `${this.state.borderStyle}`,
                            borderColor: `${this.state.borderColor}`,
                            borderWidth: `${this.state.borderWidth}`
                          }}
                        />
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

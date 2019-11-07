import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MovieLog from "./MovieLog";

export default class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      borderStyle: "",
      borderColor: "",
      borderWidth: ""
      // moviePoster: ""
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
        // this.setState({
        //   moviePoster: response.data.poster_path
        // });
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

  // handleClick(id) {
  //   console.log("Selected movie id:", id);
  //   this.setState(
  //     {
  //       movieId: id,
  //       movieSelected: true
  //     },
  //     () => {
  //       console.log("movie id state", this.state.movieId);
  //     }
  //   );
  // }
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
        {/* <div
          className="movie-items-wrapper"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr"
          }}
        >
          <div className="movie-item-wrapper" style={{ position: "relative" }}>
            {this.state.data.map(movie => (
              <div
                className="movie-poster-img"
                style={{
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  height: "400px",
                  width: "100%"
                }}
              >
                {this.getMovieInfo(movie.tmdb_id)}
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  // className="card-img"
                  alt=""
                />
                {this.moviePosters}
              </div>
            ))}
          </div>
        </div> */}

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
                            // height: "60%",
                            // width: "60%"
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

        {/* <table className="table table-striped">
          <thead>
            <tr>
              <th>id</th>
              <th>Movie ID</th>
              <th>Date Watched</th>
              <th>Rating</th>
              <th>Review</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(movie => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.tmdb_id}</td>
                <td>{this.dateFormatter(movie.date)}</td>
                <td>
                  <div style={{ display: "flex" }}>
                    {movie.rating}% {emojiRating(movie.rating)}
                  </div>
                </td>
                <td>{movie.review}</td>
                <td>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
                <td>
                  <Link to={`/movie/${movie.id}`}>
                    <button className="btn btn-info btn-sm">View Log</button>
                  </Link>
                </td>
                <td>{this.getMovieInfo(movie.tmdb_id)}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </Fragment>
    );
  }
}

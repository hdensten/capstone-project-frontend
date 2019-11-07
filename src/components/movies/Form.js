import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      watchDate: "",
      rating: "",
      review: "",
      tmdbId: this.props.match.params.tmdbid,
      data: [],
      posterPath: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dateFormatter = this.dateFormatter.bind(this);
  }

  getSelectedMovie() {
    let TMDB_API_KEY = `${process.env.REACT_APP_TMDB_API_KEY}`;
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.state.tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          data: response.data,
          posterPath: response.data.poster_path
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    const { watchDate, rating, review } = this.state;
    const tmdbId = this.state.tmdbId;
    const posterPath = this.state.posterPath;
    const userId = this.props.currentUser.id;
    const movie = { tmdbId, watchDate, rating, review, posterPath, userId };
    console.log(movie);
    axios
      .post("https://reellog.herokuapp.com/movie", movie)
      // .post("http://localhost:5000/movie", movie)
      .then(response => {
        console.log("post movie response:", response.data);
      })
      .then(() => {
        this.setState({
          watchDate: "",
          rating: "",
          review: ""
        });
        this.props.history.push("/");
      })
      .catch(error => {
        console.log("post movie error:", error);
      });
  };

  componentDidMount() {
    this.getSelectedMovie();
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
    const { watchDate, rating, review } = this.state;
    const {
      poster_path,
      title,
      overview,
      release_date,
      runtime
    } = this.state.data;
    return (
      <Fragment>
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={`https://image.tmdb.org/t/p/original${poster_path}`}
                className="card-img"
                alt=""
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{overview}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Release date:{" "}
                    {release_date
                      ? this.dateFormatter(release_date)
                      : release_date}
                    <br />
                    Runtime: {runtime} minutes
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card card-body mt-4 mb-4">
          <form onSubmit={this.handleSubmit}>
            <h2>Write Your Review</h2>
            <div className="form-group">
              <label>Date Watched</label>
              <input
                className="form-control"
                type="date"
                name="watchDate"
                required
                onChange={this.handleChange}
                value={watchDate}
              />
            </div>
            <div className="form-group">
              <label className="control-label">Rating</label>
              <div className="form-group">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Percentage"
                    name="rating"
                    required
                    onChange={this.handleChange}
                    value={rating}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Review</label>
              <textarea
                className="form-control"
                type="text"
                name="review"
                onChange={this.handleChange}
                value={review}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <Link to="/">
          <button type="button" className="btn btn-link">
            Back to Logs
          </button>
        </Link>
        <Link to="/search">
          <button type="button" className="btn btn-link">
            Back to Search
          </button>
        </Link>
      </Fragment>
    );
  }
}

export default withRouter(Form);

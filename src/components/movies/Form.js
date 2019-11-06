import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      watchDate: "",
      rating: "",
      review: "",
      movieSelected: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    const { watchDate, rating, review } = this.state;
    const tmdbId = this.props.movieId;
    const userId = this.props.currentUser.id;
    const movie = { tmdbId, watchDate, rating, review, userId };
    console.log(movie);
    axios
      .post("http://localhost:5000/movie", movie)
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

  render() {
    console.log("movieID prop:", this.props.movieId);
    const { watchDate, rating, review } = this.state;
    return (
      <Fragment>
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
              <label>Rating</label>
              <input
                className="form-control"
                type="number"
                max="100"
                min="0"
                step="1"
                name="rating"
                required
                onChange={this.handleChange}
                value={rating}
              />
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
      </Fragment>
    );
  }
}

export default withRouter(Form);

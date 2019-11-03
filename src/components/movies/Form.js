import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addMovie } from "../../actions/movies";

export class Form extends Component {
  state = {
    watch_date: "",
    rating: "",
    review: ""
  };

  static propTypes = {
    addMovie: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { watch_date, rating, review } = this.state;
    const movie_id = this.props.movieId;
    const title = this.props.title;
    const movie = { movie_id, title, watch_date, rating, review };
    console.log(movie);
    this.props.addMovie(movie);
    this.setState({
      movieId: 0,
      title: "",
      watch_date: "",
      rating: "",
      review: ""
    });
  };

  render() {
    console.log(this.props.movieId);
    const { watch_date, rating, review } = this.state;
    return (
      <Fragment>
        <div className="card card-body mt-4 mb-4">
          <form onSubmit={this.onSubmit}>
            <h2>Write Your Review</h2>
            <div className="form-group">
              <label>Date Watched</label>
              <input
                className="form-control"
                type="date"
                name="watch_date"
                onChange={this.onChange}
                value={watch_date}
              />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <input
                className="form-control"
                type="number"
                step="0.5"
                name="rating"
                onChange={this.onChange}
                value={rating}
              />
            </div>
            <div className="form-group">
              <label>Review</label>
              <textarea
                className="form-control"
                type="text"
                name="review"
                onChange={this.onChange}
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
export default connect(
  null,
  { addMovie }
)(Form);

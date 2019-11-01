import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addMovie } from "../../actions/movies";
import SearchMovie from "./Search";

export class Form extends Component {
  state = {
    name: "",
    email: "",
    message: ""
  };

  static propTypes = {
    addMovie: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { name, email, message } = this.state;
    const movie = { name, email, message };
    this.props.addMovie(movie);
    this.setState({
      name: "",
      email: "",
      message: ""
    });
  };

  render() {
    const { name, email, message } = this.state;
    return (
      <Fragment>
        <h2>Add Movie</h2>
        <SearchMovie />
        <div className="card card-body mt-4 mb-4">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                onChange={this.onChange}
                value={name}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                className="form-control"
                type="text"
                name="message"
                onChange={this.onChange}
                value={message}
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
      </Fragment>
    );
  }
}
export default connect(
  null,
  { addMovie }
)(Form);

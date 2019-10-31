import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMovies, deleteMovie } from "../../actions/movies";

export class Movies extends Component {
  static propTypes = {
    movies: PropTypes.array.isRequired,
    getMovies: PropTypes.func.isRequired,
    deleteMovie: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getMovies();
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
            <Link to="/form">
              <button className="nav-link btn btn-primary btn-dm text-light">
                Log Movie
              </button>
            </Link>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.movies.map(movie => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.name}</td>
                <td>{movie.email}</td>
                <td>{movie.message}</td>
                <td>
                  <button
                    onClick={this.props.deleteMovie.bind(this, movie.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies
});

export default connect(
  mapStateToProps,
  { getMovies, deleteMovie }
)(Movies);

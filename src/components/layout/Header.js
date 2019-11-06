import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Header extends Component {
  handleSuccessfulLogout = () => {
    this.props.handleSuccessfulLogout();
    this.props.history.push("/login");
  };
  render() {
    const authLinks = (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <span className="navbar-text mr-3">
          <strong>
            {this.props.currentUser
              ? `Welcome ${this.props.currentUser.username}`
              : ""}
          </strong>
        </span>
        <li className="nav-item">
          <button
            onClick={this.handleSuccessfulLogout}
            className="nav-link btn btn-info btn-dm text-light"
          >
            Logout
          </button>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              Movie Logger
            </Link>
          </div>
          {this.props.loggedInStatus === "LOGGED_IN" ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);

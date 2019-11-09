import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import uuidv1 from "uuid/v1";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errorText: "",
      isLoading: false,
      invalidLogin: "form-control"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      invalidLogin: "form-control"
    });
  }

  handleSubmit(event) {
    this.setState({
      isLoading: true
    });
    event.preventDefault();
    const loginData = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post("https://reellog.herokuapp.com/user/login", loginData)
      // .post("http://localhost:5000/user/login", loginData)
      .then(response => {
        if (response.data === "INVALID_LOGIN") {
          event.preventDefault();
          this.props.handleUnSuccessfulLogin();
          return this.setState({
            invalidLogin: "form-control is-invalid",
            password: ""
          });
        } else if (response.status === 200) {
          Cookie.set("_user_Session", uuidv1() + "--" + this.state.username, {
            expires: 1
          });
          axios.post("https://reellog.herokuapp.com/session/new", {
            // axios.post("http://localhost:5000/session/new", {
            session: Cookie.get("_user_Session")
          });
          this.props.handleCurrentUser(response.data);
          this.props.handleSuccessfulLogin();
          this.props.history.push("/");
        } else {
          this.props.handleUnSuccessfulLogin();
          return this.setState({
            invalidLogin: "form-control is-invalid",
            password: ""
          });
        }
      })
      .catch(error => {
        console.log("login", error);
        this.setState({
          errorText: "An error occured",
          isLoading: false
        });
      });
  }

  render() {
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Login</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group has-danger">
              <label className="form-control-label" htmlFor="inputDanger1">
                Username
              </label>
              <input
                type="text"
                className={this.state.invalidLogin}
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                id="inputInvalid"
              />
              <div className="invalid-feedback">
                Invalid Username or Password
              </div>
            </div>
            <div className="form-group has-danger">
              <label className="form-control-label" htmlFor="inputDanger1">
                Password
              </label>
              <input
                type="password"
                className={this.state.invalidLogin}
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                id="inputInvalid"
              />
              <div className="invalid-feedback">
                Invalid Username or Password
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

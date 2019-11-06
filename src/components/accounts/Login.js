import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import uuidv1 from "uuid/v1";
import uuidv4 from "uuid/v4";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errorText: "",
      isLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: ""
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
      .post("http://localhost:5000/user/login", loginData)
      .then(response => {
        if (response.status === 200) {
          console.log("login:", response.data);
          Cookie.set(
            "_user_Session",
            uuidv1() + uuidv4() + "--" + this.state.username,
            { expires: 1 }
          );
          console.log(Cookie.get("_user_Session"));
          this.props.handleCurrentUser(response.data);
          this.props.handleSuccessfulLogin();
        } else {
          this.setState({
            errorText: "Incorrect email or password"
          });
          this.props.handleUnSuccessfulLogin();
        }
      })
      // .then(() => {
      //   axios
      //     .post("http://localhost:5000/session/new", {
      //       username: `${uuidv1()}--${this.state.username}`,
      //       session: Cookie.get("_user_Session")
      //     })
      .then(() => {
        this.setState({
          username: "",
          password: ""
        });
        this.props.history.push("/");
      })
      // })
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
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.handleChange}
                value={this.state.username}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
              />
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

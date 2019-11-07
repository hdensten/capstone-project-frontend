import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";
import uuidv1 from "uuid/v1";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      errorText: "",
      invalidPass: "form-control",
      usernameExists: "form-control",
      emailExists: "form-control"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      invalidPass: "form-control",
      usernameExists: "form-control",
      emailExists: "form-control"
    });
  }

  handleSubmit(event) {
    if (this.state.password !== this.state.password2) {
      event.preventDefault();
      return this.setState({
        invalidPass: "form-control is-invalid",
        password2: ""
      });
    } else {
      this.setState({ invalidPass: "form-control" });
      event.preventDefault();
      const loginData = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      };
      axios
        .post("https://reellog.herokuapp.com/user/register", loginData)
        // .post("http://localhost:5000/user/register", loginData)
        .then(response => {
          console.log("register", response);
          if (response.data === "USERNAME_EXISTS" && response.status === 200) {
            event.preventDefault();
            return this.setState({
              usernameExists: "form-control is-invalid",
              username: ""
            });
          } else if (
            response.data === "EMAIL_EXISTS" &&
            response.status === 200
          ) {
            event.preventDefault();
            return this.setState({
              emailExists: "form-control is-invalid",
              email: ""
            });
          } else if (response.status === 200) {
            Cookie.set(
              "_user_Session",
              uuidv1() + "--" + this.state.username,
              // + uuidv4()
              { expires: 1 }
            );
            console.log(Cookie.get("_user_Session"));
            this.props.handleCurrentUser(response.data);
            this.props.handleSuccessfulLogin();
            this.setState({
              username: "",
              email: "",
              password: "",
              password2: ""
            });
            this.props.history.push("/");
          } else {
            this.setState({
              errorText: "An error occured"
            });
            this.props.handleUnSuccessfulLogin();
          }
        })
        .then(() => {
          axios.post("hhttps://reellog.herokuapp.com/session/new", {
            // axios.post("http://localhost:5000/session/new", {
            session: Cookie.get("_user_Session")
          });
        })
        .catch(error => {
          console.log("register", error);
          this.setState({
            errorText: "An error occured"
          });
        });
    }
  }

  render() {
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group has-danger">
              <label className="form-control-label" htmlFor="inputDanger1">
                Username
              </label>
              <input
                type="text"
                className={this.state.usernameExists}
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                id="inputInvalid"
              />
              <div className="invalid-feedback">Username already exists</div>
            </div>
            <div className="form-group has-danger">
              <label className="form-control-label" htmlFor="inputDanger1">
                Email
              </label>
              <input
                type="email"
                className={this.state.emailExists}
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                id="inputInvalid"
              />
              <div className="invalid-feedback">
                An account with this email already exists
              </div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group has-danger">
              <label className="form-control-label" htmlFor="inputDanger1">
                Confirm Password
              </label>
              <input
                type="password"
                className={this.state.invalidPass}
                name="password2"
                value={this.state.password2}
                onChange={this.handleChange}
                id="inputInvalid"
              />
              <div className="invalid-feedback">Passwords do not match</div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

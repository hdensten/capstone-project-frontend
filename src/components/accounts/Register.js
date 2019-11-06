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
      errorText: ""
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
    if (this.state.password !== this.state.password2) {
      return this.setState({ errorText: "Passwords do not match" });
    }
    event.preventDefault();
    const loginData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("http://localhost:5000/user/register", loginData)
      .then(response => {
        console.log("register", response);
        if (response.status === 200) {
          Cookie.set("_user_Session", uuidv1(), { expires: 1 });
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
      .then(() => {
        axios.post("http://localhost:5000/session/new", {
          username: `${uuidv1()}--${this.state.username}`,
          session: Cookie.get("_user_Session")
        });
      })
      .catch(error => {
        console.log("register", error);
        this.setState({
          errorText: "An error occured"
        });
      });
    this.setState({
      username: "",
      email: "",
      password: "",
      password2: ""
    });
  }

  // static propTypes = {
  //   register: PropTypes.func.isRequired,
  //   isAuthenticated: PropTypes.bool
  // };

  // onSubmit = e => {
  //   e.preventDefault();
  //   const { username, email, password, password2 } = this.state;
  //   if (password !== password2) {
  //     this.props.createMessage({ passwordNotMatch: "Passwords do not match" });
  //   } else {
  //     const newUser = {
  //       username,
  //       password,
  //       email
  //     };
  //     this.props.register(newUser);
  //   }
  // };

  render() {
    // if (this.props.isAuthenticated) {
    //   return <Redirect to="/" />;
    // }
    // const { username, email, password, password2 } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
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
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                value={this.state.password2}
                onChange={this.handleChange}
              />
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

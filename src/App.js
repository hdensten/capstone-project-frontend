import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

// import { Provider as AlertProvider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";

import Header from "./components/layout/Header";
import Dashboard from "./components/movies/Dashboard";
import Search from "./components/movies/Search";
import Form from "./components/movies/Form";
import MovieLog from "./components/movies/MovieLog";
import Alerts from "./components/layout/Alerts";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";

import "./styles/bootstrap.min.css";

//  Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      currentUser: "",
      isLoading: true
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnSuccessfulLogin = this.handleUnSuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    this.handleCurrentUser = this.handleCurrentUser.bind(this);
  }

  handleCurrentUser(user) {
    this.setState({
      currentUser: user
    });
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleUnSuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  handleSuccessfulLogout() {
    console.log(Cookie.get("_user_Session"));
    axios
      .delete(
        `https://reellog.herokuapp.com/session/logout/${Cookie.get(
          "_user_Session"
        )}`
        // `http://localhost:5000/session/logout/${Cookie.get("_user_Session")}`
      )
      .then(response => {
        Cookie.remove("_user_Session");
        console.log(response.data);
        if (response.data === "SESSION_DELETED") {
          return;
        } else {
          console.log("delete response", response);
        }
      })
      .catch(error => console.log("delete session error:", error));
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      currentUser: "",
      isLoading: false
    });
  }

  handleGetUser(username) {
    axios
      .post("https://reellog.herokuapp.com/session/users", {
        username: username
      })
      // .post("http://localhost:5000/session/users", { username: username })
      .then(response => {
        this.setState({
          currentUser: response.data
        });
      })
      .then(() => {
        this.setState({
          loggedInStatus: "LOGGED_IN"
        });
      })
      .catch(error => {
        console.log("handleGetUser", error);
      });
  }

  checkLoginStatus() {
    if (
      Cookie.get("_user_Session") &&
      this.state.loggedInStatus === "NOT_LOGGED_IN"
    ) {
      axios
        .get(
          `https://reellog.herokuapp.com/session/${Cookie.get("_user_Session")}`
        )
        // .get(`http://localhost:5000/session/${Cookie.get("_user_Session")}`)
        .then(response => {
          if (response.status === 200) {
            // this.handleGetUser(response.data.username);
            this.handleGetUser(Cookie.get("_user_Session").split("--")[1]);
          }
        })
        .catch((response, error) => {
          console.log(response, error);
          Cookie.remove("_user_Session");
        });
      // Cookie.get("_user_Session").split("--")[1]
    } else if (!Cookie.get("_user_session")) {
      this.setState({ isLoading: false });
      return null;
    } else if (
      Cookie.get("_user_session") &&
      this.state.loggedInStatus === "LOGGED_IN"
    ) {
      this.setState({ isLoading: false });
      this.props.history.push("/");
    }
    this.setState({ isLoading: false });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    return (
      // <Provider store={store}>
      // <AlertProvider template={AlertTemplate} {...alertOptions}>
      <Router>
        <Fragment>
          <Header
            handleSuccessfulLogout={this.handleSuccessfulLogout}
            loggedInStatus={this.state.loggedInStatus}
            currentUser={this.state.currentUser}
          />
          <Alerts />
          <div className="container">
            <Switch>
              {this.state.loggedInStatus === "LOGGED_IN"
                ? [
                    <Route
                      exact
                      path="/"
                      render={props => (
                        <Dashboard
                          {...props}
                          currentUser={this.state.currentUser}
                        />
                      )}
                    />,
                    <Route
                      path="/movie/:id"
                      render={props => (
                        <MovieLog
                          {...props}
                          currentUser={this.state.currentUser}
                        />
                      )}
                    />,
                    <Route
                      path="/search"
                      render={props => (
                        <Search
                          {...props}
                          currentUser={this.state.currentUser}
                        />
                      )}
                    />,
                    <Route
                      path="/add-movie/:tmdbid"
                      render={props => (
                        <Form {...props} currentUser={this.state.currentUser} />
                      )}
                    />
                  ]
                : null}
              <Route
                path="/register"
                render={props => (
                  <Register
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnSuccessfulLogin={this.handleUnSuccessfulLogin}
                    handleCurrentUser={this.handleCurrentUser}
                  />
                )}
              />
              <Route
                path="/login"
                render={props => (
                  <Login
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnSuccessfulLogin={this.handleUnSuccessfulLogin}
                    handleCurrentUser={this.handleCurrentUser}
                  />
                )}
              />
            </Switch>
          </div>
        </Fragment>
      </Router>
      // </AlertProvider>
      // </Provider>
    );
  }
}

export default App;

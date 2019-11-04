import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Header from "./components/layout/Header";
import Dashboard from "./components/movies/Dashboard";
import Search from "./components/movies/Search";
import MovieLog from "./components/movies/MovieLog";
import Alerts from "./components/layout/Alerts";
import Login from "./components/accounts/Login";
import Register from "./components/accounts/Register";
import PrivateRoute from "./components/common/PrivateRoute";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

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
      movieSelected: false
    };
  }

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                <Switch>
                  <PrivateRoute
                    exact
                    path="/"
                    component={props => (
                      <Dashboard
                        {...props}
                        movieSelected={this.state.movieSelected}
                      />
                    )}
                    // component={Dashboard}
                    // movieSelected={this.state.movieSelected}
                  />
                  {/* <PrivateRoute path="/:id" component={MovieLog} /> */}
                  <PrivateRoute path="/add-movie" component={Search} />
                  <Route path="/register" component={Register} />
                  <Route path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;

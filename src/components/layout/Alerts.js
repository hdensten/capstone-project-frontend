import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export default class Alerts extends Component {
  // static propTypes = {
  //   error: PropTypes.object.isRequired
  // };

  componentDidUpdate(prevProps) {
    const { error, alert, review } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.title) alert.error(`Name: ${error.msg.title.join()}`);
      if (error.msg.watch_date)
        alert.error(`Date Watched: ${error.msg.watch_date.join()}`);
      if (error.msg.rating) alert.error(`Rating: ${error.msg.rating.join()}`);
      if (error.msg.review) alert.error(`Review: ${error.msg.review.join()}`);
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
      if (error.msg.username) alert.error(error.msg.username.join());
    }

    if (review !== prevProps.review) {
      if (review.deleteMovie) alert.success(review.deleteMovie);
      if (review.addMovie) alert.success(review.addMovie);
      if (review.passwordNotMatch) alert.error(review.passwordNotMatch);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  review: state.reviews
});

// export default connect(mapStateToProps)(withAlert()(Alerts));

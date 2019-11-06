import React, { Fragment } from "react";
// import Form from "./Form";
import Movies from "./Movies";

export default function Dashboard(props) {
  // console.log(props.movieSelected);
  return (
    <Fragment>
      {/* <Form /> */}
      <Movies currentUser={props.currentUser} />
      <div
        className="text-secondary"
        // style={{ position: "absolute", bottom: "5px", marginTop: "5px" }}
      >
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </div>
    </Fragment>
  );
}

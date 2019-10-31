import React, { Fragment } from "react";
// import Form from "./Form";
import Movies from "./Movies";

export default function Dashboard() {
  return (
    <Fragment>
      {/* <Form /> */}
      <Movies />
      <p className="text-secondary">
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </p>
    </Fragment>
  );
}

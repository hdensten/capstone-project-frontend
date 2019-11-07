import React from "react";

import Movies from "./Movies";

export default function Dashboard(props) {
  return (
    <div>
      <Movies currentUser={props.currentUser} />
      <div className="text-secondary">
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </div>
    </div>
  );
}

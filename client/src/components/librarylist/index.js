import React, { Component } from "react";

import LibraryListQuery from "./LibraryListQuery";
import LibraryList from "./LibraryList";

class LibraryListContainer extends Component {
  state = {};

  render() {
    return (
      <LibraryListQuery
        render={(libraries, { isLoading, isEmpty, isError }) => {
          if (isLoading) {
            return null;
          }
          if (isEmpty) {
            return <div>No languages found.</div>;
          }
          if (isError) {
            return <div>There was an error with the request...</div>;
          }
          return <LibraryList libraries={libraries} />;
        }}
      />
    );
  }
}

export default LibraryListContainer;

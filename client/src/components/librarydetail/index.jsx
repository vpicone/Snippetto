import React, { Component } from "react";
import { withRouter } from "react-router";

import LibraryDetailQuery from "./LibraryDetailQuery";
import LibraryDetailPresentation from "./LibraryDetailPresentation";

class LibraryDetail extends Component {
  render() {
    return (
      <LibraryDetailQuery
        id={this.props.match.params.id}
        render={(library, { isLoading, isError }) => {
          if (isLoading) {
            return null;
          }
          if (isError) {
            return <div>There was an error with the request...</div>;
          }
          return <LibraryDetailPresentation library={library} />;
        }}
      />
    );
  }
}

export default withRouter(LibraryDetail);

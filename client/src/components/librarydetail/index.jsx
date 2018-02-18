import React, { Component } from "react";
import { withRouter } from "react-router";

import LibraryDetailQuery from "./LibraryDetailQuery";
import LibraryDetailPresentation from "./LibraryDetailPresentation";

class LibraryDetail extends Component {
  state = {
    linkedName: "",
    linkedPublisher: ""
  };

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        linkedName: this.props.location.state.name,
        linkedPublisher: this.props.location.state.publisher
      });
    }
  }

  render() {
    return (
      <LibraryDetailQuery
        id={this.props.match.params.id}
        render={(library, { isLoading, isError }) => {
          if (isLoading) {
            return (
              <LibraryDetailPresentation
                loading={true}
                name={this.state.linkedName}
                publisher={this.state.linkedPublisher}
              />
            );
          }
          if (isError) {
            return <div>There was an error with the request...</div>;
          }
          return (
            <LibraryDetailPresentation
              name={library.name}
              publisher={library.publisher}
              library={library}
            />
          );
        }}
      />
    );
  }
}

export default withRouter(LibraryDetail);

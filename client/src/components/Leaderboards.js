import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

class LeaderBoards extends Component {
  state = {};
  render() {
    return <Link to="/">Home</Link>;
  }
}

const query = gql`
  {
    allLibraries {
      name
    }
  }
`;

export default graphql(query)(LeaderBoards);

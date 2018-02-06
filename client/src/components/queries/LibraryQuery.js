import { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const QUERY = gql`
  query libraryDetail($id: ID!) {
    library(id: $id) {
      name
      url
      id
      snippets {
        id
        description
        prefix
        name
      }
    }
  }
`;

class LibraryQuery extends Component {
  render() {
    const { isLoading, isError, library, children } = this.props;
    return children && children(library, { isLoading, isError });
  }
}

const mapDataToProps = ({ data }) => {
  const isLoading = data.loading;
  const isError = !!data.error;
  const library = data.library || {};

  return { isLoading, isError, library };
};

const mapPropsToOptions = ({ id }) => ({ variables: { id } });

export default graphql(QUERY, {
  options: mapPropsToOptions,
  props: mapDataToProps
})(LibraryQuery);

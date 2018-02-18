import { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const QUERY = gql`
  query LibraryById($id: ID!) {
    libraryById(id: $id) {
      name
      links {
        name
        url
      }
      id
      description
      publisher
      snippets {
        id
        description
        prefix
        name
        body
      }
    }
  }
`;

class LibraryDetail extends Component {
  render() {
    const { isLoading, isError, library, render } = this.props;
    return render && render(library, { isLoading, isError });
  }
}

const mapDataToProps = ({ data }) => {
  const isLoading = data.loading;
  const isError = !!data.error;
  const library = data.libraryById || {};

  return { isLoading, isError, library };
};

const mapPropsToOptions = ({ id }) => {
  return {
    variables: { id }
  };
};

export default graphql(QUERY, {
  options: mapPropsToOptions,
  props: mapDataToProps
})(LibraryDetail);

import { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const QUERY = gql`
  {
    allLibraries {
      id
      name
      tags
      description
      links {
        name
        url
      }
    }
  }
`;

class LibraryListQuery extends Component {
  render() {
    const { isLoading, isError, isEmpty, libraries, render } = this.props;
    return render && render(libraries, { isLoading, isError, isEmpty });
  }
}

const mapDataToProps = ({ data }) => {
  const isLoading = data.loading;
  const isError = !!data.error;
  const isEmpty = !!data.allLibraries && data.allLibraries.length === 0;
  const libraries = data.allLibraries || [];
  return { isLoading, isError, isEmpty, libraries };
};

export default graphql(QUERY, {
  props: mapDataToProps
})(LibraryListQuery);

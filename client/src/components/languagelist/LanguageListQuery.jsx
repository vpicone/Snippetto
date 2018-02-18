import { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const QUERY = gql`
  {
    allLanguages {
      name
    }
  }
`;

class LanguageListQuery extends Component {
  render() {
    const { isLoading, isError, isEmpty, languages, render } = this.props;
    return render && render(languages, { isLoading, isError, isEmpty });
  }
}

const mapDataToProps = ({ data }) => {
  const isLoading = data.loading;
  const isError = !!data.error;
  const isEmpty = !!data.allLanguages && data.allLanguages.length === 0;
  const languages = data.allLanguages || [];
  return {
    isLoading,
    isError,
    isEmpty,
    languages
  };
};

export default graphql(QUERY, {
  props: mapDataToProps
})(LanguageListQuery);

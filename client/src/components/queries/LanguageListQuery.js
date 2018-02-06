import { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const QUERY = gql`
  {
    languages {
      name
      libraries {
        id
        name
      }
    }
  }
`;

class LanguageListQuery extends Component {
  render() {
    const { isLoading, isError, isEmpty, languages, children } = this.props;
    return children && children(languages, { isLoading, isError, isEmpty });
  }
}

const mapDataToProps = ({ data }) => {
  const isLoading = data.loading;
  const isError = !!data.error;
  const isEmpty = !!data.languages && data.languages.length === 0;
  const languages = data.languages || [];
  return { isLoading, isError, isEmpty, languages };
};

export default graphql(QUERY, {
  props: mapDataToProps
})(LanguageListQuery);

import React, { Component } from "react";

import LanguageListQuery from "./LanguageListQuery";
import LanguageListPresentation from "./LanguageListPresentation";

class LanguageList extends Component {
  state = {};

  render() {
    return (
      <LanguageListQuery
        render={(languages, { isLoading, isEmpty, isError }) => {
          if (isLoading) {
            return null;
          }
          if (isEmpty) {
            return <div>No languages found.</div>;
          }
          if (isError) {
            return <div>There was an error with the request...</div>;
          }
          return <LanguageListPresentation languages={languages} />;
        }}
      />
    );
  }
}

export default LanguageList;

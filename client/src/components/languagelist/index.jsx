import React, { Component } from "react";
import { Select } from "antd";

import LanguageListQuery from "./LanguageListQuery";
import LanguageListPresentation from "./LanguageListPresentation";

class LanguageList extends Component {
  state = {};

  render() {
    return (
      <LanguageListQuery
        render={(languages, { isLoading, isEmpty, isError }) => {
          if (isLoading) {
            return (
              <Select
                size={"large"}
                style={{ width: 300 }}
                placeholder="Loading"
              />
            );
          }
          if (isEmpty) {
            return <div>No languages found.</div>;
          }
          if (isError) {
            return <div>There was an error with the request...</div>;
          }
          return (
            <LanguageListPresentation
              onChange={this.props.onChange}
              languages={languages}
            />
          );
        }}
      />
    );
  }
}

export default LanguageList;

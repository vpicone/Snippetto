import React, { Component } from "react";
import styled from "styled-components";

import LanguageCard from "./LanguageCard";
import LanguageListQuery from "../queries/LanguageListQuery";

const CardContainer = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

class LanguageList extends Component {
  state = {};

  render() {
    return (
      <LanguageListQuery>
        {(languages, { isLoading, isEmpty, isError }) => {
          if (isLoading) {
            return null;
          }
          if (isEmpty) {
            return <div>No languages found.</div>;
          }
          if (isError) {
            return <div>There was an error with the request...</div>;
          }

          return (
            <CardContainer>
              {languages.map(({ name, libraries }, index) => {
                return (
                  <LanguageCard key={index} name={name} libraries={libraries} />
                );
              })}
            </CardContainer>
          );
        }}
      </LanguageListQuery>
    );
  }
}

export default LanguageList;

import React, { Component, Fragment } from "react";
import styled from "styled-components";
import LibraryListCard from "./LibraryListCard";
import LanguageSearch from "../languagelist";
import { Input } from "antd";

const Search = Input.Search;

const Grid = styled.div`
  width: 90%;
  max-width: 1240px;
  margin: 0 auto;

  display: grid;
  grid-gap: 1rem;

  grid-template-columns: repeat(auto-fit, minmax(200px, auto));
  grid-template-rows: repeat(auto-fill, minmax(50px, auto));
  justify-content: center;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
`;

class LibraryList extends Component {
  state = { expandedLibrary: null, input: "", language: "" };

  onLanguageChange = language => {
    this.setState({
      language
    });
  };
  toggleExpand = id => {
    if (this.state.expandedLibrary === id) {
      this.setState({ expandedLibrary: null });
    } else {
      this.setState({ expandedLibrary: id });
    }
  };

  filterLibraries = () => {
    if (this.state.language) {
      return this.props.libraries.filter(({ languages }) =>
        languages.includes(this.state.language)
      );
    }
    return this.props.libraries.filter(lib => {
      return lib.name.toLowerCase().includes(this.state.input);
    });
  };

  render() {
    const libraries = this.filterLibraries();
    return (
      <Fragment>
        <InputContainer>
          <Search
            placeholder="Search libraries"
            style={{ width: 300 }}
            size="large"
            onChange={e =>
              this.setState({ input: e.target.value.toLowerCase() })
            }
          />
          <LanguageSearch onChange={this.onLanguageChange} />
        </InputContainer>
        <Grid itemCount={libraries.length}>
          {libraries.map(lib => {
            return (
              <LibraryListCard
                key={lib.id}
                toggleExpand={this.toggleExpand}
                expanded={this.state.expandedLibrary === lib.id}
                library={lib}
              />
            );
          })}
        </Grid>
      </Fragment>
    );
  }
}

export default LibraryList;

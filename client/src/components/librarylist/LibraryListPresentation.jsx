import React, { Component, Fragment } from "react";
import styled from "styled-components";
import LibraryListCard from "./LibraryListCard";
import { Input } from "antd";

const Search = Input.Search;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;

  @supports (display: grid) {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, auto));
    grid-template-rows: repeat(auto-fit, minmax(50px, auto));
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

class LibraryList extends Component {
  state = { expandedLibrary: null, input: "" };

  toggleExpand = id => {
    if (this.state.expandedLibrary === id) {
      this.setState({ expandedLibrary: null });
    } else {
      this.setState({ expandedLibrary: id });
    }
  };

  filterLibraries = () => {
    return this.props.libraries.filter(lib => {
      return (
        lib.name.toLowerCase().includes(this.state.input) ||
        lib.languages.join(" ").includes(this.state.input)
      );
    });
  };

  render() {
    return (
      <Fragment>
        <InputContainer>
          <Search
            placeholder="search libraries"
            style={{ width: 300 }}
            size="large"
            onChange={e =>
              this.setState({ input: e.target.value.toLowerCase() })
            }
          />
        </InputContainer>
        <Grid>
          {this.filterLibraries().map(lib => {
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

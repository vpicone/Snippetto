import React, { Component, Fragment } from "react";
import styled from "styled-components";
import LibraryListItem from "./LibraryListItem";

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;

  @supports (display: grid) {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, auto));
    grid-template-rows: repeat(auto-fit, minmax(100px, auto));
  }
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
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
        lib.tags.join(" ").includes(this.state.input)
      );
    });
  };

  render() {
    return (
      <Fragment>
        <InputContainer>
          <label>
            Search:{` `}
            <input
              type="text"
              value={this.state.input}
              onChange={e =>
                this.setState({ input: e.target.value.toLowerCase() })
              }
            />
          </label>
        </InputContainer>
        <Grid>
          {this.filterLibraries().map(lib => {
            return (
              <LibraryListItem
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

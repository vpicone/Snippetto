import React, { Component, Fragment } from "react";
import styled from "styled-components";

const GridItem = styled.div`
  border: 1px solid rgb(0, 95, 107);
  grid-row-end: span ${({ expanded }) => (expanded ? "2" : "1")};
  background-color: ${({ expanded }) => (expanded ? "#ecf3f2" : "#f8fbfa")};
  color: #001529;
  border-radius: 3px;
  padding: 1rem;
  &:hover {
    cursor: ${({ expanded }) => (expanded ? "default" : "pointer")};
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 0.75rem;
  justify-content: flex-start;
  align-items: baseline;
`;

const Tag = styled.div`
  padding: 0rem 0.5rem;
  margin: 0.25rem;
  border-radius: 5px;
  background: skyblue;
`;

class LibraryListItem extends Component {
  state = { expanded: false };

  render() {
    const { id, name, tags, links, description } = this.props.library;
    return (
      <GridItem
        expanded={this.props.expanded}
        onClick={() => this.props.toggleExpand(id)}
      >
        <h3>{name}</h3>
        {this.props.expanded && (
          <Fragment>
            <a href={`/libraries/${id}`}>Detail View</a>
            <p>{description}</p>
            <h4>Links: </h4>
            <ul>
              {links.map((link, index) => {
                return (
                  <li key={index}>
                    <a href={link.url}>{link.name}</a>
                  </li>
                );
              })}
            </ul>
            <TagContainer>
              <h4>Tags: </h4>
              {tags.map((tag, index) => {
                return <Tag key={index}>{tag}</Tag>;
              })}
            </TagContainer>
          </Fragment>
        )}
      </GridItem>
    );
  }
}

export default LibraryListItem;

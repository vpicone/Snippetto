import React, { Component, Fragment } from "react";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const GridItem = styled.div`
  border: 1px solid rgb(0, 95, 107);
  text-align: center;
  grid-row-end: span ${({ expanded }) => (expanded ? "2" : "1")};
  background-color: ${({ expanded }) => (expanded ? "#ecf3f2" : "#f8fbfa")};
  color: #001529;
  border-radius: 3px;
  padding: 1rem;
  &:hover {
    cursor: ${({ expanded }) => (expanded ? "default" : "pointer")};
  }
`;

const LanguageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: baseline;
`;

const Language = styled.div`
  padding: 0rem 0.5rem;
  margin: 0.25rem;
  border-radius: 5px;
  background: skyblue;
`;

class LibraryListItem extends Component {
  state = { expanded: false };

  render() {
    const {
      id,
      name,
      languages,
      links,
      description,
      publisher,
      image
    } = this.props.library;
    console.log(image);
    return (
      <GridItem
        expanded={this.props.expanded}
        onClick={() => this.props.toggleExpand(id)}
      >
        <div style={{ margin: "1rem 0" }}>
          <Image cloudName="vpp" publicId={image} width="96" crop="scale" />
        </div>
        <h3>
          <b>{name}</b> by {publisher}
        </h3>
        {this.props.expanded && (
          <Fragment>
            <p>{description}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "1rem 0"
              }}
            >
              <Link to={`/library/${id}/table`}>
                <button>Table</button>
              </Link>
              <Link to={`/library/${id}/game`}>
                <button>Practice</button>
              </Link>
            </div>
            <label>
              languages:
              <LanguageContainer>
                {languages.map((language, index) => {
                  return <Language key={index}>{language}</Language>;
                })}
              </LanguageContainer>
            </label>
            <label>
              links:
              <ul>
                {links.map((link, index) => {
                  return (
                    <li key={index}>
                      <a href={link.url}>{link.name}</a>
                    </li>
                  );
                })}
              </ul>
            </label>
          </Fragment>
        )}
      </GridItem>
    );
  }
}

export default LibraryListItem;

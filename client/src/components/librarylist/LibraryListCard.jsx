import React, { Component, Fragment } from "react";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card, Icon, Avatar, Tag, Tooltip } from "antd";
const { Meta } = Card;

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

    return (
      <Card
        style={
          this.props.expanded
            ? { gridRowEnd: "span 3" }
            : { gridRowEnd: "span 2" }
        }
        bodyStyle={{ height: "calc(100% - 47px)" }}
        actions={[
          <Tooltip placement="bottomRight" title={"snippet table"}>
            <Link to={`/library/${id}/table`}>
              <Icon type="table" />
            </Link>
          </Tooltip>,
          <Tooltip placement="bottom" title={"practice"}>
            <Link to={`/library/${id}/game`}>
              <Icon type="play-circle-o" />
            </Link>
          </Tooltip>,
          <Tooltip placement="bottomLeft" title={"more"}>
            <Icon onClick={() => this.props.toggleExpand(id)} type="ellipsis" />
          </Tooltip>
        ]}
      >
        <Meta
          title={name}
          avatar={
            <Avatar
              src={`https://res.cloudinary.com/vpp/image/upload/q_auto,b_white/${image}`}
            />
          }
          description={`by ${publisher}`}
        />
        {this.props.expanded && (
          <div style={{ marginTop: "1rem" }}>
            <p>{description}</p>
            <h6 style={{ marginRight: 8, display: "inline" }}>Languages:</h6>
            {languages.map((language, index) => {
              return (
                <Tag style={{ margin: "4px" }} key={index}>
                  {language}
                </Tag>
              );
            })}
          </div>
        )}
      </Card>
    );
  }
}

export default LibraryListItem;

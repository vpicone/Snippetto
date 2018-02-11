import React, { Component } from "react";
import { Avatar, Card, Button, Tooltip } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 0.5fr 1fr 4fr 1fr 1fr;
  justify-items: center;
  align-items: center;
`;

export default class LanguageListPresentation extends Component {
  state = {};
  render() {
    return this.props.languages.map((language, index) => {
      return (
        <Card
          style={{ margin: "2rem auto", maxWidth: "70vw" }}
          bodyStyle={{ padding: "0 1rem" }}
          key={index}
          title={language.name}
        >
          {language.libraries.map(
            ({ name, image, description, publisher, id }) => {
              return (
                <Card style={{ margin: "2rem 1rem" }} type="inner" title={name}>
                  <CardGrid>
                    <Avatar
                      src={`https://res.cloudinary.com/vpp/image/upload/q_auto,b_white/${image}`}
                    />
                    <div>
                      by <b>{publisher}</b>
                    </div>
                    <div>{description}</div>
                    <Tooltip placement="bottomRight" title={"snippet table"}>
                      <Link to={`/library/${id}/table`}>
                        <Button size="large" shape="circle" icon="table" />
                      </Link>
                    </Tooltip>
                    <Tooltip placement="bottom" title={"practice"}>
                      <Link to={`/library/${id}/game`}>
                        <Button
                          size="large"
                          shape="circle"
                          icon="play-circle-o"
                        />
                      </Link>
                    </Tooltip>
                  </CardGrid>
                </Card>
              );
            }
          )}
        </Card>
      );
    });
  }
}

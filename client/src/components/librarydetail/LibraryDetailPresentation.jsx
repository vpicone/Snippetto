import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Layout, Tabs, Icon } from "antd";
import styled from "styled-components";

import TableView from "./TableView";
import GameView from "./GameView";

const TabPane = Tabs.TabPane;
const Content = Layout.Content;

const Title = styled.h1`
  margin-right: 2rem;
  font-size: 1.5rem;
  text-align: right;
`;

class LibraryDetailPresentation extends Component {
  // Possible views: details, leaderboard, snippets
  render() {
    const { library, match } = this.props;
    console.log(match.params);
    return (
      <Content
        style={{
          background: "#fff",
          padding: "2rem",
          minHeight: "280px",
          maxWidth: "1000px",
          margin: "2rem auto"
        }}
      >
        <Tabs
          tabBarExtraContent={
            <Title>
              <b>{library.name}</b> by {library.publisher}
            </Title>
          }
          defaultActiveKey={match.params.view === "table" ? "1" : "2"}
        >
          <TabPane
            tab={
              <span>
                <Link to={`/library/${match.params.id}/table`}>
                  <Icon type="table" />Table
                </Link>
              </span>
            }
            key="1"
          >
            <TableView library={library} />
          </TabPane>
          <TabPane
            tab={
              <Link to={`/library/${match.params.id}/game`}>
                <span>
                  <Icon type="play-circle-o" />Practice
                </span>
              </Link>
            }
            key="2"
          >
            <GameView snippets={library.snippets} name={library.name} />
          </TabPane>
        </Tabs>
      </Content>
    );
  }
}

export default withRouter(LibraryDetailPresentation);

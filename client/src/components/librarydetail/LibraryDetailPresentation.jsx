import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Layout, Tabs, Icon } from "antd";
import styled from "styled-components";
import Fade from "../shared/Fade";

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
  render() {
    const { library, match } = this.props;
    return (
      <Content
        style={{
          background: "#fff",
          padding: "2rem",
          minHeight: "90vh",
          maxWidth: "1240px",
          margin: "2rem auto"
        }}
      >
        <Tabs
          tabBarExtraContent={
            this.props.name && (
              <Title>
                <b>{this.props.name}</b> by {this.props.publisher}
              </Title>
            )
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
            <Fade in={!this.props.loading}>
              {!this.props.loading && <TableView library={library} />}
            </Fade>
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
            {!this.props.loading && (
              <Fade in={!this.props.loading}>
                <GameView snippets={library.snippets} name={this.props.name} />
              </Fade>
            )}
          </TabPane>
        </Tabs>
      </Content>
    );
  }
}

export default withRouter(LibraryDetailPresentation);

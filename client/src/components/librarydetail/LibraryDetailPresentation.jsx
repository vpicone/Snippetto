import React from "react";
import { withRouter } from "react-router";
import { Route, Link } from "react-router-dom";
import { Layout, Tabs, Icon } from "antd";

import TableView from "./TableView";
import GameView from "./GameView";

const TabPane = Tabs.TabPane;
const Content = Layout.Content;

const LibraryDetailPresentation = ({ library, match }) => {
  // Possible views: details, leaderboard, snippets

  return (
    <Content
      style={{ background: "#fff", padding: 24, margin: 0, minHeight: 280 }}
    >
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={
            <span>
              <Icon type="table" />Table
            </span>
          }
          key="1"
        >
          <TableView library={library} />
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="play-circle-o" />Practice
            </span>
          }
          key="2"
        >
          <GameView snippets={library.snippets} name={library.name} />
        </TabPane>

        <Route
          exact
          path={`${match.path}/table`}
          render={() => <TableView library={library} />}
        />
        <Route
          exact
          path={`${match.path}/game`}
          render={() => (
            <GameView snippets={library.snippets} name={library.name} />
          )}
        />
      </Tabs>
    </Content>
  );
};

export default withRouter(LibraryDetailPresentation);

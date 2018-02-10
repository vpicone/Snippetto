import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { Route, Link } from "react-router-dom";

import TableView from "./TableView";
import GameView from "./GameView";

const LibraryDetailPresentation = ({ library, match }) => {
  // Possible views: details, leaderboard, snippets

  return (
    <Fragment>
      <div>
        <Link replace to={`${match.url}/table`}>
          table
        </Link>
        <Link replace to={`${match.url}/game`}>
          game
        </Link>
      </div>
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
    </Fragment>
  );
};

export default withRouter(LibraryDetailPresentation);

import React, { Component } from "react";
import { Table } from "antd";

import LibraryQuery from "../queries/LibraryQuery";
import Game from "./Game/GameContainer";

class LibraryDetail extends Component {
  // Possible views: details, leaderboard, snippets
  state = { view: "game", pageSize: 50 };

  changePageSize = size => {
    this.setState({ pageSize: size });
  };

  render() {
    return (
      <LibraryQuery id={this.props.match.params.id}>
        {(library, { isLoading, isError }) => {
          if (isLoading) {
            return null;
          }

          if (isError) {
            return <div>There was an error with this request.</div>;
          }

          const snippets = library.snippets.map(
            ({ description, name, prefix, id }, index) => {
              return {
                key: id,
                id,
                name,
                prefix,
                description
              };
            }
          );

          if (this.state.view === "list") {
            const columns = [
              {
                title: "Name",
                dataIndex: "name",
                key: "name"
              },
              {
                title: "Description",
                dataIndex: "description",
                key: "description"
              },
              {
                title: "Prefix",
                dataIndex: "prefix",
                key: "prefix"
              }
            ];

            return (
              <Table
                style={{ margin: "25px" }}
                bordered
                dataSource={snippets}
                pagination={{ pageSize: 25, showSizeChanger: true }}
                columns={columns}
                title={() => <h1>{library.name}</h1>}
              />
            );
          } else if (this.state.view === "game") {
            return <Game snippets={snippets} name={library.name} />;
          }
        }}
      </LibraryQuery>
    );
  }
}

export default LibraryDetail;

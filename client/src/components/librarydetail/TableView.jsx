import React, { Component } from "react";
import { Table, Layout, Button } from "antd";
import { Link } from "react-router-dom";

const Content = Layout.Content;

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

const Title = props => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem"
      }}
    >
      <h1>{props.children}</h1>
      <Link to={`/library/${props.id}/game`}>
        <Button size="large" shape="circle" icon="play-circle-o" />
      </Link>
    </div>
  );
};

class TableView extends Component {
  state = { pageSize: 50 };

  changePageSize = size => {
    this.setState({ pageSize: size });
  };

  snippetsToDataSource = () => {
    return this.props.library.snippets.map(
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
  };

  render() {
    return (
      <Table
        style={{ margin: "25px" }}
        dataSource={this.snippetsToDataSource()}
        pagination={{ pageSize: 25, showSizeChanger: true }}
        columns={columns}
        title={() => (
          <Title id={this.props.library.id}>{this.props.library.name}</Title>
        )}
      />
    );
  }
}

export default TableView;

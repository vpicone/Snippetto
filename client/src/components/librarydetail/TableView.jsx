import React, { Component } from "react";
import { Table } from "antd";

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
        bordered
        dataSource={this.snippetsToDataSource()}
        pagination={{ pageSize: 25, showSizeChanger: true }}
        columns={columns}
        title={() => <h1>{this.props.library.name}</h1>}
      />
    );
  }
}

export default TableView;

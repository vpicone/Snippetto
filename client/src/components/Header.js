import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;

export default class HeaderContent extends Component {
  state = {};
  render() {
    return (
      <Header>
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item key="2">
            <Link to="/languages">Languages</Link>
          </Menu.Item>

          <Menu.Item key="3">
            <Link to="/profile" />
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

import React, { Component } from "react";
import { Select } from "antd";
const { titleCase } = require("change-case");
const Option = Select.Option;
// import { Link } from "react-router-dom";
// import styled from "styled-components";

export default class LanguageListPresentation extends Component {
  state = {};
  render() {
    return (
      <Select
        size={"large"}
        onChange={language => this.props.onChange(language)}
        showSearch
        allowClear
        style={{ width: 300 }}
        placeholder="Select a language"
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {this.props.languages.map(({ name }) => {
          return <Option key={name}>{titleCase(name)}</Option>;
        })}
      </Select>
    );
  }
}

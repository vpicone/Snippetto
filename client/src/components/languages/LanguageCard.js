import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";

class LanguageCard extends Component {
  state = {};
  render() {
    const { name, libraries } = this.props;
    return (
      <Card title={name} style={{ width: 300, margin: "1rem" }}>
        {libraries.map(({ name, id }) => {
          return (
            <Link key={id} to={`/libraries/${id}`}>
              <Card title={name} type="inner" style={{ margin: "1rem" }} />
            </Link>
          );
        })}
      </Card>
    );
  }
}

export default LanguageCard;

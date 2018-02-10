import React, { Component, Fragment } from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
// import LanguageList from "./languages/LanguageList";

class LandingPage extends Component {
  state = {};
  render() {
    return (
      <Fragment>
        <h1>Snippetto</h1>
        <Link to="/languages">
          <Button>Languages</Button>
        </Link>
        <Link to="/libraries">
          <Button>Languages</Button>
        </Link>
      </Fragment>
    );
  }
}

export default LandingPage;

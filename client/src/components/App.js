import React, { Component } from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";

// import LibraryList from "./LibraryList";
import LibraryDetail from "./libraries/LibraryDetail";
// import LandingPage from "./LandingPage";
import LibraryList from "./librarylist";
import { Layout } from "antd";
import Header from "./Header";

const { Content, Footer } = Layout;

const StyledFooter = styled(Footer)`
  /* position: fixed;
  right: 0;
  bottom: 0;
  left: 0; */
  padding: 1rem;
  text-align: center;
`;

class App extends Component {
  render() {
    return (
      <Layout>
        <Header />
        <Content
          style={{ padding: "0 50px", minHeight: "90vh", margin: " 2rem auto" }}
        >
          <Route exact path="/" component={LibraryList} />
          <Route path="/libraries/:id" component={LibraryDetail} />
        </Content>

        <StyledFooter>Made with love by VPP</StyledFooter>
      </Layout>
    );
  }
}

export default App;

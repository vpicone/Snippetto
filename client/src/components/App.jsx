import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import Header from "./Header";
import LibraryDetail from "./librarydetail";
import LibraryList from "./librarylist";

import LanguageList from "./languagelist";

const { Content, Footer } = Layout;

const StyledFooter = styled(Footer)`
  padding: 1rem;
  text-align: center;
`;

const App = () => (
  <Layout>
    <Header />
    <Content style={{ padding: "0 4rem", minHeight: "90vh" }}>
      <Switch>
        <Route exact path="/" component={LibraryList} />
        <Route path="/library/:id/:view" component={LibraryDetail} />
        <Route path="/languages" component={LanguageList} />
      </Switch>
    </Content>
    <StyledFooter>Made with love by VPP</StyledFooter>
  </Layout>
);

export default App;

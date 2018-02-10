import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './Header';
import LibraryDetail from './librarydetail';
import LibraryList from './librarylist';

const { Content, Footer } = Layout;

const StyledFooter = styled(Footer)`
  /* position: fixed;
  right: 0;
  bottom: 0;
  left: 0; */
  padding: 1rem;
  text-align: center;
`;

const App = () => (
  <Layout>
    <Header />
    <Content
      style={{ padding: '0 50px', minHeight: '90vh', margin: ' 2rem auto' }}
    >
      <Switch>
        <Route exact path="/" component={LibraryList} />
        <Route path="/library/:id" component={LibraryDetail} />
        <Route path="/library/:id/:view" component={LibraryDetail} />
      </Switch>
    </Content>

    <StyledFooter>Made with love by VPP</StyledFooter>
  </Layout>
);


export default App;

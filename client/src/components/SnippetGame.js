import React, { Component } from 'react';
import styled from 'styled-components';

class SnippetGame extends Component {
    state = {
        unansweredSnippets: [],
        correctSnippets:[],
        incorrectSnippets:[]
     }

     componentWillMount() {
        this.setState({unansweredSnippets: this.props.snippets})
     }

    render() {
        return (

        );
    }
}

export default SnippetGame;
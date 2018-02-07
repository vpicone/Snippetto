import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Card, Alert } from "antd";

const Grid = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.5fr 0.5fr;
`;

const Input = styled.input`
  border: 2px solid;
  border-radius: 4px;
  border-color: ${props => (props.correct ? "forestgreen" : "default")};
  margin: 1rem;
`;

const Form = styled.form`
  grid-row-start: span 2;
  text-align: center;
`;

class Game extends Component {
  state = {
    completed: [],
    skipped: [],
    currentSnippet: null,
    alert: {},
    correctInput: false,
    value: "",
    reveal: false
  };

  componentDidMount() {
    const remainingSnippets = this.getRemainingSnippets();
    this.setState({ currentSnippet: remainingSnippets[0] });
    this.textInput && this.focusTextInput();
  }

  focusTextInput = () => {
    this.textInput.focus();
  };

  getRemainingSnippets = () => {
    const remainingSnippets = this.props.snippets.filter(snippet => {
      return ![...this.state.completed, ...this.state.skipped].includes(
        snippet
      );
    });
    return remainingSnippets;
  };

  handleSkip = () => {
    const remainingSnippets = this.getRemainingSnippets();
    this.setState({
      skipped: [...this.state.skipped, remainingSnippets[0]],
      currentSnippet: remainingSnippets[1]
    });
    this.focusTextInput();
  };

  handleComplete = () => {
    const remainingSnippets = this.getRemainingSnippets();
    this.setState({
      completed: [...this.state.completed, remainingSnippets[0]],
      currentSnippet: remainingSnippets[1],
      alert: { message: "Correct!", type: "success" },
      value: "",
      correctInput: false
    });
    this.focusTextInput();
  };

  handleChange = e => {
    const { value } = e.target;
    const correctInput = value === this.state.currentSnippet.prefix;
    this.setState({
      correctInput,
      value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.correctInput) {
      this.handleComplete();
    } else {
      this.setState({
        alert: { message: "Incorrect, try again.", type: "error" },
        value: ""
      });
    }

    //Clear success/error alerts
    setTimeout(
      () =>
        this.setState({
          alert: {}
        }),
      2000
    );
  };

  render() {
    if (!this.state.currentSnippet) {
      return null;
    }
    const { name, description } = this.state.currentSnippet;
    const answeredCount =
      this.state.completed.length + this.state.skipped.length;

    return (
      <Fragment>
        <h1>{this.props.name}</h1>
        <Card
          title={`${answeredCount}/${this.props.snippets.length}`}
          style={{ maxWidth: "600px" }}
        >
          <Grid>
            <div>
              <strong>Name:</strong> {`${name}`}
              <br />
              {description && (
                <Fragment>
                  <strong>Description:</strong> {description}
                </Fragment>
              )}
            </div>
            <Form onSubmit={this.handleSubmit}>
              <label>
                <strong>Prefix: </strong>
                <Input
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.value}
                  correct={this.state.correctInput}
                  innerRef={x => {
                    this.textInput = x;
                  }}
                />
              </label>
              <br />
              <input type="submit" value="submit" />
            </Form>
            <div>
              <button onClick={this.handleSkip}>Skip</button>
              <button
                onClick={() => {
                  this.setState({ reveal: !this.state.reveal });
                }}
              >
                Reveal
              </button>
              <button
                disabled={!this.state.correctInput}
                onClick={this.handleComplete}
              >
                Complete
              </button>
            </div>
            {this.state.reveal && this.state.currentSnippet.prefix}
          </Grid>
        </Card>
        {this.state.alert.message && (
          <Alert
            message={this.state.alert.message}
            type={this.state.alert.type}
            style={{ marginTop: "1rem" }}
          />
        )}
      </Fragment>
    );
  }
}

export default Game;

import React, { Component } from "react";
import styled from "styled-components";
import { Card, Alert, Button, Tooltip, Form, Input, Divider } from "antd";
import SnippetBody from "./SnippetBody";
import CompletedGame from "./CompletedGame";
const FormItem = Form.Item;

const GameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: center;
  min-height: 80vh;
  margin-top: 2rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
  min-height: 35vh;
  grid-template-columns: 1fr 275px;
  justify-content: center;
  justify-items: center;
  align-items: center;
`;

const GridItem = styled.div`
  padding: 0.5rem;
`;

class GameView extends Component {
  state = {
    completed: [],
    skipped: [],
    currentSnippet: null,
    alert: {},
    value: "",
    revealed: false,
    done: false
  };

  clearAlert() {
    setTimeout(
      () =>
        this.setState({
          alert: {}
        }),
      1000
    );
  }
  componentDidMount = () => {
    const remainingSnippets = this.getRemainingSnippets();
    this.setState({ currentSnippet: remainingSnippets[0] });
  };

  restartGame = () => {
    this.setState({
      completed: [],
      skipped: [],
      done: false
    });
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
    if (remainingSnippets.length === 1) {
      this.setState({
        done: true,
        skipped: [...this.state.skipped, remainingSnippets[0]],
        alert: { message: "Skipped", type: "warning" }
      });
    } else {
      this.setState({
        skipped: [...this.state.skipped, remainingSnippets[0]],
        currentSnippet: remainingSnippets[1],
        alert: { message: "Skipped", type: "warning" }
      });
    }

    this.clearAlert();
  };

  handleComplete = () => {
    const remainingSnippets = this.getRemainingSnippets();
    if (remainingSnippets.length === 1) {
      this.setState({
        done: true,
        completed: [...this.state.completed, remainingSnippets[0]],
        alert: { message: "Correct!", type: "success" }
      });
    } else {
      this.setState({
        completed: [...this.state.completed, remainingSnippets[0]],
        currentSnippet: remainingSnippets[1],
        alert: { message: "Correct!", type: "success" },
        value: ""
      });
    }
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.value === this.state.currentSnippet.prefix) {
      this.handleComplete();
    } else {
      this.setState({
        alert: { message: "Incorrect, try again.", type: "error" },
        value: ""
      });
    }

    //Clear success/error alerts
    this.clearAlert();
  };

  render() {
    const answeredCount =
      this.state.completed.length + this.state.skipped.length;

    if (this.state.done) {
      return (
        <GameContainer>
          <CompletedGame
            restartGame={this.restartGame}
            completedPercent={
              this.state.completed.length / this.props.snippets.length
            }
          />
        </GameContainer>
      );
    }

    if (!this.state.currentSnippet && !this.state.done) {
      return null;
    }

    const validInput =
      this.state.value === this.state.currentSnippet.prefix ? "success" : "";

    return (
      <GameContainer>
        <Card
          title={this.state.currentSnippet.name}
          extra={`${answeredCount + 1}/${this.props.snippets.length}`}
          style={{ width: "70%" }}
        >
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormGrid>
              <GridItem
                style={{
                  overflow: "hidden",
                  overflowWrap: "break-word"
                }}
              >
                {this.state.currentSnippet.description}
                <Divider />
                <SnippetBody body={this.state.currentSnippet.body} />
              </GridItem>
              <GridItem>
                <FormItem
                  hasFeedback
                  label="prefix"
                  validateStatus={validInput}
                >
                  <Input
                    autoFocus
                    placeholder={
                      this.state.revealed
                        ? this.state.currentSnippet.prefix
                        : ""
                    }
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </FormItem>
                <Tooltip
                  title={
                    this.state.revealed ? "hide answers" : "reveal answers"
                  }
                >
                  <Button
                    style={{ marginRight: "1rem" }}
                    shape="circle"
                    icon={this.state.revealed ? "minus" : "plus"}
                    onClick={() => {
                      this.setState({ revealed: !this.state.revealed });
                    }}
                  />
                </Tooltip>
                <Button onClick={this.handleSkip}>Skip</Button>
                <Button
                  type="primary"
                  style={{ marginLeft: "1rem" }}
                  disabled={!validInput}
                  onClick={this.handleComplete}
                >
                  Complete
                </Button>
              </GridItem>
            </FormGrid>
          </Form>
        </Card>
        {this.state.alert.message && (
          <Alert
            style={{
              position: "fixed",
              bottom: "3rem"
            }}
            message={this.state.alert.message}
            type={this.state.alert.type}
          />
        )}
      </GameContainer>
    );
  }
}

export default GameView;

import React from "react";
import styled from "styled-components";
import { Button, Divider } from "antd";
import { Link } from "react-router-dom";

const CompletedContainer = styled.div`
  max-width: 20rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
`;

const CompletedGame = ({ completedPercent, restartGame }) => {
  return (
    <CompletedContainer>
      <h1>{`${Math.round(completedPercent * 100)}% Good work!`}</h1>
      <div>
        <Button
          style={{ margin: "1rem" }}
          onClick={restartGame}
          size="large"
          type="primary"
          icon="reload"
        >
          Restart
        </Button>
        <Link to="/">
          <Button style={{ margin: "1rem" }} size="large" icon="appstore">
            Libraries
          </Button>
        </Link>
      </div>
    </CompletedContainer>
  );
};

export default CompletedGame;

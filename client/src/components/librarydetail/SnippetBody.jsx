import React from "react";
import styled from "styled-components";

const SnippetBodyContainer = styled.div`
  padding: 0.5rem;
  overflow: hidden;
  overflow-wrap: break-word;
  font-size: 0.8rem;
  background-color: rgba(0, 0, 0, 0.05);
`;

const SnippetBody = ({ body }) => {
  return (
    <SnippetBodyContainer>
      {body.map((line, index) => <code key={index}>{`${line}\n`}</code>)}
    </SnippetBodyContainer>
  );
};

export default SnippetBody;

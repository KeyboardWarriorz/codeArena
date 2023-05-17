import React from "react";
import { styled } from "styled-components";

const Div = styled.div`
  width: 24%;
  border-radius: 10px;
  background-color: #f9f5d7;
  margin: 1rem 0.5rem 0 0.5rem;
  box-shadow: 2px 2px 5px #6d6d6d60;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: start;
  position: relative;
  cursor: default;

  #hr {
    width: 100%;
    border-top: 1px solid #d7d7d7;
    height: 8px;
    margin: 5px 0;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const Content = styled.div`
  font-size: 13px;
  line-height: 1.25rem;
`;

export default function WordCard(props) {
  return (
    <Div>
      <Title>{props.name}</Title>
      <div id="hr"></div>
      <Content>{props.content}</Content>
    </Div>
  );
}

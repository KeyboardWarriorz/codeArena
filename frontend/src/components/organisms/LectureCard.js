import React from "react";
import { styled } from "styled-components";
import { useState } from "react";

const Div = styled.div`
  width: 28vw;
  border-radius: 10px;
  height: 20vh;
  background-color: #ecf6ff;
  margin: 1rem 0.5rem 0 0.5rem;
  box-shadow: 2px 2px 5px #6d6d6d60;
  cursor: pointer;

  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  #hr {
    width: 100%;
    border-top: 1px solid #d7d7d7;
    height: 8px;
    margin: 5px 0;
  }
`;

const Title = styled.div`
  // display: flex;
  // width: 100%;
  // align-items: center;
  text-align: center;

  p {
    margin-top: 0;
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
`;

const Arrow = styled.div`
  font-weight: bold;
  font-size: 0.7rem;
  position: absolute;
  color: #7b8ef5;
  right: 7px;
  bottom: 7px;
`;

export default function LectureCard(props) {
  return (
    <Div>
      <Title>
        <p>{props.title}</p>
      </Title>
      <Arrow>→ GO!</Arrow>
    </Div>
  );
}

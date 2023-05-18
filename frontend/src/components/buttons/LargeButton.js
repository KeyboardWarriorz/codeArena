import React from "react";
import styled from "styled-components";

const Button = styled.button`
  color: white;
  font-family: "NanumSquareNeo-Variable";
  font-size: 1.5rem;
  font-weight: bold;
  width: calc(100vw - 60px);
  border: none;
  background-color: #fab809;
  border-radius: 5px;
  box-shadow: 4px 3px 3px #fab809;                                                                                                                                                                           0
  margin-bottom: 10px;
  padding: 10px;
  height: 60px;
  cursor: pointer;

  position: fixed;
  left: 30px;
  bottom: 40px;

  &: hover {
    background-color: #f8a70c;
  }
`;

export default function LargeButton(props) {
  return <Button>{props.text}</Button>;
}

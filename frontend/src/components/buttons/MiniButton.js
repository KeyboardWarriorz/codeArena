import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 70px;
  height: 20px;
  background-color: #fab809;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-family: "NanumSquareNeo-Variable";
  color: white;
  cursor: pointer;

  &: hover {
    background-color: #f8a70c;
  }
`;
export default function MiniButton(props) {
  return <Button onClick={props.func}>{props.text}</Button>;
}

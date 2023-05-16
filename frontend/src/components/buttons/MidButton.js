import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 336px;
  height: 45px;
  color: white;
  border-radius: 6px;
  border: none;
  padding-left: 8px;
  background-color: #fab809;
  font-size: 17px;
  font-weight: 700;
  font-family: "NanumSquareNeo-Variable";
  margin-top: 1rem;

  box-shadow: 3px 2px 5px #f8a70c;

  cursor: pointer;

  &: hover {
    background-color: #f8a70c;
  }

  &: focus {
    outline: none;
  }
`;

export default function MidButton(props) {
  return <Button>{props.text}</Button>;
}

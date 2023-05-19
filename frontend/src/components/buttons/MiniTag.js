import React from "react";
import styled, { css } from "styled-components";

const Tag = styled.span`
  height: 20px;
  background-color: #fab809;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-family: "NanumSquareNeo-Variable";
  color: white;
  padding: 4px 12px 2px 12px;
  margin-right: 5px;

  ${(props) =>
    props.green &&
    css`
      background-color: #006e61;
    `}

  ${(props) =>
    props.red &&
    css`
      background-color: #c25450;
      padding-left: 20px;
      padding-right: 20px;
    `}
`;
export default function MiniTag(props) {
  return (
    <Tag {...props} onClick={props.func}>
      {props.text}
    </Tag>
  );
}

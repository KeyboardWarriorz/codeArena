import React from "react";
import { styled } from "styled-components";

const Div = styled.div`
  display: flex;
  padding: 30px;

  > h3 {
    margin-top: 0;
  }
`;

const Select = styled.div``;

export default function ProblemList() {
  return (
    <Div>
      <h3> 📝 분야별 문제 풀이</h3>
      <div></div>
    </Div>
  );
}

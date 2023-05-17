import React from "react";
import { styled } from "styled-components";

const Div = styled.div`
  display: flex;
  padding: 25px;
`;

export default function ProblemList() {
  return (
    <Div>
      <div> 📝 분야별 문제 풀이</div>
      <div></div>
    </Div>
  );
}

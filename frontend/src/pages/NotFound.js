import React from "react";
import { styled } from "styled-components";

const Div = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export default function NotFound() {
  return (
    <Div>
      404 NOT FOUND
      <a href="/">홈으로</a>
    </Div>
  );
}

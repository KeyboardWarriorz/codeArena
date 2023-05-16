import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthDiv from "../components/organisms/AuthDiv";
import MidButton from "../components/buttons/MidButton";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    text-decoration: none;
  }

  #button {
    margin-top: 30px;
  }
`;

const Title = styled.div`
  display: flex;
  margin-bottom: 30px;
  font-size: 70px;
  font-family: "Staatliches";
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Code = styled.p`
  margin-bottom: 0;
  color: #fab809;
`;

const Arena = styled.p`
  margin-bottom: 0;
  color: #6e6053;
`;

export default function ChangePW() {
  return (
    <Div>
      <Link to="/">
        <Title>
          <Code>CODE</Code>
          <Arena>Arena</Arena>
        </Title>
      </Link>

      <AuthDiv
        title="현재 비밀번호"
        es={true}
        type="password"
        placeholder="영문, 숫자 포함 6~12자"
      ></AuthDiv>
      <AuthDiv title="새 비밀번호" es={true} type="password"></AuthDiv>
      <AuthDiv title="새 비밀번호 확인" es={true} type="password"></AuthDiv>

      <div id="button">
        <MidButton text="비밀번호 변경" />
      </div>
    </Div>
  );
}

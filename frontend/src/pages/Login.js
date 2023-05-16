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

  .margin {
    margin-top: 14px;
  }

  #button {
    margin-top: 30px;
  }
`;

const Title = styled.div`
  display: flex;
  margin-bottom: 0;
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

const Nav = styled.div`
  display: flex;
  cursor: default;
  text-decoration: none;

  p {
    margin-top: 0.5rem;
  }

  a {
    text-decoration: none;
    font-weight: bold;
    color: #fab809;
  }

  #signUp {
    &: hover {
      color: #f8a70c;
    }
  }
`;

export default function Login() {
  return (
    <Div>
      <Link to="/">
        <Title>
          <Code>CODE</Code>
          <Arena>Arena</Arena>
        </Title>
      </Link>

      <Nav>
        <p>아직 회원이 아니신가요?&nbsp;&nbsp;</p>
        <Link to="/signup">
          <p id="signUp">회원가입</p>
        </Link>
      </Nav>

      <div className="margin">
        <AuthDiv title="아이디" placeholder="ex. ca412@gmail.com" />
      </div>
      <div className="margin">
        <AuthDiv title="비밀번호" type="password" />
      </div>

      <div id="button">
        <MidButton text="로그인" />
      </div>
    </Div>
  );
}

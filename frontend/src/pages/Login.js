import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  margin-bottom: 0;
  font-size: 70px;
  font-family: "Staatliches";
  cursor: default;
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
`;

export default function Login() {
  return (
    <Div>
      <Title>
        <Code>CODE</Code>
        <Arena>Arena</Arena>
      </Title>

      <Nav>
        <p>아직 회원이 아니신가요?&nbsp;&nbsp;</p>
        <Link to="/signup">
          <p className="signUp">회원가입</p>
        </Link>
      </Nav>
    </Div>
  );
}

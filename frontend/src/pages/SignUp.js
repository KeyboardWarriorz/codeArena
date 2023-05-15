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

const Box = styled.div``;

const Input = styled.input`
  // font-family: "Press Start 2P";
  // width: 650px;
  // height: 60px;
  // background-color: white;
  // font-size: 1.25em;
  // border: none;
  // text-align: center;
  // color: #050623;
  // margin: 10px 0px;
  // &:hover {
  //   cursor: pointer;
  //   background-color: #eaf1f0;
  // }
`;

export default function SignUp() {
  return (
    <Div>
      <Title>
        <Code>CODE</Code>
        <Arena>Arena</Arena>
      </Title>

      <Nav>
        <p>이미 회원이신가요?&nbsp;&nbsp;</p>
        <Link to="/login">
          <p className="login">로그인</p>
        </Link>
      </Nav>

      <Box>
        <Input type="text" placeholder="ex. ca412@gmail.com" />
      </Box>
    </Div>
  );
}

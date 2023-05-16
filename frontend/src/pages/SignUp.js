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

  #login {
    &: hover {
      color: #f8a70c;
    }
  }

  a {
    text-decoration: none;
    font-weight: bold;
    color: #fab809;
  }
`;

export default function SignUp() {
  // 이메일, 닉네임 중복 확인 후 둘 다 true 처리 되면 가입하기 버튼 누를 수 있게
  // 200 완료되면 input을 read-only로 바꾸고 중복 확인 버튼은 수정 버튼으로 바뀜
  // 수정 누르면 input 열리고 false로 바뀌고 중복 확인 버튼 다시 생김

  return (
    <Div>
      <Link to="/">
        <Title>
          <Code>CODE</Code>
          <Arena>Arena</Arena>
        </Title>
      </Link>

      <Nav>
        <p>이미 회원이신가요?&nbsp;&nbsp;</p>
        <Link to="/login">
          <p id="login">로그인</p>
        </Link>
      </Nav>

      <AuthDiv
        title="아이디"
        es={true}
        placeholder="ex. ca412@gmail.com"
        isbutton={true}
      ></AuthDiv>
      <AuthDiv
        title="비밀번호"
        es={true}
        type="password"
        placeholder="영문, 숫자 포함 6~12자"
      ></AuthDiv>
      <AuthDiv title="비밀번호 확인" es={true}></AuthDiv>
      <AuthDiv
        title="닉네임"
        es={true}
        type="password"
        placeholder="공백 미포함 8자 이하"
        added="닉네임 설정 후 변경 불가"
        isbutton={true}
      ></AuthDiv>

      <MidButton text="가입하기"></MidButton>
    </Div>
  );
}

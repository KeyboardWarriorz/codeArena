import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthDiv from "../components/organisms/AuthDiv";
import MidButton from "../components/buttons/MidButton";
import swal from "sweetalert";

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
  const navigate = useNavigate();
  // 로그인 함수
  const [id, setID] = useState("");
  const [pw, setPW] = useState("");
  const [loginData, setLogin] = useState({ userId: "", userPw: "" });

  function onChangeId(e) {
    setID(e.target.value);
  }

  function onChangePW(e) {
    setPW(e.target.value);
  }

  useEffect(() => {
    setLogin({ userId: id, userPw: pw });
  }, [id, pw]); // id와 pw값이 변경될때마다 제출용 object에 반영

  function onEnter(e) {
    if (e.key === "Enter") {
      onSubmit();
    }
  }

  function onSubmit() {
    axios
      .post("http://localhost:8080/user/login", loginData, {
        headers: {
          Authorization: "login",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          window.localStorage.setItem("login", true);
          window.localStorage.setItem("userId", res.data.userId);
          window.localStorage.setItem("nickname", res.data.nickname);
          window.localStorage.setItem("profileImage", res.data.profile_image);
          window.localStorage.setItem("accessToken", res.data.access_token);
          window.localStorage.setItem("refreshToken", res.data.refresh_token);
          // console.log(res.data.access_token);
          // console.log(res.data.refresh_token);
          navigate("/");
        }
      })
      .catch((e) => {
        // console.log(e.response.data);
        swal(e.response.data);
      });
  }

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

      <div onChange={onChangeId} className="margin">
        <AuthDiv title="아이디" placeholder="ex. ca412@gmail.com" />
      </div>
      <div onChange={onChangePW} className="margin" onKeyDown={onEnter}>
        <AuthDiv title="비밀번호" type="password" />
      </div>

      <div id="button" onClick={onSubmit}>
        <MidButton text="로그인" />
      </div>
    </Div>
  );
}

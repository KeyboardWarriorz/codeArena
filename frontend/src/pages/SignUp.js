import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import swal from "sweetalert";

import { Link, useNavigate } from "react-router-dom";
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
    margin-top: 20px;
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
  const navigate = useNavigate();
  useEffect(() => {
    if (pw1 != "" && pw2 != "" && pw1 === pw2) {
      setEqual(true);
    }
  });

  const [id, setID] = useState("");
  const [nickname, setNickname] = useState("");
  const [idcheck, setIdCheck] = useState(false);
  const [idstate, setIdState] = useState("");
  const [namecheck, setNameCheck] = useState(false);
  const [namestate, setNameState] = useState("닉네임 설정 후 변경 불가");

  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [equal, setEqual] = useState(false);

  const [data, setData] = useState({ userId: "", userPw: "", nickname: "" });

  function onChangeId(e) {
    setID(e.target.value);
    setIdCheck(false);
    setIdState("");
  }

  function onChangeNickname(e) {
    setNickname(e.target.value);
    setNameCheck(false);
    setNameState("닉네임 설정 후 변경 불가");
  }

  function onChange1(e) {
    setPw1(e.target.value);
    setEqual(false);
  }

  function onChange2(e) {
    setPw2(e.target.value);
    setEqual(false);
  }

  useEffect(() => {
    setData({ userId: id, userPw: pw1, nickname: nickname });
  }, [id, pw1, pw2, nickname]);

  function idCheck() {
    if (id === "") {
      swal("아이디를 입력해주세요");
    } else {
      axios
        .get(`http://localhost:8080/user/check/userid/${id}`)
        .then((res) => {
          if (res.status === 200) {
            setIdCheck(true);
            setIdState("사용 가능한 아이디입니다");
          }
        })
        .catch((e) => swal(e.response.data));
    }
  }

  function nameCheck() {
    if (nickname === "") {
      swal("닉네임을 입력해주세요");
    } else if (nickname.length > 8) {
      swal("닉네임은 8자 이하로 입력해주세요.");
    } else {
      axios
        .get(`http://localhost:8080/user/check/nickname/${nickname}`)
        .then((res) => {
          if (res.status === 200) {
            setNameCheck(true);
            setNameState("사용 가능한 닉네임입니다");
          }
        })
        .catch((e) => swal(e.response.data));
    }
  }

  const [pwstate, setPwState] = useState("비밀번호를 확인해주세요");
  function checkPW() {
    let num = pw1.search(/[0-9]/g);
    let eng = pw1.search(/[a-z]/gi);

    if (pw1.length < 6 || pw1.length > 12) {
      setPwState("6자리 ~ 12자리 이내로 입력해주세요.");
      return false;
    } else if (pw1.search(/\s/) != -1) {
      setPwState("비밀번호는 공백 없이 입력해주세요.");
      return false;
    } else if (num < 0 || eng < 0) {
      setPwState("영문과 숫자를 혼합하여 입력해주세요.");
      return false;
    } else {
      return true;
    }
  }

  function onEnter(e) {
    if (e.key === "Enter") {
      onSubmit();
    }
  }

  // 회원가입 진짜 제출
  function onSubmit() {
    if (checkPW() === false) {
      swal(pwstate);
    } else {
      if (!equal) {
        swal("비밀번호가 서로 일치하지 않습니다");
      } else if (!idcheck) {
        swal("아이디 중복 확인을 해주세요");
      } else if (!namecheck) {
        swal("닉네임 중복 확인을 해주세요");
      } else {
        axios
          .post("http://localhost:8080/user/signup", data)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              navigate("/login");
            }
          })
          .catch((e) => swal(e.response.data));
      }
    }
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
        <p>이미 회원이신가요?&nbsp;&nbsp;</p>
        <Link to="/login">
          <p id="login">로그인</p>
        </Link>
      </Nav>
      <div onChange={onChangeId}>
        <AuthDiv
          title="아이디"
          es={true}
          placeholder="ex. sunzzang412"
          added={idstate}
          isbutton={true}
          buttonfunc={idCheck}
        ></AuthDiv>
      </div>

      <div onChange={onChange1}>
        <AuthDiv
          title="비밀번호"
          es={true}
          type="password"
          placeholder="영문, 숫자 포함 6~12자"
        />
      </div>

      <div onChange={onChange2}>
        <AuthDiv title="비밀번호 확인" es={true} type="password" />
      </div>

      <div onChange={onChangeNickname} onKeyDown={onEnter}>
        <AuthDiv
          title="닉네임"
          es={true}
          placeholder="공백 미포함 8자 이하"
          added={namestate}
          isbutton={true}
          buttonfunc={nameCheck}
        />
      </div>
      <div id="button" onClick={onSubmit}>
        <MidButton text="가입하기" />
      </div>
    </Div>
  );
}

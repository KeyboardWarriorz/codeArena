import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthDiv from "../components/organisms/AuthDiv";
import MidButton from "../components/buttons/MidButton";
import axios from "axios";
import { useState, useEffect } from "react";

import swal from "sweetalert";

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
  const navigate = useNavigate();
  const [userId, setUserId] = useState(window.localStorage.userId);

  const [pw0, setPw0] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [equal, setEqual] = useState(false);
  const [pwstate, setPwState] = useState("비밀번호를 확인해주세요");

  const [data, setData] = useState({
    now_pw: "",
    change_pw: "",
  });

  function onChange0(e) {
    setPw0(e.target.value);
    setEqual(false);
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
    setData({ now_pw: pw0, change_pw: pw1 });
  }, [pw0, pw1, pw2]);

  useEffect(() => {
    if (pw1 != "" && pw2 != "" && pw1 === pw2) {
      setEqual(true);
    }
  });

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

  function onSubmit() {
    if (checkPW() === false) {
      swal(pwstate);
    } else {
      if (!equal) {
        swal("비밀번호가 서로 일치하지 않습니다");
      } else {
        axios
          .post(`http://localhost:8080/user/password/${userId}`, data)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              navigate("/login");
              axios
                .get("http://localhost:8080/user/logout")
                .then((res) => {
                  if (res.status === 200) {
                    window.localStorage.clear();
                    navigate("/");
                    window.location.reload();
                  }
                })
                .catch((e) => window.alert(e.response.data));
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

      <div onChange={onChange0}>
        <AuthDiv
          title="현재 비밀번호"
          es={true}
          type="password"
          placeholder="영문, 숫자 포함 6~12자"
        />
      </div>

      <div onChange={onChange1}>
        <AuthDiv
          title="새 비밀번호"
          es={true}
          type="password"
          placeholder="영문, 숫자 포함 6~12자"
        />
      </div>
      <div onChange={onChange2}>
        <AuthDiv title="새 비밀번호 확인" es={true} type="password" />
      </div>

      <div id="button" onClick={onSubmit}>
        <MidButton text="비밀번호 변경" />
      </div>
    </Div>
  );
}

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import Jieun from "../../assets/images/Jieun.svg";
import Seongwhan from "../../assets/images/Seongwhan.svg";
import Eunhyo from "../../assets/images/Eunhyo.svg";
import Junseo from "../../assets/images/Junseo.svg";
import Sunyeong from "../../assets/images/Sunyeong.svg";

import MiniButton from "../buttons/MiniButton";

export default function GPTModal(props) {
  //   // 모달 뒤 스크롤 방지
  //   useEffect(() => {
  //     document.body.style.cssText = `
  //           position: fixed;
  //           top: -${window.scrollY}px;
  //           overflow-y: scroll;
  //           width: 100%;`;
  //     return () => {
  //       const scrollY = document.body.style.top;
  //       document.body.style.cssText = "";
  //       window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  //     };
  //   }, []);

  const [selected, setSelected] = useState(
    window.localStorage.getItem("profileImage")
  );
  const userId = window.localStorage.getItem("userId");

  function changeProflie() {
    axios
      .post("http://localhost:8080/user/profile", {
        profileImage: selected,
        user_id: userId,
      })
      .then((res) => {
        window.localStorage.setItem("profileImage", selected);
        window.location.href = `/user/${userId}`;
      })
      .catch((e) => console.log(""));
  }

  return (
    <ModalBox onClick={props.clickModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <p id="close" onClick={props.clickModal}>
          X
        </p>

        <div className="flex">
          <h3>프로필 이미지 변경하기</h3>
        </div>
        <div id="hr" />
        <div id="images">
          <img
            onClick={() => {
              setSelected("Jieun");
            }}
            className={selected === "Jieun" ? "selected" : ""}
            src={Jieun}
          />
          <img
            onClick={() => {
              setSelected("Junseo");
            }}
            className={selected === "Junseo" ? "selected" : ""}
            src={Junseo}
          />
          <img
            onClick={() => {
              setSelected("Seongwhan");
            }}
            className={selected === "Seongwhan" ? "selected" : ""}
            src={Seongwhan}
          />
          <img
            onClick={() => {
              setSelected("Eunhyo");
            }}
            className={selected === "Eunhyo" ? "selected" : ""}
            src={Eunhyo}
          />
          <img
            onClick={() => {
              setSelected("Sunyeong");
            }}
            className={selected === "Sunyeong" ? "selected" : ""}
            src={Sunyeong}
          />
        </div>
        <div id="submit" onClick={changeProflie}>
          <MiniButton text="선택하기" />
        </div>
      </ModalContent>
    </ModalBox>
  );
}

// 모달 창 뒷배경
const ModalBox = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000050;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  font-weight: 400;
  height: 300px;
  width: 500px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  position: relative;

  img.selected {
    border-radius: 50%;
    border: 5px solid pink;
  }

  #submit {
    position: absolute;
    top: 88%;
    left: 82%;
  }

  #images {
    justify-content: space-between;
    margin-top: 50px;
    width: 80%;
  }

  img {
    width: 60px;
    height: 60px;
    margin-left: 10px;
    margin-right: 10px;
  }

  #close {
    margin-top: 1.25rem;
    cursor: pointer;
    font-size: 1.3em;
    margin-left: 450px;
    margin-bottom: 0;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: start;
    width: 90%;
  }

  #hr {
    border-top: 2px solid #d7d7d7;
    height: 8px;
    margin-top: 7px;
  }
`;

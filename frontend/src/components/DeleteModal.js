import React from "react";
import styled from "styled-components";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

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
  // padding: 1.5rem 3rem;
  height: 300px;
  width: 500px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #32333e;
  > div:nth-of-type(1) {
    font-size: 1.3em;
    font-family: "Press Start 2P";
    margin-left: 550px;
    :hover {
      cursor: pointer;
    }
  }
  > div:nth-of-type(2) {
    margin-top: 40px;
    font-family: "Dunggeunmo";
    font-size: 2em;
  }
  > div:nth-of-type(3) {
    margin-top: 30px;
    font-size: 1.7em;
  }
  > div:nth-of-type(4) {
    margin-top: 10px;
    font-size: 1em;
  }
  > div {
    display: flex;
    justify-content: space-evenly;
    margin-top: 1.25rem;
    > button {
      border: none;
      width: 180px;
      margin-top: 20px;
      padding: 0.4rem 0.6rem;
      font-size: 0.9rem;
      margin-right: 10px;
      border-radius: 5px;
      font-size: 1.5em;
      background-color: #5bb8a1;
      :hover {
        cursor: pointer;
      }
    }
  }
`;

export default function DeleteModal(props) {
  // 모달 뒤 스크롤 방지

  return (
    <ModalBox onClick={props.clickModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <div onClick={props.clickModal}>X</div>
        <div>
          <p>정말</p>
          <p>삭제</p>
          <p>하시겠습니까?</p>
        </div>
        <div>
          <button onClick={props.func}>계속하기</button>
        </div>
      </ModalContent>
    </ModalBox>
  );
}

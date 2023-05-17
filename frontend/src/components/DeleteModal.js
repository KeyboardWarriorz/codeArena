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
  font-weight: 400;
  height: 300px;
  width: 500px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  > div:nth-of-type(1) {
    // 엑스버튼
    cursor: pointer;
    font-size: 1.3em;
    margin-left: 450px;
  }
  > div:nth-of-type(2) {
    // 삭제문구
    margin-top: 40px;
    font-size: 1.8em;

    > #red {
      color: #c25450;
      font-weight: bold;
    }
  }
  > div {
    display: flex;
    justify-content: space-evenly;
    margin-top: 1.25rem;
    > button {
      font-family: "NanumSquareNeo-Variable";
      color: white;
      border: none;
      width: 400px;
      height: 45px;
      margin-top: 20px;
      padding: 0.4rem 0.6rem;
      border-radius: 5px;
      font-size: 1.3em;
      font-weight: 600;
      background-color: #c25450;
      cursor: pointer;
      box-shadow: 3px 2px 5px #c25450;
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
          <p>정말&nbsp;</p>
          <p id="red">삭제</p>
          <p>하시겠습니까?</p>
        </div>
        <div>
          <button onClick={props.func}>삭제하기</button>
        </div>
      </ModalContent>
    </ModalBox>
  );
}

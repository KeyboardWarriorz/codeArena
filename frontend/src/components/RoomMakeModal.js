import React from "react";
import styled from "styled-components";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import EH from "../assets/images/Eunhyo.svg";

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

const Title = styled.div`
  font-weight: bold;
  font-size: 25px;
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 20px;

  > div:nth-of-type(1) {
    padding-left: 20px;
    width: 100px;
    margin-right: 10px;
    font-size: 20px;
  }

  > select {
    font-family: "NanumSquareNeo-Variable";
    width: 450px;
    height: 45px;
    outline: none;
    border: solid 2px #aeaeae;
    border-radius: 8px;
    padding-left: 10px;
    padding-right: 50px;

    > option {
      color: red;
    }
  }

  > input {
    padding-left: 10px;
    padding-right: 10px;
    font-family: "NanumSquareNeo-Variable";
    width: 450px;
    height: 40px;
    outline: none;
    border: solid 2px #aeaeae;
    border-radius: 8px;
  }
`;

const ModalContent = styled.div`
  font-weight: 400;
  height: 470px;
  width: 700px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;

  > div:nth-of-type(1) {
    margin-top: 10px;
    margin-bottom: 10px;
    // 엑스버튼
    width: 600px;
    height: 50px;
    cursor: pointer;
    font-size: 1.3em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // margin-left: 450px;

    > div:nth-of-type(1) {
      margin-top: 40px;
    }

    > div:nth-of-type(2) {
      color: #aeaeae;
      font-size: 15px;
    }
  }

  > div:nth-of-type(3) {
    margin-top: 0px;
    display: flex;
    flex-direction: column;
    height: 250px;
    width: 600px;
  }

  > div:nth-of-type(4) {
    margin-top: 10px;
  }

  > div {
    display: flex;
    // justify-content: space-evenly;
    justify-content: space-around;

    width: 600px;
    margin-top: 1.25rem;
    > button:nth-of-type(1) {
      font-family: "NanumSquareNeo-Variable";
      color: white;
      border: none;
      width: 265px;
      height: 45px;
      margin-top: 20px;
      padding: 0.4rem 0.6rem;
      border-radius: 5px;
      font-size: 1.3em;
      font-weight: 600;
      background-color: #fab809;
      cursor: pointer;
      box-shadow: 3px 2px 5px #fab809;
    }

    > button:nth-of-type(2) {
      font-family: "NanumSquareNeo-Variable";
      color: white;
      border: none;
      width: 265px;
      height: 45px;
      margin-top: 20px;
      padding: 0.4rem 0.6rem;
      border-radius: 5px;
      font-size: 1.3em;
      font-weight: 600;
      background-color: #aeaeae;
      cursor: pointer;
      box-shadow: 3px 2px 5px #aeaeae;
    }
  }
`;

const Hr = styled.div`
  border-top: 1px solid #bcbfc180;
  height: 8px;
  margin-top: 20px;
`;

export default function RoomMakeModal(props) {
  // 모달 뒤 스크롤 방지
  return (
    <ModalBox onClick={props.clickModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <div>
          <Title>방 생성하기</Title>
          <div onClick={props.clickModal}>X</div>
        </div>
        <Hr />
        <div>
          <InputDiv>
            <div>방 제목</div>
            <input></input>
          </InputDiv>
          <InputDiv>
            <div>카테고리</div>
            <select name="order" form="myForm">
              <option value="americano">아메리카노</option>
              <option value="caffe latte">카페라테</option>
              <option value="cafe au lait">카페오레</option>
              <option value="espresso">에스프레소</option>
            </select>
          </InputDiv>
          <InputDiv>
            <div>문제 수</div>
            <select name="order" form="myForm">
              <option value="americano">아메리카노</option>
              <option value="caffe latte">카페라테</option>
              <option value="cafe au lait">카페오레</option>
              <option value="espresso">에스프레소</option>
            </select>
          </InputDiv>
        </div>
        <div>
          <button onClick={props.func}>방 만들기</button>
          <button onClick={props.func}>취소</button>
        </div>
      </ModalContent>
    </ModalBox>
  );
}

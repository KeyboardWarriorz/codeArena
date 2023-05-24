import React, { useEffect } from "react";
import styled from "styled-components";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import GPT from "../../assets/images/GPT.png";
import example from "../../assets/images/example.png";

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

  return (
    <ModalBox onClick={props.clickModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <div id="title">
          <div className="flex">
            <img id="img1" src={GPT} />
            <h3>단어 검색 모드 사용 방법</h3>
          </div>

          <div>
            <p id="close" onClick={props.clickModal}>
              X
            </p>
          </div>
        </div>
        <div id="text">
          <div id="hr" />
          <p>잘 모르는 단어나 개념을 발견하셨다면,</p>
          <p>
            <span id="yellow">검색 모드</span>를 켜고, 그 부분을{" "}
            <span>드래그</span>
            해보세요!
          </p>
          <p>chatGPT가 바로 그 단어에 대해서 알려준답니다.</p>
          <p>
            내가 몰랐던 단어를 <span>단어장</span>에 저장할 수도 있어요.
          </p>

          <div id="ex">
            <p id="usage">사용 예시</p>
            <img id="img2" src={example} />
          </div>
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
  height: 420px;
  width: 480px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;

  #img1 {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }

  #img2 {
    width: 280px;
    height: 150px;
    margin-right: 10px;
  }

  #close {
    // margin-top: 1.25rem;
    cursor: pointer;
    font-size: 1.3em;
    margin-bottom: 0;
  }

  #title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    margin-top: 20px;
  }

  #hr {
    border-top: 2px solid #d7d7d7;
    height: 8px;
    margin-top: 7px;
    padding-bottom: 7px;
  }

  span {
    color: #c25450;
    font-weight: bold;
  }

  p {
    margin-bottom: 10;
    margin-top: 5px;
    margin-right: 10px;
  }

  #text {
    width: 90%;
    text-align: start;
  }

  .flex {
    display: flex;
    align-items: center;
  }

  #ex {
    padding-top: 10px;
    display: flex;
  }

  #usage {
    font-weight: bold;
  }

  #yellow {
    color: #f8a70c;
  }
`;

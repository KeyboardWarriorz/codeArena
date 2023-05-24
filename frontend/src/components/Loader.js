import React, { useEffect } from "react";
import styled from "styled-components";
import { ClockLoader } from "react-spinners";

export default function GPTModal(props) {
  // 모달 뒤 스크롤 방지
  useEffect(() => {
    document.body.style.cssText = `
            position: fixed;
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <ModalBox onClick={props.clickModal}>
      <ClockLoader color="#F8A70C" />
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
  background-color: #ffffff70;
  display: flex;
  justify-content: center;
  align-items: center;
`;

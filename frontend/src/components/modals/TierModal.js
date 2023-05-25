import React from "react";
import styled from "styled-components";

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

const CloseBtn = styled.button`
  cursor: pointer;
  position: absolute;
  top: -10px;
  right: -10px;
  border-radius: 100px;
  border: 0px;
  width: 30px;
  height: 30px;
  color: #ffffff;
  background-color: #fab809;
`;

const Title = styled.div`
  margin-left: 10px;
  font-weight: bold;
  font-size: 25px;
`;

const ModalContent = styled.div`
  position: relative;
  font-weight: 400;
  height: 420px;
  width: 600px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;

  > div:nth-of-type(1) {
    // margin-bottom: 30px;
    // 엑스버튼
    width: 500px;
    height: 50px;
    cursor: pointer;
    font-size: 1.3em;
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-top: 30px;
    // > div:nth-of-type(1) {
    //   margin-top: 40px;
    // }

    // > div:nth-of-type(2) {
    //   color: #aeaeae;
    //   font-size: 15px;
    // }
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
const EXP = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Hr = styled.div`
  border-top: 1px solid #bcbfc180;
  height: 5px;
  margin-top: 10px;
`;

const TierBox = styled.div`
  width: 100%;
  > div:nth-of-type(1) {
    color: #a86d17;
  }

  > div:nth-of-type(2) {
    color: #827e78;
  }
  > div:nth-of-type(3) {
    color: #f2c178;
  }
  > div:nth-of-type(4) {
    color: #4ce9d6;
  }
  > div:nth-of-type(5) {
    color: #2ab3d1;
  }
  > div:nth-of-type(6) {
    color: #e069bf;
  }
`;

const Tier = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 60px;
  font-size: 20px;
`;

export default function RoomMakeModal(props) {
  // 모달 뒤 스크롤 방지
  return (
    <ModalBox onClick={props.clickModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={props.clickModal}>X</CloseBtn>
        <div>
          <Title>티어</Title>
          <EXP>EXP</EXP>
        </div>
        <Hr />
        <TierBox>
          <Tier>
            <div>· BRONZE</div>
            <div>1</div>
          </Tier>
          <Tier>
            <div>· SILVER</div>
            <div>500</div>
          </Tier>
          <Tier>
            <div>· GOLD</div>
            <div>1000</div>
          </Tier>
          <Tier>
            <div>· PLATINUM</div>
            <div>2000</div>
          </Tier>
          <Tier>
            <div>· DIAMOND</div>
            <div>5000</div>
          </Tier>
          <Tier>
            <div>· RUBY</div>
            <div>10000</div>
          </Tier>
        </TierBox>
      </ModalContent>
    </ModalBox>
  );
}

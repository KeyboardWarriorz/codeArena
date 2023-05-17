import React from "react";
import styled from "styled-components";

import Jieun from "../assets/images/Jieun.svg";
import Seongwhan from "../assets/images/Seongwhan.svg";
import Eunhyo from "../assets/images/Eunhyo.svg";
import Junseo from "../assets/images/Junseo.svg";
import Sunyeong from "../assets/images/Sunyeong.svg";

const MainContainer = styled.div`
  border: 2px red solid;
  padding: 3rem 6rem; 4rem;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 4px 3px 3px #49494930;
  align-items: center;
  height: 10vh;
  margin-bottom: 10px;
`;

const CharBox = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NameBox = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const ChangeBox = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: start;
  justify-content: flex-end;
  padding-right: 10px;
`;

const IdBox = styled.div`
  text-align: left;
  color: #9b9b9b;
`;

const ProdataBox = styled.div`
  text-align: left;
  margin-top: 10px;
  font-size: 1.5rem;

  > span:nth-of-type(1) {
    color: #006e61;
    font-weight: bold;
  }

  > span:nth-of-type(2) {
    // 티어: 티어에 따라 색 변경해야 함
    margin-right: 30px;
  }

  > span:nth-of-type(3) {
    margin-right: 30px;
  }

  > span:nth-of-type(4) {
    margin-right: 30px;
  }

  > span:nth-of-type(5) {
    margin-right: 30px;
    color: #9b9b9b;
    font-size: 15px;
  }
`;

const Profile = styled.div`
  background-color: white;
  border-radius: 50%;
  height: 80px;
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid #efefef;

  img {
    width: 70px;
    height: 70px;
  }
`;

const ChangeBtn = styled.button`
  font-family: "NanumSquareNeo-Variable";

  background-color: #fab809;
  margin-left: 5px;
  color: white;
  border: none;
  margin-top: 20px;
  padding: 0.3rem 1rem;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
`;

const ContentBox = styled.div``;

const ProblemBox = styled.div`
  display: flex;
  .title {
    display: flex;
    justify-content: space-between;
  }
`;

const Solved = styled.div`
  background-color: #f8f8f8;
  width: 50%;
`;

const Failed = styled.div`
  background-color: #f8f8f8;
  width: 50%;
`;

const Words = styled.div``;
export default function MyPage() {
  return (
    <MainContainer>
      <ProfileBox>
        <CharBox>
          <Profile>
            <img src={Jieun} />
          </Profile>
        </CharBox>
        <NameBox>
          <IdBox>아이디</IdBox>
          <ProdataBox>
            <span>성환조</span>
            <span>&nbsp;님</span>
            <span>GOLD</span>
            <span>380P</span>
            <span>다음 레벨까지 20349P</span>
          </ProdataBox>
        </NameBox>
        <ChangeBox>
          <ChangeBtn>프로필 변경</ChangeBtn>
          <ChangeBtn>비밀번호 변경</ChangeBtn>
        </ChangeBox>
      </ProfileBox>
      <ContentBox>
        <ProblemBox>
          <Solved>
            <div className="title">
              <div>맞은 문제</div>
              <div>→ 전체보기</div>
            </div>
          </Solved>
          <Failed>
            <div className="title">
              <div>틀린 문제</div>
              <div>→ 전체보기</div>
            </div>
          </Failed>
        </ProblemBox>
        <Words></Words>
      </ContentBox>
    </MainContainer>
  );
}

import React from "react";

import styled from "styled-components";

const MainContainer = styled.div`
  border: 2px red solid;
  padding: 3rem 6rem; 4rem;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  border: 2px blue solid;
`;

const CharBox = styled.div`
  border: 2px green solid;
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NameBox = styled.div`
  border: 2px green solid;
  width: 70%;
`;

const ChangeBox = styled.div`
  border: 2px green solid;
  width: 20%;
`;

const IdBox = styled.div`
  border: 2px green solid;
  text-align: left;
  color: #838687;
`;

const ProdataBox = styled.div`
  border: 2px green solid;
`;

const ProfileImgBx = styled.div`
  background-color: gray;
  border-radius: 50px;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileBack = styled.div`
  background-color: white;
  border-radius: 50px;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChangeBtn = styled.div``;

export default function MyPage() {
  return (
    <MainContainer>
      <ProfileBox>
        <CharBox>
          <ProfileImgBx>
            <ProfileBack />
          </ProfileImgBx>
        </CharBox>
        <NameBox>
          <IdBox>아이디</IdBox>
          <ProdataBox>asd</ProdataBox>
        </NameBox>
        <ChangeBox>qwe</ChangeBox>
      </ProfileBox>
    </MainContainer>
  );
}

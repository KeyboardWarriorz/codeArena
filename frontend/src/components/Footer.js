import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <Div>
      <Main>
        <Logo>
          <Title>
            <Code>CODE</Code>
            <Arena>Arena</Arena>
          </Title>
        </Logo>
        <Content>
          <div>
            <span>Members</span>
            <a href="https://github.com/Jieun714">이지은</a>
            <a href="https://github.com/adoo24">김준서</a>
            <a href="https://github.com/seoeunhyo">서은효</a>
            <a href="https://github.com/drsuneamer">신선영</a>
            <a href="https://github.com/Chos1">조성환</a>
          </div>
          <div>
            <span>Project</span>
            <a style={{ color: "grey" }} href="">
              Github-Repository
            </a>
          </div>
        </Content>
      </Main>
      <div id="hr" />
      <p id="cr">ⓒ 2022 Team KeyboardWarriorZ All rights reserved</p>
    </Div>
  );
}

export default Footer;

const Div = styled.div`
  width: 100%;
  background-color: #a89f96;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10vh;
  font-size: 0.7rem;
  // font-weight: bold;

  #hr {
    border-top: 2px solid #6e6053;
    height: 8px;
    margin-top: 7px;
    padding-bottom: 7px;
    width: 95%;
  }

  #cr {
    // color: red;
    text-align: right;
    font-weight: bold;
    // background-color: red;
    width: 100%;
    margin-right: 5%;
    margin-top: 0;
    margin: 0 5% 2rem 0;
  }
`;

const Main = styled.div`
  display: flex;
  width: 100%;
`;
const Logo = styled.div`
  width: 30%;
  // background-color: yellow;
  padding-left: 10%;
`;
const Content = styled.div`
  width: 70%;
  font-size: 1rem;
  display: flex;
  align-items: end;
  flex-direction: column;
  // background-color: pink;
  justify-content: center;
  margin-right: 50px;

  div {
    margin-bottom: 5px;
  }

  span {
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: #4a483f;
    margin-left: 10px;
  }
`;

const Title = styled.div`
  display: flex;
  margin-left: 20px;
  font-size: 40px;
  font-family: "Staatliches";
`;

const Code = styled.p`
  color: #fab809;
`;

const Arena = styled.p`
  color: #6e6053;
`;

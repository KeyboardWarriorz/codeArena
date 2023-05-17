import React from "react";
import styled from "styled-components";
import WordCard from "../components/organisms/WordCard";

import Jieun from "../assets/images/Jieun.svg";
import Seongwhan from "../assets/images/Seongwhan.svg";
import Eunhyo from "../assets/images/Eunhyo.svg";
import Junseo from "../assets/images/Junseo.svg";
import Sunyeong from "../assets/images/Sunyeong.svg";
import { useNavigate } from "react-router-dom";

// CSS 코드 아래에 있음
export default function MyPage() {
  const navigate = useNavigate();
  const userId = "ss";
  // const userId = window.localStorage.getItem(userId);
  const typeArr = ["객관식", "O / X"];
  const solved = [
    { category: "Java", title: "Java Static", type: 1 },
    { category: "Java", title: "Java Static", type: 0 },
    { category: "Java", title: "Java Static", type: 0 },
    { category: "Java", title: "Java Static", type: 1 },
  ];

  const words = [
    {
      name: "chatgpt",
      content:
        "ChatGPT는 인공지능 언어 모델로, OpenAI에서 개발된 GPT-3.5 아키텍처를 기반으로 한 대화형 AI입니다. ChatGPT는 다양한 주제에 대한 질문과 답변을 수행하며, 사용자의 입력에 대해 자연스러운 대화를 제공합니다. 최신 정보와 일반적인 지식을 활용하여 유연하고 창의적인 응답을 생성하며, 다양한 사용 사례에 적용될 수 있습니다.",
    },
    {
      name: "JPA",
      content:
        "ChatGPT는 인공지능 언어 모델로, OpenAI에서 개발된 GPT-3.5 아키텍처를 기반으로 한 대화형 AI입니다. ChatGPT는 다양한 주제에 대한 질문과 답변을 수행하며, 사용자의 입력에 대해 자연스러운 대화를 제공합니다. 최신 정보와 일반적인 지식을 활용하여 유연하고 창의적인 응답을 생성하며, 다양한 사용 사례에 적용될 수 있습니다.",
    },
    {
      name: "chatgpt",
      content:
        "AOP(Aspect-Oriented Programming)은 소프트웨어 개발 패러다임으로, 관점(Aspect)을 기준으로 프로그램을 모듈화하는 접근 방식입니다. 관점은 애플리케이션에서 공통적으로 적용되는 기능을 의미하며, 코드의 분리 및 재사용성을 향상시킵니다. AOP는 핵심 비즈니스 로직과 부가적인 관심사를 분리하여 코드의 가독성과 유지보수성을 높이며, 큰 규모의 프로젝트에서 특히 유용합니다. ",
    },
  ];

  function goSolved() {
    navigate(`/user/${userId}/solved`);
  }

  function goFailed() {
    navigate(`/user/${userId}/failed`);
  }

  function goWords() {
    navigate(`/user/${userId}/word`);
  }

  function changeProfile() {
    console.log("프로필을 바꿔욤");
  }

  function changePW() {
    navigate(`/user/${userId}/changepw`);
  }
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
          <ChangeBtn onClick={changeProfile}>프로필 변경</ChangeBtn>
          <ChangeBtn onClick={changePW}>비밀번호 변경</ChangeBtn>
        </ChangeBox>
      </ProfileBox>
      <ContentBox>
        <ProblemBox>
          <div id="solved">
            <div className="title">
              <div id="blue">맞은 문제</div>
              <div className="move" onClick={goSolved}>
                → 전체보기
              </div>
            </div>
            <br />
            {solved.map((p, idx) => {
              return (
                <div key={idx}>
                  <Problem>
                    <span>{p.category}</span>
                    <span id="blue">{p.title}</span>
                    <span>{typeArr[`${p.type}`]}</span>
                  </Problem>
                  <div id="hr"></div>
                </div>
              );
            })}
          </div>

          <div id="failed">
            <div className="title">
              <div id="red">틀린 문제</div>
              <div className="move" onClick={goFailed}>
                → 전체보기
              </div>
            </div>
            <br />
            {solved.map((p, idx) => {
              return (
                <div key={idx}>
                  <Problem>
                    <span>{p.category}</span>
                    <span id="red">{p.title}</span>
                    <span>{typeArr[`${p.type}`]}</span>
                  </Problem>
                  <div id="hr"></div>
                </div>
              );
            })}
          </div>
        </ProblemBox>
        <Words>
          <div className="title">
            <div id="yellow">내 단어장</div>
            <div className="move" onClick={goWords}>
              → 전체보기
            </div>
          </div>
          <div className="words">
            {words.map((w, idx) => {
              return <WordCard key={idx} name={w.name} content={w.content} />;
            })}
          </div>
        </Words>
      </ContentBox>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  cursor: default;
  padding: 3rem 6rem; 4rem;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 4px 3px 3px #49494930;
  align-items: center;
  height: 90px;
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
  justify-content: space-between;

  #hr {
    border-top: 1px solid #d7d7d7;
    height: 8px;
    margin-top: 7px;
  }

  > div {
    // solved/failed
    box-shadow: 4px 3px 3px #49494930;
    border-radius: 5px;
    background-color: #f8f8f8;
    width: 45%;
    padding: 2%;
  }

  .title {
    display: flex;
    justify-content: space-between;

    #blue {
      color: #7279b0;
      font-weight: bold;
    }

    #red {
      color: #c25450;
      font-weight: bold;
    }

    > div:nth-of-type(2) {
      font-size: 12px;
    }
  }

  .move {
    cursor: pointer;
  }
`;

const Problem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2px;

  > span:nth-of-type(1) {
    padding-left: 10px;
    text-align: left;
    width: 20%;
  }

  #blue {
    color: #7279b0;
    text-align: left;
    width: 65%;
  }

  #red {
    color: #c25450;
    text-align: left;
    width: 65%;
  }

  > span:nth-of-type(3) {
    width: 15%;
  }
`;

const Words = styled.div`
  box-shadow: 4px 3px 3px #49494930;
  border-radius: 5px;
  background-color: #f8f8f8;
  margin-top: 10px;
  padding: 2%;
  
  .words {
    display: flex;
    flex-flow: row wrap;/
  }

  .title {
    display: flex;
    justify-content: space-between;

    #yellow {
      color: #F8A70C;
      font-weight: bold;
    }

    > div:nth-of-type(2) {
      font-size: 12px;
    }

`;

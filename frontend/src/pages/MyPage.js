import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import WordCard from "../components/organisms/WordCard";

// import Jieun from "../assets/images/Jieun.svg";
// import Seongwhan from "../assets/images/Seongwhan.svg";
// import Eunhyo from "../assets/images/Eunhyo.svg";
// import Junseo from "../assets/images/Junseo.svg";
// import Sunyeong from "../assets/images/Sunyeong.svg";
import { useNavigate } from "react-router-dom";

// CSS 코드 아래에 있음
export default function MyPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(window.localStorage.getItem("userId"));
  const [nickname, setNickname] = useState(
    window.localStorage.getItem("nickname")
  );
  const [profile, setProfile] = useState("Eunhyo");

  const typeArr = ["객관식", "O / X"];
  const [solved, setSolved] = useState([]);
  const [failed, setFailed] = useState([]);
  const [words, setWords] = useState([]);

  console.log(words);

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

  useEffect(() => {
    setProfile(window.localStorage.getItem("profileImage"));

    axios
      .get(`http://localhost:8080/user/mypage/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setSolved(res.data.success_solved);
          setFailed(res.data.failed_solved);
          setWords(res.data.user_word);
          // 포인트 받을것!!!
          // 티어 정보도 주세요..
        }
      })
      .catch((e) => window.alert(e.response.data));
  }, []);

  return (
    <MainContainer>
      <ProfileBox>
        <CharBox>
          <Profile>
            <img src={require(`../assets/images/${profile}.svg`)} />
          </Profile>
        </CharBox>
        <NameBox>
          <IdBox>{userId}</IdBox>
          <ProdataBox>
            <span>{nickname}</span>
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
                    <span>{p.problem.subcategory.category.categoryName}</span>
                    <span id="blue">{p.problem.title}</span>
                    <span>{typeArr[`${p.problem.problem_type}`]}</span>
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
            {failed.map((p, idx) => {
              return (
                <div key={idx}>
                  <Problem>
                    <span>{p.problem.subcategory.category.categoryName}</span>
                    <span id="red">{p.problem.title}</span>
                    <span>{typeArr[`${p.problem.problem_type}`]}</span>
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
              return (
                <WordCard
                  key={idx}
                  name={w.word.name}
                  content={w.word.description}
                />
              );
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
    flex-flow: row wrap;
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

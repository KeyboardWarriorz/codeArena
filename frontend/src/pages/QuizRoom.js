import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

import an1 from "../assets/images/Jieun.svg";
import an2 from "../assets/images/Seongwhan.svg";
import an3 from "../assets/images/Eunhyo.svg";
import an4 from "../assets/images/Junseo.svg";
import an5 from "../assets/images/Sunyeong.svg";
import { useParams } from "react-router-dom";
import api from "../interceptor";
import axios from "axios";

const RoomTitle = styled.div`
  display: flex;
  direction: row;
  margin: 2rem 2rem 3rem 2rem;
  justify-content: space-between;
`;

const RoomData = styled.div`
  width: 30%;
  display: flex;
  direction: row;
  justify-content: space-between;
  width: 300px;

  > div {
    font-weight: bold;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
`;

const ContentBox = styled.div`
  display : flex;
  direction row;
  justify-content : space-around;
  padding : 0;
  margin : 0;
`;

const Qbox = styled.div`
  width: 60%;
`;

const UserBox = styled.div`
  width: 30%;
`;

const Remain = styled.div`
  font-size: 20px;
  display: flex;
  align-items: end;

  > div:nth-of-type(1) {
  }

  > div:nth-of-type(2) {
    font-weight: bold;
    color: #6c79f0;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 4px 3px 3px #49494930;
  min-height: 90px;                                                                                                                                                                              0
  margin-bottom: 10px;
  padding: 10px;

  > span:nth-of-type(1) {
    font-size: 2.5rem;
    font-weight: bold;
    padding-right: 10px;
  }

  > span:nth-of-type(2) {
    font-size: 13px;
    font-size: 1.2rem;
    padding-top: 0.8rem;
    text-align: start;
    line-height: 2rem;
  }
`;

const MCQ = styled.div``;

const Option = styled.button`
  border: none;
  font-family: "NanumSquareNeo-Variable";
  font-size: 1.05rem;
  color: #4a483f;
  width: 100%;
  cursor: pointer;
  text-align: start;
  padding: 10px 20px 4px 20px;
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 4px 3px 3px #49494930;
  margin: 30px 0;
  min-height: 60px;
  line-height: 1.5rem;

  &:focus {
    background-color: #e9d6ed;
  }
`;

const TFQ = styled.div`
  display: flex;
  align-items: center;
  // justify-content: space-between;
  font-size: 5rem;
  width: 100%;
  padding-top: 150px;
  height: 300px;
  // margin-top: 20vh;
  cursor: pointer;
  // background-color: yellow;

  .O {
    color: #006e61;
    width: 50%;
    height: 100%;
  }

  .X {
    color: red;
    width: 50%;
    height: 100%;
  }

  .none {
    color: #e0e0e0;
    // background-color: pink;
    width: 50%;
    height: 100%;
  }

  #s {
    cursor: default;
    // background-color: blue;
    height: 100%;
  }
`;

const UDBG = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1rem;
`;

const UDB1 = styled.div`
  width: 40%;
  height: 150px;
  border: none;
  border-radius: 10px;
  background-color: #f5f1ca;
  > div img {
    max-height: 110px;
    height: 50%;
  }
`;
const UDB2 = styled.div`
  width: 40%;
  height: 150px;
  border: none;
  border-radius: 10px;
  background-color: #e6ebff;
  > div img {
    max-height: 110px;
    height: 50%;
  }
`;
const UDB3 = styled.div`
  width: 40%;
  height: 150px;
  border: none;
  border-radius: 10px;
  background-color: #aed3b1;
  > div img {
    max-height: 110px;
    height: 50%;
  }
`;
const UDB4 = styled.div`
  width: 40%;
  height: 150px;
  border: none;
  border-radius: 10px;
  background-color: #f4c7c7;
  > div img {
    max-height: 110px;
    height: 50%;
  }
`;
const UserName = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  font-size: 20px;
  > div:nth-of-type(1) {
    margin-right: 10px;
    padding: 0 0.5rem;
    background-color: #006e61;
    border-radius: 8px;
    color: #ffffff;
  }

  > div:nth-of-type(2) {
    font-weight: bold;
  }
`;

const ChatBox = styled.div`
  border: blue 1px solid;
  border-radius: 10px;
`;

const TimerBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Timer = styled.div`
  height: 40px;
  align-items: end;
  display: flex;
  font-size: 20px;
  color: red;
`;

const RankBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;

  > div:nth-of-type(1) {
    margin-left: 10px;
    font-size: 40px;
    color: #006e61;
  }
`;

const ExitBtn = styled.button`
  background-color: #c25450;
  color: #ffffff;
  height: 40px;
  width: 130px;
  font-size: 25px;
  border-radius: 10px;
  border: 0px;
  cursor: pointer;
`;

export default function QuizRoom({ match }) {
  const url = "http://localhost:8080";
  let stompUserClient;
  let selectedRoom;
  let subscription = null;
  let timeoutId = false;
  let description = "";

  // const typeArr = ["객관식", "O / X"];
  const [selected, setSelected] = useState(0);
  const [problemType, setProblemType] = useState(0);
  const problemId = window.location.pathname;
  const [problem, setProblem] = useState([]);
  // const [category, setCategory] = useState("");

  let roomName = useParams();
  // const [title, setTitle] = useState("123");
  const [userId, setUserId] = useState(window.localStorage.getItem("userId"));

  function setAnswer(n) {
    setSelected(n);
  }

  const [data, setData] = useState({
    room_name: roomName.room_id,
    user_id: userId,
  });

  useEffect(() => {
    console.log(roomName);
    axios
      .post(url + "/game/room/join", data)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <RoomTitle>
        <RoomData>
          <div>자바 고수 방</div>
          <div>|</div>
          <div>java</div>
          <div>|</div>
          <div>인원수</div>
        </RoomData>
        <RoomData>
          <Remain>
            <div>남은 문제 </div>
            <div>0개</div>
          </Remain>
          <ExitBtn>나가기</ExitBtn>
        </RoomData>
      </RoomTitle>
      <ContentBox>
        <Qbox>
          <Box>
            <span>Q.</span>
            <span>{problem.question}</span>
          </Box>
          {problemType === 1 ? (
            <MCQ>
              <Option
                onClick={() => {
                  setAnswer(1);
                }}
              >
                1. {problem.answer1}
              </Option>
              <Option
                onClick={() => {
                  setAnswer(2);
                }}
              >
                2. {problem.answer2}
              </Option>
              <Option
                onClick={() => {
                  setAnswer(3);
                }}
              >
                3. {problem.answer3}
              </Option>
              <Option
                onClick={() => {
                  setAnswer(4);
                }}
              >
                4. {problem.answer4}
              </Option>
            </MCQ>
          ) : (
            <TFQ>
              <span
                className={selected === 1 ? "O" : "none"}
                onClick={() => {
                  setAnswer(1);
                }}
              >
                O
              </span>
              <span id="s">/</span>
              <span
                className={selected === 2 ? "X" : "none"}
                onClick={() => {
                  setAnswer(2);
                }}
              >
                X
              </span>
            </TFQ>
          )}
          <TimerBox>
            <Timer>
              <div>시간</div>
              <div>초</div>
            </Timer>
            <RankBox>
              현재 1위
              <div>이름</div>
            </RankBox>
          </TimerBox>
        </Qbox>
        <UserBox>
          <UDBG>
            <UDB1>
              <div>
                <img src={an1} />
              </div>
              <UserName>
                <div>유저 이름</div>
                <div>100</div>
              </UserName>
            </UDB1>
            <UDB2>
              <div>
                <img src={an2} />
              </div>
              <UserName>
                <div>유저 이름</div>
                <div>100</div>
              </UserName>
            </UDB2>
          </UDBG>
          <UDBG>
            <UDB3>
              <div>
                <img src={an3} />
              </div>
              <UserName>
                <div>유저 이름</div>
                <div>100</div>
              </UserName>
            </UDB3>
            <UDB4>
              <div>
                <img src={an4} />
              </div>
              <UserName>
                <div>유저 이름</div>
                <div>100</div>
              </UserName>
            </UDB4>
          </UDBG>
          <ChatBox>
            <div>채팅창</div>
            <div>채팅 내용 박스</div>
            <div>입력</div>
          </ChatBox>
        </UserBox>
      </ContentBox>
    </div>
  );
}

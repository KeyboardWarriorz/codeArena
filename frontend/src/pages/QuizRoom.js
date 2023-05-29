import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { ClockLoader } from "react-spinners";

import an1 from "../assets/images/Jieun.svg";
import an2 from "../assets/images/Seongwhan.svg";
import an3 from "../assets/images/Eunhyo.svg";
import an4 from "../assets/images/Junseo.svg";
import an5 from "../assets/images/Sunyeong.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../interceptor";
import axios from "axios";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import swal from "sweetalert";
import { setStompUserClient, getStompUserClient } from "../recoil/stompClient";
import { GetNickname, GetUserId } from "../recoil/user";

export default function QuizRoom({ match }) {
  const navigate = useNavigate();
  const url = "http://localhost:8080";
  const baseURL = process.env.REACT_APP_API_URL;

  // 남은 문제수
  const [questionCount, setquestionCount] = useState(0);

  // 현재 게임중인지 (true-게임중)
  const [roomState, setRoomState] = useState(false);

  // 서버 데이터 받아오기
  const stompUserClient = useRef();
  let subscription = useRef();
  const timeoutId = useRef();
  let description = "";

  let roomName = useParams();
  const [userId, setUserId] = useState(GetUserId());
  const [profileImage, setProfileImage] = useState(window.localStorage.getItem("profileImage"));
  const [point, setPoint] = useState(window.localStorage.getItem("point"));
  const [tier, setTier] = useState(window.localStorage.getItem("tier"));
  const [nickname, setNickname] = useState(GetNickname());

  // 인원에 변경이 생기면 서버에 인원 정보 전송
  const [data, setData] = useState({
    room_name: roomName.room_id,
    user_id: userId,
    nickname: nickname,
    profile_image: profileImage,
    tier: tier,
    point: point,
  });

  const categories = ["ALL", "JAVA", "JSP&Servlet", "Spring", "DataBase", "JavaScript", "HTML/CSS"];

  // start버튼 누르면 실행되는 함수 (게임시작)
  function startGame() {
    axios
      .post(baseURL + "/game/start", { room_name: roomName.room_id })
      .then(function (response) {
        // 성공적으로 응답을 받았을 때 실행될 콜백 함수
        // console.log(response);
        setquestionCount(roomdata.gameScenarioDto.problem_cnt);
      })
      .catch(function (error) {
        // 요청이 실패했을 때 실행될 콜백 함수
        // console.error(error);
        alert("서버 요청에 실패하였습니다.");
      });
  }

  // const [isCorrect, SetIsCorrect] = useState("0");

  const [Chatting, setChatting] = useState([]);
  const [question, setQuestion] = useState();
  const [questionType, setQuestionType] = useState(0);

  const [userList, setUserList] = useState([]);
  const [roomdata, setRoomdata] = useState();
  const [users, setUsers] = useState([]);
  const [changed, setChanged] = useState(false);
  const [master, setMaster] = useState();
  useEffect(() => {
    setUserList(users);
  }, [users]);

  const [resultData, setResultData] = useState({});

  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------

  // 현재 사용자가 선택한 답
  const [selected, setSelected] = useState(0);
  const isCorrect = useRef("0"); // 현재 선택된 값이 맞았는지

  function setAnswer(n) {
    console.log("setAnswer", n);
    console.log(n === question.answer_index);
    if (question != null) {
      if (n === question.answer_index) {
        isCorrect.current = "1";
      } else {
        isCorrect.current = "0";
      }
    }
    setSelected(n);
  }

  // useEffect 시작
  useEffect(() => {
    axios
      .post(baseURL + "/game/room/join", data)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setUsers(res.data.users);
          setMaster(res.data.users[0].userId);
          setRoomdata(res.data);
        }
      })
      .catch((e) => console.log(e));

    console.log("connecting to server...");
    stompUserClient.current = getStompUserClient();
    // setStompUserClient(stompClient);
    console.log(stompUserClient.current);
    sendBroadcast(" logined");
    subscription.current = stompUserClient.current.subscribe(
      "/topic/messages/" + roomName.room_id,
      function (response) {
        let data = JSON.parse(response.body);
        if (data.master) {
          setUsers(data.users);
          setMaster(data.users[0].userId);
          console.log(data.users);
        }
        if (data.type == "message") {
          // 리스트 상태 업데이트
          setChatting((Chatting) => [...Chatting, data]);

          // render(data);
        } else if (data.type == "question") {
          setRoomState(true);
          setQuestion(() => data);

          if (data.answer[3] === null) {
            setQuestionType(1);
          } else {
            setQuestionType(0);
          }

          timeoutId.current = setTimeout(() => {
            sendAnswer(isCorrect.current);
            console.log("send", isCorrect.current);
          }, 10000);
        } else if (data.type == "end") {
          swal({title :"게임이 종료되었습니다." , text : "고생하셨습니다"});
          setTimeout(() => {            
            setRoomState(false);
            setResultData([]);
          }, 10000);
        } else if (data.type == "result") {
          setResultData(data);
          console.log("result: ", data);
        }
      }
    );
    setStompUserClient(stompUserClient.current);
    sendBroadcast("message");
  }, []); // useEffect 끝

  console.log("cur", isCorrect.current);

  // 답 확인하는 함수
  function sendAnswer(cor) {
    if (cor === "1") {
      swal({ icon: "success", title: "정답입니당", text: "정답이에영", timer: 3000 });
      // console.log("cor" + cor);
      // $("#answerList").html("정답입니다\n\n"+description);
    } else {
      swal({ icon: "error", title: "오답입니당", text: "다시 생각해보세요", timer: 3000 });
      // $("#answerList").html("오답입니다\n\n"+description);
    }
    console.log("isCorrect  " + cor);
    clearTimeout(timeoutId.current);

    setTimeout(function () {
      axios
        .post(baseURL + "/game/answer", {
          room_name: roomName.room_id,
          user_name: GetNickname(),
          isCorrect: isCorrect.current,
        })
        .then(function (response) {
          // 성공적으로 응답을 받았을 때 실행될 콜백 함수
          console.log(response);
          isCorrect.current = "0";
          // setSelected(0);
        })
        .catch(function (error) {
          // 요청이 실패했을 때 실행될 콜백 함수
          console.error(error);
          alert("서버 요청에 실패하였습니다.");
        });
    }, 3000);
  }

  // 1. 사용자가 선택한 답과 answerIndex 비교
  // useEffect(() => {
  //   if (question != null) {
  //     if (selected == question.answer_index) {
  //       isCorrect.current = "1";
  //     } else {
  //       isCorrect.current = "0";
  //     }
  //   }
  // }, [selected]);

  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------

  const location = useLocation();
  useEffect(() => {
    console.log(location);
    const handleBeforeUnload = () => {};

    const handleUnload = () => {
      console.log("페이지 새로고침 이벤트 발생");
      leaveRoom();
    };

    const handlePageLeave = () => {
      console.log("페이지 탈주 이벤트 발생");
      leaveRoom();
    };

    // 페이지 이탈 및 새로고침 이벤트에 대한 리스너 등록
    window.addEventListener("beforeunload", handlePageLeave);
    window.addEventListener("unload", handleUnload);

    // 이동 시 페이지 이탈 이벤트 리스너 제거
    return () => {};
  }, [location]);

  const [answerData, setAnswerData] = useState({
    room_name: roomName.room_id,
    user_name: userId,
    isCorrect: 0,
  });

  useEffect(() => {
    setAnswerData({
      room_name: roomName.room_id,
      user_name: userId,
      isCorrect: isCorrect.current,
    });
  }, [isCorrect]);

  function sendBroadcast(message) {
    let username = userId;
    stompUserClient.current.send(
      "/app/room",
      {},
      JSON.stringify({
        fromLogin: username,
        message: message,
        type: "broadcast",
      })
    );
  }

  const [Msg, setMsg] = useState({
    fromLogin: nickname,
    message: "",
    type: "message",
  });
  const [content, setContent] = useState("");
  function MsgChange(e) {
    setContent(e.target.value);
  }

  useEffect(() => {
    setMsg({
      fromLogin: nickname,
      message: content,
      type: "message",
    });
  }, [content]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMsg();
    }
  };
  console.log("현재 채팅 상황", Chatting);
  console.log("resultData", userList);
  console.log("resultData", master);
  function sendMsg() {
    // console.log(stompUserClient);
    stompUserClient.current.send("/app/chat/" + roomName.room_id, {}, JSON.stringify(Msg));
    setContent("");
  }
  function leaveRoom() {
    sendBroadcast(" leaved the room");
    subscription.current.unsubscribe();
    axios
      .post(baseURL + "/game/room/leave", data)
      .then(function (data) {
        setChanged(!changed);
        console.log("leave data", data);
        navigate("/multiquiz/");
        // setUsers(roomdata.users);
      })
      .catch(function (jqXHR) {
        console.log(jqXHR);
      });
  }

  // 시간초
  const [count, setCount] = useState(10);

  // 문제가 들어오면 시간초 + 문제수
  useEffect(() => {
    setCount(10);
    setquestionCount((prevCount) => prevCount - 1);
  }, [question]);
  console.log("test", questionCount);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [count, question]);

  return (
    <div>
      <RoomTitle>
        <RoomData>
          {roomdata && (
            <>
              <div>{roomdata.roomName}</div>
              <div>|</div>
              <div>{categories[roomdata.category_id]}</div>
              <div>|</div>
              <div>{users.length}명</div>
            </>
          )}
        </RoomData>
        <RoomData>
          {/* {comments.length > 0 ? (
          <div>
            {comments.map((c, idx) => {
              return ( */}
          <Remain>
            {questionCount < 0 ? (
              ""
            ) : (
              <>
                <div>남은 문제 </div>
                <div>{questionCount}개</div>
              </>
            )}
          </Remain>
          {!roomState && <ExitBtn onClick={leaveRoom}>나가기</ExitBtn>}
        </RoomData>
      </RoomTitle>
      <ContentBox>
        {!roomState ? (
          <StartBtn onClick={startGame}>
            GAME
            <br /> START
          </StartBtn>
        ) : (
          <></>
        )}
        {/* 문제 남았을 때 대기 */}
        {roomState && count === 0 && questionCount != 0 && (
          <CenterClock>
            <ClockLoader color="#F8A70C" />
          </CenterClock>
        )}
        {/* 문제 다 풀고 */}

        {roomState && count === 0 && questionCount == 0 && (
          <ResultBox>
            1등
            <div>
            {Object.keys(resultData).length
              ? resultData.winner.map((w) => {
                  return <>&nbsp;"{w}"&nbsp;</>;
                })
              : ""}
            </div>
          </ResultBox>
        )}
        {/* 문제를 푸는중 */}
        {roomState && count != 0 && (
          <Qbox>
            <Box>
              <span>Q.</span>
              <span>{question.question}</span>
            </Box>
            {questionType === 0 ? (
              <MCQ>
                <Option
                  onClick={() => {
                    setAnswer(1);
                  }}
                >
                  1. {question.answer[0]}
                </Option>
                <Option
                  onClick={() => {
                    setAnswer(2);
                  }}
                >
                  2. {question.answer[1]}
                </Option>
                <Option
                  onClick={() => {
                    setAnswer(3);
                  }}
                >
                  3. {question.answer[2]}
                </Option>
                <Option
                  onClick={() => {
                    setAnswer(4);
                  }}
                >
                  4. {question.answer[3]}
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
              <Timer>{count === 0 ? "종료" : count + " 초"}</Timer>
              <RankBox>
                현재 1위
                {Object.keys(resultData).length
                  ? resultData.winner.map((w) => {
                      return (
                        <span style={{ color: "#006e61", fontSize: "2rem", fontWeight: "bold" }}>
                          &nbsp;{w}&nbsp;
                        </span>
                      );
                    })
                  : ""}
              </RankBox>
            </TimerBox>
          </Qbox>
        )}
        <UserBox>
          <UDBG>
            {userList.length > 0 && (
              <UDB1>
                <div>
                  <img
                    alt="profile1"
                    src={require(`../assets/images/${userList[0].profile_image}.svg`)}
                  />
                </div>
                <UserName>
                  <div>{userList[0].nickname}</div>
                  {resultData.userScore ? <div>{resultData.userScore[0]}</div> : <div>0</div>}
                </UserName>
              </UDB1>
            )}
            {userList.length > 1 && (
              <UDB2>
                <div>
                  <img
                    alt="profile2"
                    src={require(`../assets/images/${userList[1].profile_image}.svg`)}
                  />
                </div>
                <UserName>
                  <div>{userList[1].nickname}</div>
                  {resultData.userScore ? <div>{resultData.userScore[1]}</div> : <div>0</div>}
                </UserName>
              </UDB2>
            )}
          </UDBG>
          <UDBG>
            {userList.length > 2 && (
              <UDB3>
                <div>
                  <img
                    alt="profile3"
                    src={require(`../assets/images/${userList[2].profile_image}.svg`)}
                  />
                </div>
                <UserName>
                  <div>{userList[2].nickname}</div>
                  {resultData.userScore ? <div>{resultData.userScore[2]}</div> : <div>0</div>}
                </UserName>
              </UDB3>
            )}
            {userList.length > 3 && (
              <UDB4>
                <div>
                  <img
                    alt="profile4"
                    src={require(`../assets/images/${userList[3].profile_image}.svg`)}
                  />
                </div>
                <UserName>
                  <div>{userList[3].nickname}</div>
                  {resultData.userScore ? <div>{resultData.userScore[4]}</div> : <div>0</div>}
                </UserName>
              </UDB4>
            )}
          </UDBG>
          <ChatBox>
            <h3 id="chattitle">💬&nbsp;chat</h3>
            <div>
              <div>
                {Chatting.map((chat, idx) => {
                  return (
                    <>
                      <div id="chatline" key={idx}>
                        <span id="id">{chat.fromLogin}</span>
                        <span>&nbsp;|&nbsp;&nbsp;</span>
                        <span>{chat.message}</span>

                        {/* {chat.fromLogin} */}
                      </div>
                      <div id="chatb">
                        <div id="hr" />
                      </div>
                    </>
                  );
                })}
              </div>
              <div>
                <input
                  placeholder="메세지를 입력하세요"
                  value={content}
                  onChange={MsgChange}
                  onKeyPress={handleKeyPress}
                />
                <button onClick={sendMsg} disabled={!content}>
                  전송
                </button>
              </div>
            </div>
          </ChatBox>
        </UserBox>
      </ContentBox>
    </div>
  );
}

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
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1rem;
  // background-color: red;
`;

const UDB1 = styled.div`
  width: 40%;
  height: 150px;
  border: none;
  border-radius: 10px;
  background-color: #fff7aa;
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
  background-color: #f9f2fb;
  font-size: 0.8rem;
  border-radius: 10px;
  box-shadow: 3px 2px 5px #00000025;
  width: 86%;
  > div:nth-of-type(1) {
    > div:nth-of-type(1) {
      overflow-y: scroll;
      height: 150px;
      &::-webkit-scrollbar {
        width: 10px;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 20px;
        background: #816843;
      }
    }
  }
  #hr {
    width: 90%;
    border-top: 1px solid #d7d7d7;
    height: 8px;
    margin: 5px 0;
  }

  #chattitle {
    color: #9b3ca4;
    font-weight: bold;
    text-align: start;
    padding: 10px;
    // background-color: blue;
    margin-top: 0;
  }

  #chatb {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #chatline {
    display: flex;
    // flex-direction: column;
    align-items: center;
    padding: 3px 0;

    #id {
      width: 100px;
      text-align: start;
      margin-left: 10px;
      display: inline-block;
    }

    > span:nth-of-type(3) {
      text-align: start;
    }
  }

  input {
    width: 80%;
    background-color: #ffffff00;
    border: none;
    height: 20px;
    margin-bottom: 10px;

    &:focus {
      outline: none;
    }
  }

  button {
    color: white;
    background-color: #6e6053;
    font-family: "NanumSquareNeo-Variable";
    border-radius: 5px;
  }
`;

const TimerBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Timer = styled.div`
  height: 40px;
  align-items: end;
  display: flex;
  font-size: 2rem;
  color: #c25450;
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
  font-family: "NanumSquareNeo-Variable";
  background-color: #c25450;
  color: #ffffff;
  height: 40px;
  width: 130px;
  font-size: 25px;
  border-radius: 10px;
  border: 0px;
  cursor: pointer;
  box-shadow: 3px 2px 5px gray;
`;
const ResultBox = styled.div`
margin-top : 4rem;
font-size : 20px;
color: blue;
text-shadow: 2px 2px 2px gray;
> div{
  margin-top : 1rem;
    font-size: 40px;

  }
`

const CenterClock = styled.div`
  margin-top : 4rem;
width : 100px;
height : 100px;
`

const StartBtn = styled.button`
  background-color: transparent;
  border: 0px;
  cursor: pointer;
  font-size: 40px;
  color: blue;
  font-family: "Press Start 2P";
  text-shadow: 2px 2px 2px gray;
`;

import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

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

export default function QuizRoom({ match }) {
  const navigate = useNavigate();
  const url = "http://localhost:8080";

  // 현재 게임중인지 (true-게임중)
  const [roomState, setRoomState] = useState(false);

  // 서버 데이터 받아오기
  const stompUserClient = useRef();
  let subscription = useRef();
  const timeoutId = useRef();
  let description = "";

  let roomName = useParams();
  const [userId, setUserId] = useState(window.localStorage.getItem("userId"));
  const [profileImage, setProfileImage] = useState(
    window.localStorage.getItem("profileImage")
  );
  const [point, setPoint] = useState(window.localStorage.getItem("point"));
  const [tier, setTier] = useState(window.localStorage.getItem("tier"));
  const [nickname, setNickname] = useState(
    window.localStorage.getItem("nickname")
  );

  // 인원에 변경이 생기면 서버에 인원 정보 전송
  const [data, setData] = useState({
    room_name: roomName.room_id,
    user_id: userId,
    nickname: nickname,
    profile_image: profileImage,
    tier: tier,
    point: point,
  });

  // start버튼 누르면 실행되는 함수 (게임시작)
  function startGame() {
    axios
      .post(url + "/game/start", { room_name: roomName.room_id })
      .then(function (response) {
        // 성공적으로 응답을 받았을 때 실행될 콜백 함수
        // console.log(response);
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
  if (question != null) {
    if (question.answer[2] == null) {
      setQuestionType(1);
    }
  }

  const [users, setUsers] = useState([]);
  const [userList, setUserList] = useState([]);
  const [roomdata, setRoomdata] = useState();
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
      .post(url + "/game/room/join", data)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setUsers(res.data.users);
          setRoomdata(res.data);
        }
      })
      .catch((e) => console.log(e));

    console.log("connecting to server...");

    let socket = new SockJS(url + "/room");
    stompUserClient.current = Stomp.over(socket);
    // setStompUserClient(stompClient);
    console.log(stompUserClient.current);

    stompUserClient.current.connect({}, function (frame) {
      console.log("connected to: " + frame);
      sendBroadcast(" logined");

      subscription.current = stompUserClient.current.subscribe(
        "/topic/messages/" + roomName.room_id,
        function (response) {
          let data = JSON.parse(response.body);
          if (data.master) {
            console.log("someone joined");
            console.log(data);
            setUsers(data.users);
            console.log(data.users);
          }
          if (data.type == "message") {
            // 리스트 상태 업데이트
            setChatting((Chatting) => [...Chatting, data]);

            // render(data);
          } else if (data.type == "question") {
            setRoomState(true);
            setQuestion(() => data);
            timeoutId.current = setTimeout(() => {
              sendAnswer(isCorrect.current);
              console.log("send", isCorrect.current);
            }, 5000);
            console.log("왜 자꾸 0이 뜨냐고 이 자식아" + isCorrect.current);
          } else if (data.type == "end") {
            swal("종료");
            setRoomState(false);
          } else if (data.type == "result") {
            setResultData(data);
            console.log("result: ", data);
          }
        }
      );
      sendBroadcast("message");
    });
  }, []); // useEffect 끝

  console.log("cur", isCorrect.current);

  function sendAnswer(cor) {
    if (cor === "1") {
      swal("정답.");
      // console.log("cor" + cor);
      // $("#answerList").html("정답입니다\n\n"+description);
    } else {
      swal("오답.", "error");
      // $("#answerList").html("오답입니다\n\n"+description);
    }
    console.log("isCorrect  " + cor);
    clearTimeout(timeoutId.current);

    setTimeout(function () {
      axios
        .post(url + "/game/answer", {
          room_name: roomName.room_id,
          user_name: userId,
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
    let username = window.localStorage.getItem("userId");
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
    fromLogin: window.localStorage.getItem("nickname"),
    message: "",
    type: "message",
  });
  const [content, setContent] = useState("");
  function MsgChange(e) {
    setContent(e.target.value);
  }

  useEffect(() => {
    setMsg({
      fromLogin: window.localStorage.getItem("nickname"),
      message: content,
      type: "message",
    });
  }, [content]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMsg();
    }
  };
  console.log("resultData", resultData);

  function sendMsg() {
    // console.log(stompUserClient);
    stompUserClient.current.send(
      "/app/chat/" + roomName.room_id,
      {},
      JSON.stringify(Msg)
    );
    setContent("");
  }
  function leaveRoom() {
    console.log(data);
    sendBroadcast(" leaved the room");
    subscription.current.unsubscribe();
    axios
      .post(url + "/game/room/leave", data)
      .then(function (data) {
        console.log("ASdasdsad");
        console.log(data);
        navigate("/multiquiz/");
      })
      .catch(function (jqXHR) {
        console.log(jqXHR);
      });
  }

  return (
    <div>
      <RoomTitle>
        <RoomData>
          {roomdata && (
            <>
              <div>{roomdata.roomName}</div>
              <div>|</div>
              <div>{roomdata.category_id}</div>
              <div>|</div>
              <div>{users.length}명</div>
            </>
          )}
          {selected} : {isCorrect.current}
        </RoomData>
        <RoomData>
          {/* {comments.length > 0 ? (
          <div>
            {comments.map((c, idx) => {
              return ( */}
          <Remain>
            {users.length > 0 && (
              <div>
                {userList.map((user, idx) => {
                  return <div key={idx}>{user.userId}</div>;
                })}
              </div>
            )}
            <div>남은 문제 </div>
            <div>0개</div>
            <div></div>
          </Remain>
          <ExitBtn onClick={leaveRoom}>나가기</ExitBtn>
        </RoomData>
      </RoomTitle>
      <ContentBox>
        {!roomState && <StartBtn onClick={startGame}>startgame</StartBtn>}
        {roomState && (
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
              <Timer>
                <div>시간</div>
                <div>초</div>
              </Timer>
              <RankBox>
                현재 1위
                {/* {resultData.winner.length > 0 && resultData.winner[0]} */}
              </RankBox>
            </TimerBox>
          </Qbox>
        )}
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
            <div className="App">
              <div>
                <h1>Messages</h1>
                <ul>
                  {Chatting.map((chat, idx) => {
                    return <li key={idx}>{chat.message}</li>;
                  })}
                </ul>
              </div>

              <div>
                <h1>Chat Box</h1>
                <input
                  placeholder="메세지를 입력하세요"
                  value={content}
                  onChange={MsgChange}
                  onKeyPress={handleKeyPress}
                />
                <button onClick={sendMsg} disabled={!content}>
                  Send Message
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

const StartBtn = styled.btn``;

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const Div = styled.div`
  cursor: default;
  text-align: left;
  padding: 30px;

  > h3 {
    margin-top: 0;
  }
`;

const RoomDiv = styled.div`
  display: flex;
  gap: 5rem;
`;

const Problems = styled.div`
  margin: 20px 20px 0 0px;
  padding-bottom: 7px;
  height: 50px;
  border-bottom: 1px #bcbfc180 solid;
  #name {
    color: #6b6b6b;
  }
`;

const ProblemScroll = styled.div`
  margin: 0 0 0 0px;
  height: 500px;
  overflow: auto;
  #name {
    color: #6b6b6b;
  }
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: #816843;
  }
`;

const ProblemHover = styled.div`
  cursor: pointer;
  height: 70px;
  border-bottom: 1px #bcbfc180 solid;
  display: flex;
  align-items: center;
  > div:nth-of-type(1) {
    margin-left: 20px;
    backgrond-color: red;
    width: 10%;
  }

  > div:nth-of-type(2) {
    // text-align: center;
    width: 15%;
  }

  > div:nth-of-type(3) {
    width: 60%;
  }

  > div:nth-of-type(4) {
    width: 15%;
    text-align: center;
  }

  &:hover {
    background-color: #d9d9d950;
    color: black;
    #hr {
      background-color: #d9d9d930;
      color: black;
      border-top: 1px solid #bcbfc180;
      height: 8px;
      margin-top: 7px;
    }
  }
`;

const Problem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px;
  height: 50px;
  margin: 5px 0;
  margin-right: 20px;

  > span:nth-of-type(1) {
    margin-left: 20px;
    width: 10%;
  }

  > span:nth-of-type(2) {
    // text-align: center;
    width: 15%;
  }

  > span:nth-of-type(3) {
    width: 60%;
  }

  > span:nth-of-type(4) {
    width: 15%;
    text-align: center;
  }
`;
const Select = styled.div`
  background-color: #f8f8f8;
  border-radius: 15px;
  box-shadow: 2px 2px 2px 2px #dddddd;
  padding: 20px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  margin: 30px 0px 30px 10px;

  .line {
    padding-left: 10px;
    width: 150px;
    height: 45px;
    margin-bottom: 20px;
    display: flex;
    justify-content: start;
    align-items: center;
    border-radius: 10px;
    &:hover {
      font-weight: bold;
    }
    >span: nth-of-type(1) {
      font-size: 17px;
      cursor: pointer;
    }
  }

  #selected {
    background-color: #fab809;
    width: 92%;

    border-radius: 10px;

    box-shadow: 2px 2px 2px 2px #f8a70c;

    >span: nth-of-type(1) {
      cursor: pointer;
      color: #006e61;
      font-weight: bold;
    }
  }
`;

const MakeRoom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RoomMakeBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const MiniButton = styled.button`
  width: 180px;
  height: 40px;

  background-color: #fab809;
  border: none;
  border-radius: 6px;
  font-size: 17px;
  font-weight: bold;
  font-family: "NanumSquareNeo-Variable";
  box-shadow: 2px 2px 2px 2px #f8a70c;
  color: #006e61;
  cursor: pointer;
  margin: 10px 0 0 10px;

  &: hover {
    background-color: #f8a70c;
  }
`;

const ProblemBox = styled.div`
  overflow: auto;
  width: 80%;
  background-color: #f8f8f8;
  border-radius: 20px;
  box-shadow: 2px 2px 2px 2px #dddddd;
`;

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

const Title = styled.div`
  font-weight: bold;
  font-size: 25px;
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 20px;

  > div:nth-of-type(1) {
    padding-left: 20px;
    width: 100px;
    margin-right: 10px;
    font-size: 20px;
  }

  > select {
    font-family: "NanumSquareNeo-Variable";
    width: 450px;
    height: 45px;
    outline: none;
    border: solid 2px #aeaeae;
    border-radius: 8px;
    padding-left: 10px;
    padding-right: 50px;

    > option {
    }
  }

  > input {
    padding-left: 10px;
    padding-right: 10px;
    font-family: "NanumSquareNeo-Variable";
    width: 450px;
    height: 40px;
    outline: none;
    border: solid 2px #aeaeae;
    border-radius: 8px;
  }
`;

const ModalContent = styled.div`
  font-weight: 400;
  height: 470px;
  width: 700px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;

  > div:nth-of-type(1) {
    margin-top: 10px;
    margin-bottom: 10px;
    // 엑스버튼
    width: 600px;
    height: 50px;
    cursor: pointer;
    font-size: 1.3em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // margin-left: 450px;

    > div:nth-of-type(1) {
      margin-top: 40px;
    }

    > div:nth-of-type(2) {
      color: #aeaeae;
      font-size: 15px;
    }
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

const Hr = styled.div`
  border-top: 1px solid #bcbfc180;
  height: 8px;
  margin-top: 20px;
`;

export default function MultiQuiz() {
  const url = "http://localhost:8080";
  let stompUserClient;
  let selectedRoom;
  let subscription = null;
  let timeoutId = false;
  let description = "";

  const [room, setRoom] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const clickModal = () => {
    setShowModal(!showModal);
    console.log("modal");
  };
  // const [stompUserClient, setStompUserClient] = useState("");
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [Cnt, setCnt] = useState("");
  // const [stompUserClient, setStompUserClient] = useState(
  //   window.localStorage.getItem("stompUserClient")
  // );

  function titleChange(e) {
    setTitle(e.target.value);
  }
  function CateChange(e) {
    setCategoryId(e.target.value);
  }
  function CntChange(e) {
    setCnt(e.target.value);
  }

  const [nickname, setNickname] = useState(
    window.localStorage.getItem("nickname")
  );
  const [userId, setUserId] = useState(window.localStorage.getItem("userId"));
  const [profileImage, setProfileImage] = useState(
    window.localStorage.getItem("profileImage")
  );
  const [point, setPoint] = useState(window.localStorage.getItem("point"));
  const [tier, setTier] = useState(window.localStorage.getItem("tier"));

  const [data, setData] = useState({
    room_name: title,
    user_id: userId,
    problem_category_id: categoryId,
    problem_cnt: Cnt,
    nickname: nickname,
    tier: tier,
    profile_image: profileImage,
    point: point,
  });

  const navigate = useNavigate();
  const categories = [
    "ALL",
    "JAVA",
    "JSP&Servlet",
    "Spring",
    "DataBase",
    "JavaScript",
    "HTML/CSS",
  ];
  const totalRecords = 400;

  const typeArr = ["객관식", "O / X"];
  const [page, setPage] = useState(1);

  function fetchAll() {
    axios
      .get(`http://localhost:8080/game/roomList`)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          // console.log(res.data);
          setRoom(res.data);
        }
      })
      .catch((e) => console.log(e));
  }

  function sendBroadcast(message) {
    let username = nickname;
    stompUserClient.send(
      "/app/room",
      {},
      JSON.stringify({
        fromLogin: username,
        message: message,
        type: "broadcast",
      })
    );
  }

  useEffect(() => {
    setData({
      room_name: title,
      user_id: userId,
      problem_category_id: categoryId,
      problem_cnt: Cnt,
      nickname: nickname,
      tier: tier,
      profile_image: profileImage,
      point: point,
    });
  }, [title, categoryId, Cnt]);

  function addRoom() {
    // let roomName = document.getElementById("roomName").value;
    console.log(data);
    axios
      .post(url + "/game/room", data)
      .then(function (data) {
        console.log(data);
        navigate("/multiquiz/" + title);
      })
      .catch(function (jqXHR) {
        console.log(jqXHR);
      });
  }

  useEffect(() => {
    console.log("connecting to server...");
    let socket = new SockJS(url + "/room");
    stompUserClient = Stomp.over(socket);
    window.localStorage.setItem("stompUserClient", stompUserClient);
    stompUserClient.connect({}, function (frame) {
      console.log("connected to: " + frame);
      // sendBroadcast(userName + " logined");
      stompUserClient.subscribe("/topic/room", function (response) {
        let data = JSON.parse(response.body);
        console.log(data.message);
        fetchAll();
      });
    });
    fetchAll();
  }, []);

  const [selected, setSelected] = useState("ALL");

  function setCategory(e) {
    setSelected(e.target.innerText);
  }

  function changePage(e) {
    setPage(e.selected + 1);
  }

  function submit() {
    console.log("submit");
  }

  return (
    <Div>
      <h3> 🎯 게임 방 목록 </h3>
      <RoomDiv>
        <MakeRoom>
          <RoomMakeBox>
            <Select>
              {categories.map((c) => {
                if (selected === c) {
                  return (
                    <div
                      key={c}
                      className="line"
                      id="selected"
                      onClick={setCategory}
                    >
                      <span>{c}</span>
                    </div>
                  );
                } else {
                  return (
                    <div key={c} className="line" onClick={setCategory}>
                      <span>{c}</span>
                    </div>
                  );
                }
              })}
            </Select>
            <MiniButton onClick={clickModal}>방 생성</MiniButton>
          </RoomMakeBox>
        </MakeRoom>
        <ProblemBox>
          <Problems>
            <Problem id="name">
              <span>번호</span>
              <span>상태</span>
              <span>제목</span>
              <span>인원</span>
            </Problem>
            <div id="hr"></div>
          </Problems>
          <ProblemScroll id="style-2">
            {room.map((r, idx) => {
              if (!r.playing) {
                return (
                  <ProblemHover
                    key={idx}
                    onClick={() => {
                      navigate(`/multiquiz/${r.roomName}`);
                    }}
                  >
                    <div>{idx + 1}</div>
                    <div>대기</div>
                    <div>{r.roomName}</div>
                    <div>{r.users.length}</div>
                  </ProblemHover>
                );
              } else {
                return (
                  <ProblemHover key={idx}>
                    <div>{idx + 1}</div>
                    <div>플레이중</div>
                    <div>{r.roomName}</div>
                    <div>{r.users.length}</div>
                  </ProblemHover>
                );
              }
            })}
          </ProblemScroll>
        </ProblemBox>
      </RoomDiv>
      {showModal && (
        <ModalBox>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <div>
              <Title>방 생성하기</Title>
              <div onClick={clickModal}>X</div>
            </div>
            <Hr />
            <div>
              <InputDiv>
                <div>방 제목</div>
                <input
                  onChange={titleChange}
                  placeholder="방 제목을 입력해 주세요."
                ></input>
              </InputDiv>
              <InputDiv>
                <div>카테고리</div>
                <select
                  name="Category"
                  form="CateForm"
                  required
                  defaultValue=""
                  onChange={CateChange}
                >
                  <option value="" disabled hidden>
                    카테고리를 설정해주세요.
                  </option>
                  <option value="1">cate1</option>
                  <option value="2">cate2</option>
                  <option value="3">cate3</option>
                  <option value="4">cate4</option>
                </select>
              </InputDiv>
              <InputDiv>
                <div>문제 수</div>
                <select
                  name="order"
                  form="num"
                  required
                  defaultValue=""
                  onChange={CntChange}
                >
                  <option value="" disabled hidden>
                    문제 수를 설정해주세요.
                  </option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </InputDiv>
            </div>
            <div>
              <button onClick={addRoom}>방 만들기</button>
              <button onClick={clickModal}>취소</button>
            </div>
          </ModalContent>
        </ModalBox>
      )}
    </Div>
  );
}

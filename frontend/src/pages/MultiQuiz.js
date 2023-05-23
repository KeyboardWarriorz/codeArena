import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import RoomMakeModal from "../components/RoomMakeModal";
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

export default function ProblemSolved() {
  const url = "http://localhost:8080";
  let stompUserClient;
  let selectedRoom;
  let subscription = null;
  let timeoutId = false;
  let description = "";

  const [showModal, setShowModal] = useState(false);
  const clickModal = () => {
    setShowModal(!showModal);
    console.log("modal");
  };

  const [nickname, setNickname] = useState(
    window.localStorage.getItem("nickname")
  );
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
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    console.log("connecting to server...");
    let socket = new SockJS(url + "/room");
    stompUserClient = Stomp.over(socket);
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

    // api
    //   .get(`http://localhost:8080/game/roomList`)
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.status === 200) {
    //     }
    //   })
    //   .catch((e) => console.log(e));
  });

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
              <span>상태</span>
              <span>분야</span>
              <span>제목</span>
              <span>문제 유형</span>
            </Problem>
            <div id="hr"></div>
          </Problems>
          <ProblemScroll id="style-2">
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>{" "}
            <ProblemHover>
              <div>qwdwqd</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </ProblemHover>
          </ProblemScroll>
        </ProblemBox>
      </RoomDiv>
      {showModal && <RoomMakeModal clickModal={clickModal} func={submit} />}
    </Div>
  );
}

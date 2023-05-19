import React, { useState } from "react";
import { styled } from "styled-components";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import MiniButton from "../components/buttons/MiniButton";
import RoomMakeModal from "../components/RoomMakeModal";

const Div = styled.div`
  cursor: default;
  text-align: left;
  padding: 30px;

  > h3 {
    margin-top: 0;
  }
`;

const Select = styled.div`
  display: flex;
  padding-top: 10px;
  margin-left: 10px;
  padding-bottom: 10px;
  // background-color: pink;

  .line {
    >span: nth-of-type(1) {
      cursor: pointer;
    }
    > span:nth-of-type(2) {
      margin: 0 15px;
      color: #bcbfc1;
    }
  }

  #selected {
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

const Problems = styled.div`
  margin: 20px 0 0 20px;

  #name {
    color: #6b6b6b;
  }

  #hr {
    border-top: 1px solid #bcbfc180;
    height: 8px;
    margin-top: 7px;
  }
`;

const Problem = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 2px;
  margin: 20px 0;

  #title {
    color: #4a483f;
  }

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
    // color: red;
  }

  > span:nth-of-type(4) {
    width: 15%;
    text-align: center;
  }
`;

const Paginate = styled(ReactPaginate)`
  // background-color: yellow;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin-bottom: 500px;

  li {
    margin: 1.25rem;
    backgrond-color: yellow;
    font-weight: bold;
    border-radius: 5px;
    width: 35px;
    height: 29px;
    padding-top: 8px;
    text-align: center;
    cursor: pointer;
  }

  .currentPage {
    background-color: #fab80950;
    border-radius: 5px;
    width: 35px;
    height: 29px;
    padding-top: 8px;
    text-align: center;
    cursor: pointer;
  }
  .active {
    border: solid 1px #808e9b;
    border-radius: 40px;
    color: red;
  }

  .previous {
    border-right: solid 1px #808e9b;
    font-size: 4px;
    height: 60px;
    left: 0;
    position: absolute;
    width: 150px;
  }
`;

export default function ProblemSolved() {
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

  // 0: 안풂, 1: 맞음, 2: 틀림
  const problems = [
    {
      status: 0,
      category: "Java",
      title: "Java Static",
      type: 0,
      problemId: 3,
    },
    { status: 1, category: "Spring", title: "Java", type: 0, problemId: 1 },
    { status: 2, category: "Java", title: "Static", type: 1, problemId: 2 },
    {
      status: 0,
      category: "Java",
      title: "Java Static",
      type: 1,
      problemId: 4,
    },
    {
      status: 0,
      category: "Java",
      title: "Java Static",
      type: 0,
      problemId: 3,
    },
  ];

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
      <MakeRoom>
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
                  <span>|</span>
                </div>
              );
            } else {
              return (
                <div key={c} className="line" onClick={setCategory}>
                  <span>{c}</span>
                  <span>|</span>
                </div>
              );
            }
          })}
        </Select>
        <MiniButton text="방 생성" func={clickModal} />
      </MakeRoom>
      <Problems>
        <Problem id="name">
          <span>인원</span>
          <span>문제 유형</span>
          <span id="title">제목</span>
          <span>상태</span>
        </Problem>
        <div id="hr"></div>
      </Problems>
      <Problems>
        {problems.map((p, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                navigate(`/problem/${p.problemId}`);
              }}
            >
              <Problem>
                {/* 인원수 체크 */}
                <span>1/4</span>
                {/* 주제 */}
                <span>{p.category}</span>
                {/* 제목 */}
                <span>{p.title}</span>
                {/* 상태 */}
                <span>{typeArr[`${p.type}`]}</span>
              </Problem>
              <div id="hr"></div>
            </div>
          );
        })}
      </Problems>

      <Paginate
        pageCount={Math.ceil(totalRecords / 10)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={0}
        breakLabel={""}
        previousLabel={"<"}
        nextLabel={">"}
        onPageChange={changePage}
        containerClassName={"pagination-ul"}
        activeClassName={"currentPage"}
        previousClassName={"pageLabel-btn"}
        nextClassName={"pageLabel-btn"}
      />
      {showModal && <RoomMakeModal clickModal={clickModal} func={submit} />}
    </Div>
  );
}

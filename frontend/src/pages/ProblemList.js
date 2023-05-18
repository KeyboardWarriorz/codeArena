import React, { useState } from "react";
import { styled } from "styled-components";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

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
  margin: 5px 0;

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

export default function ProblemList() {
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

  return (
    <Div>
      <h3> 📝 분야별 문제 풀이</h3>
      <Select>
        {categories.map((c) => {
          if (selected === c) {
            return (
              <div key={c} className="line" id="selected" onClick={setCategory}>
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
      <Problems>
        <Problem id="name">
          <span>상태</span>
          <span>분야</span>
          <span>제목</span>
          <span>문제 유형</span>
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
                {p.status === 1 ? (
                  <span className="material-icons" style={{ color: "green" }}>
                    check_circle_outline
                  </span>
                ) : (
                  ""
                )}
                {p.status === 2 ? (
                  <span className="material-icons" style={{ color: "red" }}>
                    highlight_off
                  </span>
                ) : (
                  ""
                )}
                {p.status === 0 ? (
                  <span className="material-icons" style={{ color: "white" }}>
                    highlight_off
                  </span>
                ) : (
                  ""
                )}
                <span>{p.category}</span>
                <span>{p.title}</span>
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
    </Div>
  );
}

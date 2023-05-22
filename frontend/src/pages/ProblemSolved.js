import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import api from "../interceptor";

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
    color: #006e61;
  }

  > span:nth-of-type(4) {
    width: 15%;
    text-align: center;
  }
`;

const Paginate = styled(ReactPaginate)`
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
  const userId = window.localStorage.getItem("userId");
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

  const typeArr = ["객관식", "O / X"];
  const [page, setPage] = useState(1);
  const [problems, setProblems] = useState([]);
  const [total, setTotal] = useState(1);
  const [selected, setSelected] = useState("ALL");

  function setCategory(e) {
    setSelected(e.target.innerText);
  }

  function changePage(e) {
    setPage(e.selected + 1);
  }

  useEffect(() => {
    api
      .get(
        `http://localhost:8080/ProblemSet/${userId}/1?size=10&page=${page}&category_id=${categories.indexOf(
          selected
        )}`
      )
      .then((res) => {
        if (res.status === 200) {
          setTotal(res.data.data.totalProblem);
          setProblems(res.data.data.Problem);
        }
      })
      .catch((e) => window.alert(e.response.data));
  }, [page, selected]);

  return (
    <Div>
      <h3> ✅ {nickname} 님의 맞은 문제 </h3>
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
          <span id="title">제목</span>
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
                navigate(`/problem/${p.problem.problemId}`);
              }}
            >
              <Problem>
                <span className="material-icons" style={{ color: "green" }}>
                  check_circle_outline
                </span>

                <span>{p.problem.subcategory.category.categoryName}</span>
                <span>{p.problem.question}</span>
                <span>{typeArr[`${p.problem.problem_type}`]}</span>
              </Problem>
              <div id="hr"></div>
            </div>
          );
        })}
      </Problems>

      <Paginate
        pageCount={Math.ceil(total / 10)}
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

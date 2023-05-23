import React, { useState, useEffect } from "react";
import api from "../interceptor";
import MiniTag from "../components/buttons/MiniTag";
import styled from "styled-components";
import LargeButton from "../components/buttons/LargeButton";
import { useNavigate } from "react-router-dom";

export default function ProblemDesc() {
  const navigate = useNavigate();
  const path = window.location.pathname;
  const parts = path.split("/");
  const problemId = parts[parts.length - 1];

  const typeArr = ["객관식", "O / X"];
  const [selected, setSelected] = useState(0);
  const [problem, setProblem] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    api
      .get(`http://localhost:8080/problem/${problemId}`)
      .then((res) => {
        if (res.status === 200) {
          setProblem(res.data);
          setCategory(res.data.subcategory.category.categoryName);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Div>
      <Tags>
        <MiniTag text={category} />
        <MiniTag text={typeArr[problem.problem_type]} green="true" />
      </Tags>
      <Box>
        <span>Q.</span>
        <span>{problem.question}</span>
      </Box>
      {problem.answerIndex === 1 && <Option>1. {problem.answer1}</Option>}
      {problem.answerIndex === 2 && <Option>2. {problem.answer2}</Option>}
      {problem.answerIndex === 3 && <Option>3. {problem.answer3}</Option>}
      {problem.answerIndex === 4 && <Option>4. {problem.answer4}</Option>}
      <div id="desc">{problem.solution}</div>
      <div
        onClick={() => {
          navigate("/problem");
        }}
      >
        <LargeButton text="다른 문제 풀러 가기" />
      </div>
    </Div>
  );
}

const Div = styled.div`
  cursor: default;
  padding: 30px;
  position: relative;

  #desc {
    text-align: start;
    line-height: 2;
    background-color: #fff6de;
    padding: 10px 20px;
  }
`;

const Tags = styled.div`
  display: flex;
  margin-bottom: 20px;
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
  margin: 10px 0;
  min-height: 60px;
  line-height: 1.5rem;
  font-weight: bold;

  background-color: #c8e4d3;
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
    width: 50%;
    height: 100%;
  }

  #s {
    cursor: default;
    // background-color: blue;
    height: 100%;
  }
`;

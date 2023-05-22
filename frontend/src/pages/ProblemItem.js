import React, { useState, useEffect } from "react";
import api from "../interceptor";
import styled from "styled-components";
import MiniTag from "../components/buttons/MiniTag";
import LargeButton from "../components/buttons/LargeButton";

const Div = styled.div`
  cursor: default;
  padding: 30px;
  position: relative;
  // background-color: red;
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

export default function ProblemItem() {
  /*
     문제 제출하고 201이 오면 
     맞는지 틀린지 정답인덱스와 비교해서 각각의 페이지로 이동
  */

  const typeArr = ["객관식", "O / X"];
  const [selected, setSelected] = useState(0);
  const problemId = window.location.pathname;
  const [problem, setProblem] = useState([]);
  const [category, setCategory] = useState("");

  function setAnswer(n) {
    setSelected(n);
  }

  useEffect(() => {
    api
      .get(`http://localhost:8080${problemId}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
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
      {problem.problem_type === 0 ? (
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
          <div
            className={selected === 1 ? "O" : "none"}
            onClick={() => {
              setAnswer(1);
            }}
          >
            O
          </div>
          <div id="s">/</div>
          <div
            className={selected === 2 ? "X" : "none"}
            onClick={() => {
              setAnswer(2);
            }}
          >
            X
          </div>
        </TFQ>
      )}

      <div>
        <LargeButton text="제출하기" />
      </div>
    </Div>
  );
}

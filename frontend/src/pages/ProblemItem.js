import React, { useState, useEffect } from "react";
import api from "../interceptor";
import styled from "styled-components";
import MiniTag from "../components/buttons/MiniTag";
import LargeButton from "../components/buttons/LargeButton";
import resultState from "../recoil/result.js";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

export default function ProblemItem() {
  const navigate = useNavigate();
  /*
     문제 제출하고 201이 오면 
     맞는지 틀린지 정답인덱스와 비교해서 각각의 페이지로 이동
  */

  const typeArr = ["객관식", "O / X"];
  const [selected, setSelected] = useState(0);
  const problemId = window.location.pathname;
  const [problem, setProblem] = useState([]);
  const [category, setCategory] = useState("");
  const [sub, setSub] = useState("");

  const [result, setResult] = useRecoilState(resultState);

  const [right, setRight] = useState(2);
  const baseURL = process.env.REACT_APP_API_URL;

  function setAnswer(n) {
    setSelected(n);
  }

  useEffect(() => {
    api
      .get(`${baseURL}${problemId}`)
      .then((res) => {
        if (res.status === 200) {
          setProblem(res.data);
          setCategory(res.data.subcategory.category.categoryName);
          setSub(res.data.subcategory.subcategoryName);
        }
      })
      .catch((e) => console.log(""));
  }, []);

  // 1. 사용자가 선택한 답과 answerIndex 비교
  useEffect(() => {
    if (selected === problem.answerIndex) {
      setRight(1);
    } else {
      setRight(2);
    }
  }, [selected]);

  useEffect(() => {
    setResult({ success: right, problem_id: problem.problemId });
  }, [right]);

  // 2. 정답 결과에 따라 result 페이지 다르게 호출
  function onSubmit() {
    setResult({ success: right, problem_id: problem.problemId });
    navigate(`/problem/result/${problem.problemId}`);
  }

  return (
    <Div>
      <Tags>
        <MiniTag text={category} />
        <MiniTag text={sub} brown="true" />
        <MiniTag text={typeArr[problem.problem_type]} green="true" />
      </Tags>
      <Box>
        <span>Q.</span>
        <span>{problem.question}</span>
      </Box>
      {problem.problem_type === 1 ? (
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
      ) : (
        <MCQ>
          <Option
            className={selected === 1 ? "selected" : ""}
            onClick={() => {
              setAnswer(1);
            }}
          >
            1. {problem.answer1}
          </Option>
          <Option
            className={selected === 2 ? "selected" : ""}
            onClick={() => {
              setAnswer(2);
            }}
          >
            2. {problem.answer2}
          </Option>
          <Option
            className={selected === 3 ? "selected" : ""}
            onClick={() => {
              setAnswer(3);
            }}
          >
            3. {problem.answer3}
          </Option>
          <Option
            className={selected === 4 ? "selected" : ""}
            onClick={() => {
              setAnswer(4);
            }}
          >
            4. {problem.answer4}
          </Option>
        </MCQ>
      )}

      <div onClick={onSubmit}>
        <LargeButton text="제출하기" />
      </div>
    </Div>
  );
}

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

const MCQ = styled.div`
  .selected {
    background-color: #e9d6ed;
  }
`;

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

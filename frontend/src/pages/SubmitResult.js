import React, { useState, useEffect } from "react";
import api from "../interceptor";
import styled from "styled-components";
import MiniTag from "../components/buttons/MiniTag";
import LargeButton from "../components/buttons/LargeButton";
import resultState from "../recoil/result.ts";
import { useRecoilState } from "recoil";
import swal from "sweetalert";

export default function SubmitResult() {
  // recoil state 이용하여 결과 받고, axios 요청 전송
  const [result, setResult] = useRecoilState(resultState);
  const typeArr = ["객관식", "O / X"];
  const userId = window.localStorage.getItem("userId");

  const [problem, setProblem] = useState([]);
  const [category, setCategory] = useState("");
  console.log(result);

  function getProblem() {
    api
      .get(`http://localhost:8080/problem/${result.problem_id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setProblem(res.data);
          setCategory(res.data.subcategory.category.categoryName);
        }
      })
      .catch((e) => console.log(e));
  }

  function getResult() {
    api
      .post(`http://localhost:8080/problemAnswer/${userId}`, result)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          if (res.data.result === true) {
            swal("맞았습니다!");
          }
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getProblem();
    getResult();
    console.log(result);
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
        {result.success === 1 ? (
          <p id="correct">정답!</p>
        ) : (
          <p id="incorrect">오답!</p>
        )}
      </Box>
      {problem.problem_type === 1 ? (
        <TFQ>
          <div
          // className={selected === 1 ? "O" : "none"}
          // onClick={() => {
          //   setAnswer(1);
          // }}
          >
            O
          </div>
          <div id="s">/</div>
          <div
          // className={selected === 2 ? "X" : "none"}
          // onClick={() => {
          //   setAnswer(2);
          // }}
          >
            X
          </div>
        </TFQ>
      ) : (
        <MCQ>
          {result.success === 1 ? (
            <>
              {/* 맞은 경우 초록색으로 답 표시 */}
              <Option className={problem.answerIndex === 1 && "right"}>
                1. {problem.answer1}
              </Option>
              <Option className={problem.answerIndex === 2 && "right"}>
                2. {problem.answer2}
              </Option>
              <Option className={problem.answerIndex === 3 && "right"}>
                3. {problem.answer3}
              </Option>
              <Option className={problem.answerIndex === 4 && "right"}>
                4. {problem.answer4}
              </Option>
            </>
          ) : (
            <>
              {/* 틀린 경우 빨간색으로 답 표시 */}
              <Option className={problem.answerIndex === 1 && "wrong"}>
                1. {problem.answer1}
              </Option>
              <Option className={problem.answerIndex === 2 && "wrong"}>
                2. {problem.answer2}
              </Option>
              <Option className={problem.answerIndex === 3 && "wrong"}>
                3. {problem.answer3}
              </Option>
              <Option className={problem.answerIndex === 4 && "wrong"}>
                4. {problem.answer4}
              </Option>
            </>
          )}
        </MCQ>
      )}

      <div>
        <LargeButton text="해설 확인" />
      </div>
    </Div>
  );
}

const Div = styled.div`
  cursor: default;
  padding: 30px;
  position: relative;

  .right {
    background-color: red;
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
  position: relative;

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

  p {
    position: absolute;
    right: 10px;
    bottom: 0;
    font-weight: bold;
    font-size: 30px;
    margin-bottom: 10px;
  }

  #correct {
    color: #006E61;
  }

  #incorrect {
    color: #C25450;
  }
`;

const MCQ = styled.div`
  .right {
    background-color: #c8e4d3;
  }

  .wrong {
    background-color: #f8c3c3;
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

  .right {
    background-color: red;
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

import React, { useState, useEffect } from "react";
import api from "../interceptor";
import styled from "styled-components";
import MiniTag from "../components/buttons/MiniTag";
import LargeButton from "../components/buttons/LargeButton";
import resultState from "../recoil/result.js";
import { useRecoilState } from "recoil";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export default function SubmitResult() {
  const navigate = useNavigate();
  // recoil state 이용하여 결과 받고, axios 요청 전송
  const [result, setResult] = useRecoilState(resultState);
  const typeArr = ["객관식", "O / X"];
  const userId = window.localStorage.getItem("userId");

  const [problem, setProblem] = useState([]);
  const [category, setCategory] = useState("");
  const baseURL = process.env.REACT_APP_API_URL;

  function getProblem() {
    api
      .get(`${baseURL}/problem/${result.problem_id}`)
      .then((res) => {
        if (res.status === 200) {
          setProblem(res.data);
          setCategory(res.data.subcategory.category.categoryName);
        }
      })
      .catch((e) => console.log(""));
  }

  function getResult() {
    api
      .post(`${baseURL}/problemAnswer/${userId}`, result)
      .then((res) => {
        if (res.status === 200) {
          if (result.success == 1 && res.data.data.result === false) {
            swal("정답입니다! 😎", "", "success");
          } else if (result.success == 1 && res.data.data.result === true) {
            // 처음 맞은 문제인 경우
            window.localStorage.setItem("point", res.data.data.point);

            swal(
              `정답입니다! 😎`,
              `점수 획득! 현재 점수:  ${res.data.data.point} (+10)`,
              "success"
            );
          } else if (result.success == 2) {
            swal("오답입니다 😥", "", "error", { buttonColor: "red" });
          }
        }
      })
      .catch((e) => console.log(""));
  }

  useEffect(() => {
    if (result.problem_id !== 0) {
      getResult();
      getProblem();
    } else {
      navigate("/problem");
    }
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
          {problem.answerIndex === 1 ? <p>정답: O</p> : <p>정답: X</p>}
          <div>{problem.description}</div>
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
        {problem.problem_type === 1 ? (
          <div
            onClick={() => {
              navigate("/problem");
            }}
          >
            <LargeButton text="다른 문제 풀러 가기" />
          </div>
        ) : (
          <div
            onClick={() => {
              navigate(`/problem/desc/${problem.problemId}`);
            }}
          >
            <LargeButton text="해설 확인" />
          </div>
        )}
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
`;

const TFQ = styled.div`
  padding: 20px;
  text-align: start;
  font-size: 5rem;
  width: 100%;
  cursor: pointer;

  p {
    margin-top: 30px;
    margin-left: 15px;
    color: #006e61;
    margin-bottom: 0;
    font-size: 2rem;
    font-weight: bold;
  }

  div {
    margin-top: 20px;
    margin-left: 20px;
    // padding-right: 50px;
    font-size: 1.2rem;
    line-height: 2;
    width: 95%;
  }
`;

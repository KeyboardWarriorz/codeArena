import React, { useState } from "react";
import styled from "styled-components";
import MiniTag from "../components/buttons/MiniTag";
import LargeButton from "../components/buttons/LargeButton";

const Div = styled.div`
  cursor: default;
  padding: 30px;
  position: relative;
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
  padding: 10px 20px 0 20px;
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
  justify-content: space-between;
  font-size: 5rem;
  width: 50%;
  height: 50%;
  margin-left: 25%;
  margin-top: 20vh;
  cursor: pointer;

  .O {
    color: green;
  }

  .X {
    color: red;
  }

  #s {
    cursor: default;
  }
`;

export default function ProblemItem() {
  /*
     문제 제출하고 201이 오면 
     맞는지 틀린지 정답인덱스와 비교해서 각각의 페이지로 이동
  */

  const typeArr = ["객관식", "O / X"];
  const [selected, setSelected] = useState(0);

  const problem = [
    {
      category: "JavaScript",
      type: 0,
      question: "다음은 static에 대한 설명이다. 틀린 것은?",
      answer1: "1. static 메서드 안에서는 this 나 super 를 사용할 수 없다.",
      answer2: "2. static 영역이 고정된다.",
      answer3:
        "3. static 메서드 안에 선언되는 변수들은 모두 static 변수가 된다.",
      answer4: "4. static 메서드 안에서는 this 나 super 를 사용할 수 없다.",
    },
  ];

  function setAnswer(n) {
    setSelected(n);
  }

  console.log(selected);
  return (
    <Div>
      <Tags>
        <MiniTag text={problem[0].category} />
        <MiniTag text={typeArr[problem[0].type]} green="true" />
      </Tags>
      <Box>
        <span>Q.</span>
        <span>{problem[0].question}</span>
      </Box>
      <MCQ>
        <Option
          onClick={() => {
            setAnswer(1);
          }}
        >
          {problem[0].answer1}
        </Option>
        <Option
          onClick={() => {
            setAnswer(2);
          }}
        >
          {problem[0].answer2}
        </Option>
        <Option
          onClick={() => {
            setAnswer(3);
          }}
        >
          {problem[0].answer3}
        </Option>
        <Option
          onClick={() => {
            setAnswer(4);
          }}
        >
          {problem[0].answer4}
        </Option>
      </MCQ>
      {/* <TFQ>
        <span
          className={selected === 1 ? "O" : null}
          onClick={() => {
            setAnswer(1);
          }}
        >
          O
        </span>
        <span id="s">/</span>
        <span
          className={selected === 2 ? "X" : null}
          onClick={() => {
            setAnswer(2);
          }}
        >
          X
        </span>
      </TFQ> */}
      <div>
        <LargeButton text="제출하기" />
      </div>
    </Div>
  );
}

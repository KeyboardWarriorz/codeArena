import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  padding: 30px;
  text-align: start;

  h3 {
    margin-top: 0;
  }

  #hr {
    border-top: 2px solid #d7d7d7;
    height: 8px;
    margin-top: 7px;
  }

  > div {
    padding-left: 10px;
  }

  #red {
    color: #c25450;
  }

  input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #d6d5d5;
    padding-left: 8px;
    color: #4a483f;
    font-family: "NanumSquareNeo-Variable";
    &: focus {
      outline: none;
      border: 1.9px solid #83868780;
    }

    &:: placeholder {
      color: #838687;
    }
  }

  textarea {
    position: relative;
    width: calc(100% - 60px);
    height: 28vh;
    border-radius: 6px;
    border: 1px solid #d6d5d5;
    padding-top: 12px;
    padding-left: 10px;
    padding-right: 50px;
    color: #4a483f;
    font-family: "NanumSquareNeo-Variable";
    text-align: top;

    &:focus {
      outline: none;
    }

    &:: placeholder {
      color: #838687;
    }
  }
`;

const Category = styled.div`
  select {
    color: #4a483f;
    font-family: "NanumSquareNeo-Variable";
    width: 30vw;
    height: 40px;
    border-radius: 6px;
    border: 1px solid #d6d5d5;
    padding-left: 5px;

    &:not(:focus):invalid {
      color: #838687;
    }
  }
`;

const Submit = styled.div`
  text-align: right;
  button {
    width: 150px;
    height: 40px;
    color: white;
    border-radius: 6px;
    border: none;
    background-color: #fab809;
    font-size: 17px;
    font-weight: 700;
    font-family: "NanumSquareNeo-Variable";
    margin-top: 1rem;

    box-shadow: 3px 2px 5px #f8a70c;

    cursor: pointer;
  }

  button: nth-child(1) {
    margin-right: 10px;
    background-color: #aeaeae;
    box-shadow: 3px 2px 5px #a2a2a2;
    &: hover {
      background-color: #a2a2a2;
    }
  }

  button: nth-child(2) {
    margin-right: 3px;
    background-color: #fab809;
    box-shadow: 3px 2px 5px #f8a70c;
    &: hover {
      background-color: #f8a70c;
    }
  }
`;
export default function BoardRegist() {
  const navigate = useNavigate();
  function submit() {}

  return (
    <Div>
      <h3>✏️ 게시글 작성</h3>
      <div id="hr" />
      <Category>
        <h4>
          카테고리<span id="red">&nbsp;*</span>
        </h4>
        <select required id="holder">
          <option value="" selected data-default disabled hidden>
            게시판을 선택해 주세요
          </option>
          <option>자유게시판</option>
          <option>질문게시판</option>
          <option>오류 제보</option>
        </select>
      </Category>
      <div>
        <h4>
          제목<span id="red">&nbsp;*</span>
        </h4>
        <input placeholder="제목을 입력해 주세요."></input>
      </div>
      <div>
        <h4>
          내용<span id="red">&nbsp;*</span>
        </h4>
        <textarea placeholder="내용을 입력해 주세요."></textarea>
      </div>
      <Submit>
        <button
          onClick={() => {
            navigate("/board");
          }}
        >
          취소
        </button>
        <button onClick={submit}>등록</button>
      </Submit>
    </Div>
  );
}

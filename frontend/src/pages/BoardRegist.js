import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../interceptor";

export default function BoardRegist() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const userId = window.localStorage.getItem("userId");
  const [boardId, setBoardId] = useState("");

  const [data, setData] = useState({
    title: title,
    content: content,
    user_id: userId,
    board_id: boardId,
  });

  function boardChange(e) {
    setBoardId(e.target.value);
  }

  function titleChange(e) {
    setTitle(e.target.value);
  }

  function contentChange(e) {
    setContent(e.target.value);
  }

  useEffect(() => {
    setData({
      title: title,
      content: content,
      user_id: userId,
      board_id: boardId,
    });
  }, [title, content]);

  console.log(data);

  function submit() {
    api
      .post("http://localhost:8080/board/insert", data)
      .then((res) => {
        if (res.status === 200) {
          navigate("/board");
        }
      })
      .catch((e) => console.log(e));
  }

  return (
    <Div>
      <h3>✏️ 게시글 작성</h3>
      <div id="hr" />
      <Category>
        <h4>
          카테고리<span id="red">&nbsp;*</span>
        </h4>
        <select required id="holder" defaultValue="" onChange={boardChange}>
          <option value="" disabled hidden>
            게시판을 선택해 주세요
          </option>
          <option value="1">자유게시판</option>
          <option value="2">질문게시판</option>
          <option value="3">오류 제보</option>
        </select>
      </Category>
      <div>
        <h4>
          제목<span id="red">&nbsp;*</span>
        </h4>
        <input onChange={titleChange} placeholder="제목을 입력해 주세요." />
      </div>
      <div>
        <h4>
          내용<span id="red">&nbsp;*</span>
        </h4>
        <textarea
          onChange={contentChange}
          placeholder="내용을 입력해 주세요."
        />
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

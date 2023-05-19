import React from "react";
import { useState } from "react";
import styled from "styled-components";
import DeleteModal from "../components/DeleteModal";

import WordCard from "../components/organisms/WordCard";

const Div = styled.div`
  cursor: default;
  text-align: left;
  padding: 30px;

  > h3 {
    margin-top: 0;
  }
`;

const Words = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export default function WordList() {
  // 삭제 모달 관리
  const [showModal, setShowModal] = useState(false);
  const clickModal = () => {
    setShowModal(!showModal);
    console.log("modal");
  };
  const pageUser = window.location.pathname;

  const [nickname, setNickname] = useState(
    window.localStorage.getItem("nickname")
  );
  const [userId, setUserId] = useState(window.localStorage.getItem("userId"));

  // const [words, setWords] = useState([]);

  const words = [
    {
      id: 1,
      name: "chatgpt",
      desc: "ChatGPT는 인공지능 언어 모델로, OpenAI에서 개발된 GPT-3.5 아키텍처를 기반으로 한 대화형 AI입니다. ChatGPT는 다양한 주제에 대한 질문과 답변을 수행하며, 사용자의 입력에 대해 자연스러운 대화를 제공합니다. 최신 정보와 일반적인 지식을 활용하여 유연하고 창의적인 응답을 생성하며, 다양한 사용 사례에 적용될 수 있습니다.",
    },
    {
      id: 1,
      name: "sdfsdf",
      desc: " GPT-3.5 아키텍처를 기반으로 한 대화형 AI입니다. ChatGPT는 다양한 주제에 대한 질문과 답변을 수행하며, 사용자의 입력에 대해 자연스러운 대화를 제공합니다. 최신 정보와 일반적인 지식을 활용하여 유연하고 창의적인 응답을 생성하며, 다양한 사용 사례에 적용될 수 있습니다.",
    },
    {
      id: 1,
      name: "cqwrre",
      desc: "ChatGPT는 인공지능텍처를 기반으로 한 대화형 AI입니다. ChatGPT는 다양한 주제에 대한 질문과 답변을 수행하며, 사용자의 입력에 대해 자연스러운 대화를 제공합니다. 최신 정보와 일반적인 지식을 활용하여 유연하고 창의적인 응답을 생성하며, 다양한 사용 사례에 적용될 수 있습니다.",
    },
  ];

  function submit() {
    console.log("submit");
  }

  return (
    <Div>
      <h3>🗂️ {nickname}님의 단어장 </h3>
      <Words>
        {words.map((w, idx) => {
          if (pageUser.includes(userId)) {
            return (
              <WordCard
                key={idx}
                user="true"
                name={w.name}
                content={w.desc}
                modal={clickModal}
              />
            );
          } else {
            return <WordCard key={idx} name={w.name} content={w.desc} />;
          }
        })}
      </Words>
      {showModal && <DeleteModal clickModal={clickModal} func={submit} />}
    </Div>
  );
}

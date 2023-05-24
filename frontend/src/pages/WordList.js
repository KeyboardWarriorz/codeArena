import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import DeleteModal from "../components/modals/DeleteModal";
import WordCard from "../components/organisms/WordCard";
import api from "../interceptor";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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

  const userId = window.localStorage.getItem("userId");

  const [words, setWords] = useState([]);
  const [deleteId, setDeleteId] = useState(0);
  const [data, setData] = useState({ user_id: userId, word_id: deleteId });
  console.log(data);

  function onDelete() {
    console.log(data);
    api
      .post(`http://localhost:8080/word/delete`, data)
      .then((res) => {
        if (res.status === 201) {
          navigate(`/user/word/${userId}`);
        }
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/word/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          setWords(res.data.user_word);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    setData({ user_id: userId, word_id: deleteId });
  }, [deleteId]);
  console.log(deleteId);
  return (
    <Div>
      <h3>🗂️ {nickname}님의 단어장 </h3>
      <Words>
        {words.map((w, idx) => {
          if (pageUser.includes(userId)) {
            return (
              <div
                key={idx}
                onClick={() => {
                  setDeleteId(w.word.wordId);
                }}
              >
                <WordCard
                  user="true"
                  name={w.word.name}
                  content={w.word.description}
                  modal={clickModal}
                />
              </div>
            );
          } else {
            return <WordCard key={idx} name={w.name} content={w.desc} />;
          }
        })}
      </Words>
      {showModal && <DeleteModal clickModal={clickModal} func={onDelete} />}
    </Div>
  );
}

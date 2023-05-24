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

  #none {
    position: fixed;
    top: 40%;
    left: calc(50vw - 350px);
    font-size: 1.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    background-color: #006e61;
    font-family: "NanumSquareNeo-Variable";
    border: none;
    color: white;
    width: 150px;
    height: 30px;
    font-size: 1rem;
    border-radius: 5px;
    box-shadow: 4px 3px 3px #006e6130;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
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
          window.location.href = `/user/${userId}/word`;
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
      {words.length > 0 ? (
        <>
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
        </>
      ) : (
        <>
          <div id="none">
            <p>
              아직 저장한 단어가 없어요! 😥 개념을 공부하고 궁금한 단어를
              저장해보세요!
            </p>

            <button
              onClick={() => {
                navigate("/lecture");
              }}
            >
              공부하러 가기 &nbsp;<span class="material-icons">ads_click</span>
            </button>
          </div>
        </>
      )}

      {showModal && <DeleteModal clickModal={clickModal} func={onDelete} />}
    </Div>
  );
}

import React from "react";
import { useState } from "react";
import DeleteModal from "../components/DeleteModal";

export default function WordList() {
  // 삭제 모달 관리
  const [showModal, setShowModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);

  function submit() {
    console.log("submit");
  }
  return (
    <>
      <div onClick={clickModal}>유저 단어장</div>
      {showModal && <DeleteModal clickModal={clickModal} func={submit} />}
    </>
  );
}

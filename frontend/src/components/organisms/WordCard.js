import React from "react";
import { styled } from "styled-components";
import { useState } from "react";

export default function WordCard(props) {
  // 삭제 모달 관리
  const [showModal, setShowModal] = useState(false);
  const clickModal = () => setShowModal(!showModal);

  return (
    <Div>
      <Title>
        <p>{props.name}</p>
        {props.user ? (
          <span onClick={props.modal} className="material-icons">
            delete
          </span>
        ) : null}
      </Title>

      <div id="hr"></div>
      <Content>{props.content}</Content>
    </Div>
  );
}

const Div = styled.div`
  border-radius: 10px;
  background-color: #f9f5d7;
  box-shadow: 2px 2px 5px #6d6d6d60;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: start;
  position: relative;
  cursor: default;

  #hr {
    width: 100%;
    border-top: 1px solid #d7d7d7;
    height: 8px;
    margin: 5px 0;
  }
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: space-between;

  p {
    margin-top: 0;
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  span {
    cursor: pointer;
  }
`;

const Content = styled.div`
  font-size: 13px;
  line-height: 1.25rem;
`;

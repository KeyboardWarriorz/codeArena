import React from "react";
import { styled } from "styled-components";
import Image from "../assets/images/404.png";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Div>
      <div id="title">404</div>
      <img src={Image} />
      <div id="below">
        <div>Page Not Found</div>
        <div>존재하지 않는 페이지입니다 😶‍🌫️</div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          홈으로 돌아가기
        </button>
      </div>
    </Div>
  );
}

const Div = styled.div`
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;
  padding-top: 15vh;
  background-color: #e7b52e;
  color: white;

  img {
    height: 30vh;
    position: absolute;
    top: 30vh;
  }

  #title {
    color: white;
    font-size: 9rem;
    position: relative;
  }

  #below {
    margin-top: 25vh;

    > div:nth-of-type(1) {
      font-size: 2rem;
    }

    > div:nth-of-type(2) {
      font-size: 1.5rem;
    }
  }

  button {
    background-color: white;
    border-radius: 5px;
    border: none;
    font-family: "NanumSquareNeo-Variable";
    padding: 10px 20px;
    margin-top: 8vh;
    font-size: 1rem;
    color: #4a483f;
    box-shadow: 3px 2px 5px #aeaeae;
    cursor: pointer;
  }
`;

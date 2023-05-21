import React from "react";
import { styled } from "styled-components";

import Jieun from "../../assets/images/Jieun.svg";
import Seongwhan from "../../assets/images/Seongwhan.svg";
import Eunhyo from "../../assets/images/Eunhyo.svg";
import Junseo from "../../assets/images/Junseo.svg";
import Sunyeong from "../../assets/images/Sunyeong.svg";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  border-radius: 10px;
  width: 270px;
  height: 270px;
  background-color: #f9f5d7;
  margin: 1rem 0.5rem 0 0.5rem;
  box-shadow: 2px 2px 5px #6d6d6d60;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: start;
  position: relative;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Content = styled.div`
  color: #9c9c9c;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 1.5rem;

  .user {
    margin-left: 10px;
    > p:nth-of-type(1) {
      margin-bottom: 5px;
      color: #9b9b9b;
    }
    > p:nth-of-type(2) {
      margin-top: 0;
      color: #006e61;
    }
  }
`;

const Profile = styled.div`
  background-color: white;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #efefef;

  img {
    width: 45px;
    height: 45px;
  }
`;

const User = styled.div`
  width: 210px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  #comment {
    display: flex;
    align-items: center;

    #cnt {
      margin-left: 5px;
    }
  }
`;

export default function ArticleCard(props) {
  const navigate = useNavigate();
  return (
    <Div
      onClick={() => {
        navigate(`/board/detail/${props.articleId}`);
      }}
    >
      <Title>{props.title}</Title>
      <Content>{props.content}</Content>
      <Info>
        <Profile>{/* <img src={require(`../../assets/images/${props.profile}.svg`)} /> */}</Profile>
        <User>
          <div className="user">
            <p>{props.userId}</p>
            <p>{props.nickname}</p>
          </div>
          <div id="comment">
            <span className="material-icons" style={{ color: "grey" }}>
              mode_comment
            </span>
            <span id="cnt">{props.cnt}</span>
          </div>
        </User>
      </Info>
    </Div>
  );
}

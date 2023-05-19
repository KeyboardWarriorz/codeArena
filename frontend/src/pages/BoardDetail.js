import React, { useState } from "react";
import { styled } from "styled-components";
import MiniTag from "../components/buttons/MiniTag";

const Div = styled.div`
  padding: 50px;
  text-align: start;
`;

const Title = styled.h1`
  height: 40px;
`;

const Profile = styled.div`
  background-color: white;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid #efefef;
  margin-left: 10px;

  img {
    width: 40px;
    height: 40px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 4px 3px 3px #49494930;
  min-height: 90px;                                                                                                                                                                              0
  margin-bottom: 10px;
  padding: 10px;
  line-height: 1.6rem;

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

const Info = styled.div`
  display: flex;
  justify-content: space-between;

  .user {
    display: flex;
    align-items: center;
    color: #006e61;
    font-weight: bold;
  }
`;

const Comments = styled.div`
  margin-top: 25px;
`;

const Comment = styled.div`
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 4px 3px 3px #49494930;
  margin-top: 7px;
  display: flex;
  align-items: center;
  position: relative;

  div {
    display: flex;
    justify-content: space-between;

    .material-icons {
      position: absolute;
      right: 10px;
    }
  }

  img {
    width: 35px;
    height: 35px;
    padding: 8px 8px 5px 8px;
  }

  span {
    font-size: 13px;
  }

  #nickname {
    color: #506bb1;
    font-weight: bold;
    width: 10%;
  }
`;

export default function BoardDetail() {
  const [board, setBoard] = useState("자유게시판");
  const [profile, setProfile] = useState(
    window.localStorage.getItem("profileImage")
  );
  const [nickname, setNickname] = useState(
    window.localStorage.getItem("nickname")
  );
  const article = {
    title: "행운의 편지..",
    content:
      "이 편지는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다.  이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.영국에서 HGXWCH이라는 사람은 1930년에 이 편지를 받았습니다. 그는 비서에게 복사해서 보내라고 했습니다. 며칠 뒤에 복권이 당첨되어 20억을 받았습니다. 어떤 이는 이 편지를 받았으나 96시간 이내 자신의 손에서 떠나야 한다는 사실을 잊었습니다. 그는 곧 사직되었습니다. 나중에야 이 사실을 알고 7통의 편지를 보냈는데 다시 좋은 직장을 얻었습니다. 미국의 케네디 대통령은 이 편지를 받았지만 그냥 버렸습니다. 결국 9일 후 그는 암살당했습니다. 기억해 주세요. 이 편지를 보내면 7년의 행운이 있을 것이고 그렇지 않으면 3년의 불행이 있을 것입니다. 그리고 이 편지를 버리거나 낙서를 해서는 절대로 안됩니다. 7통입니다. 이 편지를 받은 사람은 행운이 깃들것입니다. 힘들겠지만 좋은게 좋다고 생각하세요. 7년의 행운을 빌면서...",
  };

  const comments = [
    {
      profile: "Junseo",
      userId: "chosw1",
      nickname: "성환 조",
      content: "ㄹㅇㅋㅋ",
    },
    {
      profile: "Seongwhan",
      userId: "chosw1",
      nickname: "ㄴㅇㄹ",
      content: "ㅋ",
    },
    {
      profile: "Eunhyo",
      userId: "chosw1",
      nickname: "성ㅇ",
      content: "ㅁ",
    },
  ];
  return (
    <Div>
      <div>
        <MiniTag text={board} />
      </div>
      <Info>
        <Title>{article.title}</Title>
        <div className="user">
          <span>{nickname}</span>
          <Profile>
            <img src={require(`../assets/images/${profile}.svg`)} />
          </Profile>
        </div>
      </Info>

      <Content>{article.content}</Content>
      <Comments>
        <div className="commentbox"></div>
        <MiniTag text="댓글" red={true} />
        {comments.map((c, idx) => {
          return (
            <Comment key={idx}>
              <img src={require(`../assets/images/${c.profile}.svg`)} />
              <span id="nickname">{c.nickname}</span>
              <div>
                <span>{c.content}</span>
                <span className="material-icons">delete</span>
              </div>
            </Comment>
          );
        })}
      </Comments>
    </Div>
  );
}

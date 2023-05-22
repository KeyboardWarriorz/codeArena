import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import MiniTag from "../components/buttons/MiniTag";
import DeleteModal from "../components/modals/DeleteModal";
import api from "../interceptor";
import { useNavigate } from "react-router-dom";

export default function BoardDetail() {
  const navigate = useNavigate();
  const [board, setBoard] = useState("자유게시판");
  const [profile, setProfile] = useState(
    window.localStorage.getItem("profileImage")
  );
  const [nickname, setNickname] = useState(
    window.localStorage.getItem("nickname")
  );
  const userId = window.localStorage.getItem("userId");
  const articlePath = window.location.pathname;
  const [commentId, setCommentId] = useState(0);

  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [which, setWhich] = useState("");
  const [content, setContent] = useState("");
  const [articleProfile, setArticleProfile] = useState("Junseo");

  const [commentData, setCommentData] = useState({
    article_id: article.articleId,
    user_id: userId,
    content: content,
  });

  const [showModal, setShowModal] = useState(false);
  function clickModal(which, id) {
    setWhich(which);
    setCommentId(id);
    setShowModal(!showModal);
  }

  // 게시물 및 댓글 삭제 API
  function onDelete(w) {
    if (w === "article") {
      api
        .post(`http://localhost:8080/board/delete/${article.article_id}`)
        .then((res) => {
          if (res.status === 200) {
            navigate("/board");
          }
        });
    } else if (w === "comment") {
      api
        .post(`http://localhost:8080/comment/delete/${commentId}`)
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        })
        .catch((e) => console.log(e));
    }
  }

  // 댓글 등록
  function submitComment() {
    api
      .post("http://localhost:8080/comment", commentData)
      .then((res) => {
        if (res.status === 200) {
          setCommentData({
            article_id: article.article_id,
            user_id: userId,
            content: "",
          });
          setContent("");
        }
      })
      .catch((e) => console.log(e));
  }

  function changeComment(e) {
    setContent(e.target.value);
  }
  console.log(content);
  // console.log(commentData);
  console.log(article);
  // console.log(comments);

  useEffect(() => {
    setCommentData({
      article_id: article.article_id,
      user_id: userId,
      content: content,
    });
  }, [content]);

  useEffect(() => {
    api
      .get(`http://localhost:8080${articlePath}`)
      .then((res) => {
        if (res.status === 200) {
          setArticle(res.data.data);
          setComments(res.data.data.comment);
          setArticleProfile(res.data.data.profile_image);
        }
      })
      .catch((e) => window.alert(e.response.data));
  }, [content]);

  return (
    <Div>
      <div>
        <MiniTag text={board} />
      </div>
      <Info>
        <div>
          <Title>{article.title}</Title>
          {userId === article.user_id ? (
            <span
              className="material-icons"
              onClick={() => {
                clickModal("article", 0);
              }}
            >
              delete_forever
            </span>
          ) : null}
        </div>

        <div className="user">
          <span>{article.nickname}</span>
          <Profile>
            <img src={require(`../assets/images/${articleProfile}.svg`)} />
          </Profile>
        </div>
      </Info>

      <Content>{article.content}</Content>
      <Comments>
        <div className="commentbox"></div>
        <MiniTag text="댓글" red="true" />

        {comments.length > 0 ? (
          <div>
            {comments.map((c, idx) => {
              return (
                <Comment key={idx}>
                  <img
                    src={require(`../assets/images/${c.profile_image}.svg`)}
                  />
                  <span id="nickname">{c.nickName}</span>
                  <div>
                    <span>{c.content}</span>
                    {c.user_id === userId ? (
                      <span
                        className="material-icons"
                        onClick={() => {
                          clickModal("comment", c.commentId);
                        }}
                      >
                        delete_forever
                      </span>
                    ) : null}
                  </div>
                </Comment>
              );
            })}
          </div>
        ) : (
          <div id="noreply">아직 작성된 댓글이 없어요!</div>
        )}
      </Comments>

      <Input
        onChange={changeComment}
        placeholder="내용을 입력해 주세요"
        value={content}
      />

      <Button onClick={submitComment}>등록</Button>

      {showModal && (
        <DeleteModal
          clickModal={clickModal}
          func={() => {
            onDelete(which);
          }}
        />
      )}
    </Div>
  );
}

const Div = styled.div`
  cursor: default;
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

  div {
    display: flex;
    align-items: center;

    .material-icons {
      margin-left: 8px;
      cursor: pointer;
    }
  }

  .user {
    display: flex;
    align-items: center;
    color: #006e61;
    font-weight: bold;
  }
`;

const Comments = styled.div`
  margin-top: 25px;

  #noreply {
    margin-top: 20px;
  }
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
      font-size: 17px;
      cursor: pointer;
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

const Input = styled.input`
  position: relative;
  margin-top: 20px;
  width: calc(100% - 70px);
  height: 50px;
  border-radius: 6px;
  border: 1px solid #d6d5d5;
  // padding-top: 12px;
  padding-left: 15px;
  padding-right: 50px;
  color: #4a483f;
  font-family: "NanumSquareNeo-Variable";
  text-align: top;

  &:focus {
    outline: none;
  }

  &:: placeholder {
    color: #bcbfc1;
  }
`;

const Button = styled.button`
  position: absolute;
  right: 65px;
  width: 60px;
  height: 30px;
  background-color: #c25450;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-family: "NanumSquareNeo-Variable";
  color: white;
  cursor: pointer;
  margin-top: 30px;
  box-shadow: 1px 4px 4px #ad413d;

  &: hover {
    background-color: #ad413d;
  }
`;

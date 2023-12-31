import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import MiniTag from "../components/buttons/MiniTag";
import DeleteModal from "../components/modals/DeleteModal";
import api from "../interceptor";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { GetUserId, GetNickname } from "../recoil/user";

export default function BoardDetail() {
  const navigate = useNavigate();
  const [board, setBoard] = useState("자유게시판");
  const [profile, setProfile] = useState(window.localStorage.getItem("profileImage"));
  const [nickname, setNickname] = useState(GetNickname());
  const userId = GetUserId();
  const articlePath = window.location.pathname;
  const [commentId, setCommentId] = useState(0);

  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [which, setWhich] = useState("");
  const [content, setContent] = useState("");
  const [articleProfile, setArticleProfile] = useState("Junseo");
  const [date, setDate] = useState("");

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

  const baseURL = process.env.REACT_APP_API_URL;

  // 게시물 및 댓글 삭제 API
  function onDelete(w) {
    if (w === "article") {
      api.post(`${baseURL}/board/delete/${article.article_id}`).then((res) => {
        if (res.status === 200) {
          navigate("/board");
        }
      });
    } else if (w === "comment") {
      api
        .post(`${baseURL}/comment/delete/${commentId}`)
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        })
        .catch((e) => swal("", "에러가 발생했어요! 잠시 후에 다시 시도해주세요", "error"));
    }
  }

  // 댓글 등록
  function submitComment() {
    api
      .post(`${baseURL}/comment`, commentData)
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
      .catch((e) => swal("", "에러가 발생했어요! 잠시 후에 다시 시도해주세요", "error"));
  }

  function changeComment(e) {
    setContent(e.target.value);
  }

  useEffect(() => {
    setCommentData({
      article_id: article.article_id,
      user_id: userId,
      content: content,
    });
  }, [content]);

  useEffect(() => {
    api
      .get(`${baseURL}${articlePath}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data);
          setArticle(res.data.data);
          setComments(res.data.data.comment);
          setArticleProfile(res.data.data.profile_image);
          setDate(
            new Date(res.data.data.createdTime).toLocaleString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              formatMatcher: "basic",
            })
          );

          console.log(res.data.data.tier);
          let comments = res.data.data.comment;
          for (let i = 0; i < comments.length; i++) {
            console.log(comments[i].tier);
            //코멘트 티어정보
          }
        }
      })
      .catch((e) => window.alert(e.response.data));
  }, [content]);

  return (
    <Div>
      <div>
        <MiniTag text={article.boardName} />
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
          <span id="date">{date}</span>
        </div>

        <div className="user">
          <span className="tier" id={article.tier}>
            {article.tier}
          </span>
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
                  <img src={require(`../assets/images/${c.profile_image}.svg`)} />
                  <span id="nickname">
                    {c.nickName}
                    <span className="tier" id={c.tier}>
                      {c.tier}
                    </span>
                  </span>
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

      <Input onChange={changeComment} placeholder="내용을 입력해 주세요" value={content} />

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

  #date {
    color: grey;
    font-size: 13px;
    margin-left: 10px;
    padding-top: 10px;
  }

  .tier {
    font-size: 12px;
    margin-right: 5px;
  }

  #BRONZE {
    color: #ad5600;
  }

  #SILVER {
    color: #435f7a;
  }

  #GOLD {
    color: #ec9a00;
  }

  #PLATINUM {
    color: #27e2a4;
  }

  #DIAMOND {
    color: #00b4fc;
  }

  #RUBY {
    color: #ff0062aa;
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

  .tier {
    font-size: 10px;
    margin-left: 5px;
  }

  #BRONZE {
    color: #ad5600;
  }

  #SILVER {
    color: #435f7a;
  }

  #GOLD {
    color: #ec9a00;
  }

  #PLATINUM {
    color: #27e2a4;
  }

  #DIAMOND {
    color: #00b4fc;
  }

  #RUBY {
    color: #ff0062aa;
  }

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
    width: 15%;
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

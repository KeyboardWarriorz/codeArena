import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArticleCard from "../components/organisms/ArticleCard";
import api from "../interceptor";

import ReactPaginate from "react-paginate";

import Jieun from "../assets/images/Jieun.svg";
import Seongwhan from "../assets/images/Seongwhan.svg";
import Eunhyo from "../assets/images/Eunhyo.svg";
import Junseo from "../assets/images/Junseo.svg";
import Sunyeong from "../assets/images/Sunyeong.svg";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 30px;
  width: 15vw;
  height: 500px;

  > h3 {
    margin-top: 0;
  }

  > div {
    margin-top: 10px;
    padding-left: 10px;
  }

  #curr {
    cursor: pointer;
    text-align: start;
    margin-bottom: 12px;
    color: #006e61;
    font-weight: bold;
  }

  #category {
    cursor: pointer;
    text-align: start;
    margin-bottom: 12px;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 80vw;
  height: 500px;
`;

const SearchBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: space-between;

  button {
    background-color: #c25450;
    font-family: "NanumSquareNeo-Variable";
    color: white;
    border: none;
    width: 11vw;
    height: 42px;
    border-radius: 10px;
    font-size: 1.1em;
    font-weight: bold;
    background-color: #fab809;
    cursor: pointer;
    box-shadow: 2px 2px 2px #fab809;
  }

  .material-symbols-outlined {
    position: absolute;
    left: 83vw;
    top: 102px;
  }
`;

const Input = styled.input`
  position: relative;
  width: 64vw;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #d6d5d5;
  padding-left: 15px;
  color: #4a483f;
  font-family: "NanumSquareNeo-Variable";
  &: focus {
    outline: none;
    border: 1.9px solid #83868780;
  }

  &:: placeholder {
    color: #bcbfc1;
  }
`;

const Cards = styled.div`
  display: flex;
  // justify-content: space-between;
  flex-flow: row wrap;
`;

const Paginate = styled(ReactPaginate)`
  // background-color: yellow;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin-bottom: 500px;

  li {
    margin: 1.25rem;
    backgrond-color: yellow;
    font-weight: bold;
    border-radius: 5px;
    width: 35px;
    height: 29px;
    padding-top: 8px;
    text-align: center;
    cursor: pointer;
  }

  .currentPage {
    background-color: #fab80950;
    border-radius: 5px;
    width: 35px;
    height: 29px;
    padding-top: 8px;
    text-align: center;
    cursor: pointer;
  }
  .active {
    border: solid 1px #808e9b;
    border-radius: 40px;
    color: red;
  }

  .previous {
    border-right: solid 1px #808e9b;
    font-size: 4px;
    height: 60px;
    left: 0;
    position: absolute;
    width: 150px;
  }
`;

export default function Board() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(page);
  });
  const boards = ["", "자유게시판", "질문게시판", "오류 제보"];

  const [curId, setCurId] = useState(1);
  const [curr, setCurr] = useState("자유게시판");
  const [total, setTotal] = useState(1);

  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);

  function categoryChange(c) {
    setCurr(c);
  }

  function changePage(e) {
    setPage(e.selected + 1);
  }

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  useEffect(() => {
    api
      .get(
        `http://localhost:8080/board/boardList/${boards.indexOf(
          curr
        )}?page=${page}&size=6`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setArticles(res.data.data.articleList);
          setTotal(res.data.data.totalArticle);
        }
      })
      .catch((e) => console.log(""));
  }, [curr]);

  console.log(articles);
  return (
    <Div>
      <Sidebar>
        <h3>😍 커뮤니티</h3>
        <div>
          {boards.map((b, idx) => {
            if (b === curr) {
              return (
                <div
                  id="curr"
                  key={idx}
                  onClick={() => {
                    categoryChange(b);
                  }}
                >
                  {b}
                </div>
              );
            } else {
              return (
                <div
                  id="category"
                  key={idx}
                  onClick={() => {
                    categoryChange(b);
                  }}
                >
                  {b}
                </div>
              );
            }
          })}
        </div>
      </Sidebar>
      <Contents>
        <SearchBar>
          <Input type="text" placeholder="검색어를 입력해 주세요" />
          <span
            className="material-symbols-outlined"
            style={{ color: "#00000080" }}
          >
            search
          </span>
          <button
            onClick={() => {
              navigate("/board/regist");
            }}
          >
            작성하기
          </button>
        </SearchBar>

        <Cards>
          {articles.map((a, idx) => {
            return (
              <div key={idx}>
                <ArticleCard
                  articleId={a.articleId}
                  title={truncate(a.title, 10)}
                  content={truncate(a.content, 50)}
                  nickname={a.nickname}
                  cnt={a.totalComment}
                  profile={a.profile_image}
                />
              </div>
            );
          })}
        </Cards>
        <Paginate
          pageCount={Math.ceil(total / 10)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={0}
          breakLabel={""}
          previousLabel={"<"}
          nextLabel={">"}
          onPageChange={changePage}
          containerClassName={"pagination-ul"}
          activeClassName={"currentPage"}
          previousClassName={"pageLabel-btn"}
          nextClassName={"pageLabel-btn"}
        />
      </Contents>
    </Div>
  );
}

import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Div = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: solid #fab809;
  justify-content: space-between;

  a {
    text-decoration: none;
    color: #4a483f;
  }
`;

const Title = styled.div`
  display: flex;
  margin-left: 20px;
  font-size: 40px;
  font-family: "Staatliches";
`;

const Code = styled.p`
  color: #fab809;
`;

const Arena = styled.p`
  color: #6e6053;
`;

const Contents = styled.div`
  width: 40%;
  // min-width: 500px;
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div``;

const CurContent = styled.div`
  // font-weight: bold;
  // color: #506bb1;
`;

const Login = styled.div`
  display: flex;
  margin-right: 20px;
`;

const User = styled.div`
  display: flex;
  margin-right: 20px;

  .nickname {
    color: #006e61;
    font-weight: bold;
  }
`;

function Header() {
  const [page, setPage] = useState(useLocation().pathname);

  // useEffect(() => {
  //   setPage = page1;
  // }, [page]);

  const [login, setLogin] = useState("true"); // 로그인시 set
  const [nickname, setNickname] = useState("성환조");

  return (
    <Div>
      <Link to="/">
        <Title>
          <Code>CODE</Code>
          <Arena>Arena</Arena>
        </Title>
      </Link>

      <Contents>
        <Link to="/lecture">
          {page.includes("lecture") ? (
            <CurContent>📚 기초 개념</CurContent>
          ) : (
            <Content>📚 기초 개념</Content>
          )}
        </Link>

        <a Link to="/problemSet">
          {page.includes("problem") || page.includes("result") ? (
            <CurContent>📝 문제 풀이</CurContent>
          ) : (
            <Content>📝 문제 풀이</Content>
          )}
        </a>

        <Link to="/board/1">
          {page.includes("board") || page.includes("article") ? (
            <CurContent>📚 커뮤니티</CurContent>
          ) : (
            <Content>📚 커뮤니티</Content>
          )}
        </Link>

        <Link to="/multiquiz">
          {page.includes("quiz") ? (
            <CurContent>🎮 단체 퀴즈</CurContent>
          ) : (
            <Content>🎮 단체 퀴즈</Content>
          )}
        </Link>
      </Contents>

      {login ? (
        <User>
          <p className="nickname">{nickname}</p>
          <p>&nbsp;님</p>
          <p style={{ color: "#FAB809" }}>&nbsp;|&nbsp;</p>
          <p>로그아웃</p>
        </User>
      ) : (
        <Login>
          <Link to="/login">
            <p>로그인</p>
          </Link>

          <p style={{ color: "#FAB809" }}>&nbsp;|&nbsp;</p>
          <Link to="/signup">
            <p>회원가입</p>
          </Link>
        </Login>
      )}
    </Div>
  );
}

export default Header;

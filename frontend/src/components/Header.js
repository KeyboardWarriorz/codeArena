import styled from "styled-components";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";

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

  .selected {
    font-weight: bold;
    color: #c25450;
  }
`;

const Login = styled.div`
  display: flex;
  margin-right: 20px;

  #vline {
    cursor: default;
    color: #fab809;
  }
`;

const User = styled.div`
  display: flex;
  margin-right: 20px;
  cursor: default;

  .nickname {
    color: #006e61;
    font-weight: bold;
  }

  .line {
    color: #fab809;
  }

  .out {
    cursor: pointer;
  }
`;

function Header() {
  const [login, setLogin] = useState(false); // 로그인시 set
  const [userId, setUserId] = useState(1);
  const [nickname, setNickname] = useState("성환조");

  function logout() {}

  return (
    <Div>
      <Link to="/">
        <Title>
          <Code>CODE</Code>
          <Arena>Arena</Arena>
        </Title>
      </Link>

      <Contents>
        <NavLink
          to="/lecture"
          className={({ isActive }) => (isActive ? "selected" : "")}
        >
          <div>📚 기초 개념</div>
        </NavLink>

        <NavLink
          to="/problem"
          className={({ isActive }) => (isActive ? "selected" : "")}
        >
          <div>📝 문제 풀이</div>
        </NavLink>

        <NavLink
          to={`/board`}
          className={({ isActive }) => (isActive ? "selected" : "")}
        >
          <div>😍 커뮤니티</div>
        </NavLink>

        <NavLink
          to="/multiquiz"
          className={({ isActive }) => (isActive ? "selected" : "")}
        >
          <div>🎮 단체 퀴즈</div>
        </NavLink>
      </Contents>

      {login ? (
        <User>
          <Link to="/user/1">
            <p className="nickname">{nickname}</p>
          </Link>

          <p>&nbsp;님</p>
          <p className="line">&nbsp;|&nbsp;</p>
          <p className="out" onClick={logout}>
            로그아웃
          </p>
        </User>
      ) : (
        <Login>
          <Link to="/login">
            <p>로그인</p>
          </Link>

          <p id="vline">&nbsp;|&nbsp;</p>
          <Link to="/signup">
            <p>회원가입</p>
          </Link>
        </Login>
      )}
    </Div>
  );
}

export default Header;

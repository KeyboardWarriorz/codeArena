import styled from "styled-components";

const Div = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: solid #fab809;
  justify-content: space-between;
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
  width: 30%;
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div``;

const Login = styled.div`
  display: flex;
  margin-right: 20px;
`;

function Header() {
  return (
    <Div>
      <Title>
        <Code>CODE</Code>
        <Arena>Arena</Arena>
      </Title>
      <Contents>
        <Content>📚 기초 개념</Content>
        <Content>📝 문제 풀이</Content>
        <Content>📚 커뮤니티</Content>
        <Content>🎮 단체 퀴즈</Content>
      </Contents>

      <Login>
        <p>로그인</p>
        <p style={{ color: "#FAB809" }}>&nbsp;|&nbsp;</p>
        <p>회원가입</p>
      </Login>
    </Div>
  );
}

export default Header;

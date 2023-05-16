// import Header from "./components/Header";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment } from "react";

import Main from "./pages/Main";

import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Mypage from "./pages/MyPage";
import ChangePW from "./pages/ChangePW";

import Board from "./pages/Board";
import BoardDetail from "./pages/BoardDetail";
import BoardRegist from "./pages/BoardRegist";

import LectureList from "./pages/LectureList";
import LectureItem from "./pages/LectureItem";

import ProblemList from "./pages/ProblemList";
import ProblemDesc from "./pages/ProblemDesc";
import ProblemItem from "./pages/ProblemItem";

import SubmitResult from "./pages/SubmitResult";

import WordList from "./pages/WordList";
import UserProblem from "./pages/UserProblem";

import MultiQuiz from "./pages/MultiQuiz";
import QuizRoom from "./pages/QuizRoom";

import Notfound from "./pages/NotFound";
import MainLayout from "./MainLayout";

// 비로그인도 접근 가능한 페이지
const pages = (
  <Fragment>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Main />} />
    </Route>
  </Fragment>
);

// 로그인 안했을 때 헤더가 없음
const noneHeader = (
  <Fragment>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/*" element={<Notfound />} />
  </Fragment>
);

// 로그인 했을 때 접근 가능
const userPage = (
  <Fragment>
    <Route>
      <Route path="/user/:user_id/changepw" element={<ChangePW />} />
      <Route element={<MainLayout />}>
        <Route path="/user/:user_id" element={<Mypage />} />

        <Route path="/board" element={<Board />} />
        <Route path="/board/detail/:article_id" element={<BoardDetail />} />
        <Route path="/board/regist" element={<BoardRegist />} />

        <Route path="/lecture" element={<LectureList />} />
        <Route path="/lecture/:subcategory" element={<LectureItem />} />

        <Route path="/problem" element={<ProblemList />} />
        <Route path="/problem/desc/:problem_id" element={<ProblemDesc />} />
        <Route path="/problem/:problem_id" element={<ProblemItem />} />

        <Route path="/problem/result/:problem_id" element={<SubmitResult />} />

        <Route path="/user/:user_id/word" element={<WordList />} />
        <Route path="/user/:user_id/problem" element={<UserProblem />} />

        <Route path="/multiquiz" element={<MultiQuiz />} />
        <Route path="/multiquiz/:room_id" element={<QuizRoom />} />
      </Route>
    </Route>
  </Fragment>
);

const isLogin = true;

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {isLogin ? userPage : null}
          {noneHeader}
          {pages}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

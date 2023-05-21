import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import LectureCard from "../components/organisms/LectureCard";

const Div = styled.div`
  padding: 30px;
  text-align: start;

  h3 {
    margin-top: 0;
  }
`;

const Select = styled.div`
  display: flex;
  padding-top: 10px;
  margin-left: 10px;
  padding-bottom: 10px;
  // background-color: pink;

  .line {
    >span: nth-of-type(1) {
      cursor: pointer;
    }
    > span:nth-of-type(2) {
      margin: 0 15px;
      color: #bcbfc1;
    }
  }

  #selected {
    >span: nth-of-type(1) {
      cursor: pointer;
      color: #006e61;
      font-weight: bold;
    }
  }
`;

const Lectures = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export default function LectureList() {
  const categories = ["JAVA", "JSP&Servlet", "Spring", "DataBase", "JavaScript", "HTML/CSS"];
  const [selected, setSelected] = useState("JAVA");
  const [id, setId] = useState(1);
  const [lectures, setLectures] = useState([]);
  console.log(lectures);

  function setCategory(e) {
    setId(categories.indexOf(e.target.innerText) + 1);
    setSelected(e.target.innerText);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8080/category/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setLectures(res.data.data.subcategory);
        }
      })
      .catch((e) => console.log(""));
  }, [id]);

  return (
    <Div>
      <h3>📚 기초 개념 알아보기</h3>
      <Select>
        {categories.map((c) => {
          if (selected === c) {
            return (
              <div key={c} className="line" id="selected" onClick={setCategory}>
                <span>{c}</span>
                <span>|</span>
              </div>
            );
          } else {
            return (
              <div key={c} className="line" onClick={setCategory}>
                <span>{c}</span>
                <span>|</span>
              </div>
            );
          }
        })}
      </Select>
      <Lectures>
        {lectures.map((l, idx) => {
          return <LectureCard key={idx} title={l.subcategory_name} />;
        })}
      </Lectures>
    </Div>
  );
}

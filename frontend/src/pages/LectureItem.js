import React, { useEffect, useState } from "react";
import api from "../interceptor";
import styled, { css } from "styled-components";
import MiniTag from "../components/buttons/MiniTag";
import Switch from "react-switch";
import GPTModal from "../components/modals/GPTModal";

export default function LectureItem() {
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState([]);

  const lecturePath = window.location.pathname;

  const handleChange = (checked) => {
    setChecked(checked);
  };

  useEffect(() => {
    api
      .get(`http://localhost:8080${lecturePath}`)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch((e) => console.log(e));
  });

  // 모달 온오프
  const [showModal, setShowModal] = useState(false);
  function clickModal() {
    setShowModal(!showModal);
  }

  return (
    <Div>
      <Title>
        <div>
          <h2>[{data.category_name}]</h2>
          <h2>{data.subcategory_name}</h2>
        </div>

        <div>
          <div id="tag" onClick={clickModal}>
            <MiniTag green="true" text="사용법 확인" />
          </div>

          <span>검색 모드</span>
          <label>
            <Switch
              onChange={handleChange}
              checked={checked}
              onColor="#D2ACB2"
            />
          </label>
        </div>
      </Title>
      <div id="hr" />
      <Content dangerouslySetInnerHTML={{ __html: data.content }} />

      {showModal && <GPTModal clickModal={clickModal} />}
    </Div>
  );
}

const Div = styled.div`
  text-align: start;
  padding: 50px;

  h2 {
    margin-top: 0;
  }

  #hr {
    border-top: 2px solid #d7d7d7;
    height: 8px;
    margin-top: 7px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    margin-right: 10px;
  }

  div {
    display: flex;
    align-items: center;
  }

  h2:nth-of-type(1) {
    color: #006e61;
    margin-right: 8px;
  }

  #tag {
    cursor: pointer;
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
`;

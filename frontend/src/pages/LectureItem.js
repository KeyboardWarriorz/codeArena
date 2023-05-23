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
      .get(lecturePath)
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data);
          setData(res.data);
        }
      })
      .catch((e) => console.log(""));
  }, []);

  // 모달 온오프
  const [showModal, setShowModal] = useState(false);
  function clickModal() {
    setShowModal(!showModal);
  }
  const [selectedText, setSelectedText] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const [searchData, setSearchData] = useState("");

  function handleSelect(event) {
    const text = window.getSelection().toString().trim();

    if (checked) {
      const selectedText = window.getSelection().toString();
      if (text) {
        setSelectedText(text);
        getWord();
        setShowTooltip(true);
        // 위치 관련
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        setSelectedText(text);
        setShowTooltip(true);

        const { top, left, width, height } = rect;
        const tooltipTop = top + height;
        const tooltipLeft = left + width;

        setTooltipPosition({ top: tooltipTop, left: tooltipLeft });
      }
      console.log("Selected text:", selectedText);
    }
  }

  useEffect(() => {
    setSearchData(selectedText);
  }, [selectedText]);

  const [loading, setLoading] = useState(false);

  async function getWord() {
    console.log("ㄱㄱ");
    try {
      setSearchData({ name: selectedText });
      setLoading(true); // 로딩 상태 시작
      console.log(searchData);
      console.log("url", `http://localhost:8080/word/${searchData}`);
      const response = await api.get(
        `http://localhost:8080/word/${searchData}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
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

      <div style={{ height: "50vh" }}>
        <Content
          onMouseUp={handleSelect}
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
        {showTooltip && (
          <Tooltip top={tooltipPosition.top} left={tooltipPosition.left}>
            <p>{selectedText}</p>
            {/* Additional content for the tooltip */}
          </Tooltip>
        )}
      </div>
      {loading && <div>Loading...</div>}
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
  // display: flex;
  flex-direction: row;
  background-color: #f8f8f800;
  border-radius: 5px;
  box-shadow: 4px 3px 3px #49494930;
  min-height: 90px;                                                                                                                                                                              0
  margin-bottom: 10px;
  padding: 10px;
  line-height: 1.6rem;
`;

const Tooltip = styled.div`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;
  background-color: yellow;
`;

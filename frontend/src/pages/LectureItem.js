import React, { useEffect, useState } from "react";
import api from "../interceptor";
import styled, { css } from "styled-components";
import MiniTag from "../components/buttons/MiniTag";
import Switch from "react-switch";
import GPTModal from "../components/modals/GPTModal";
import Loader from "../components/Loader";
import swal from "sweetalert";
import GPT from "../assets/images/GPT.png";

export default function LectureItem() {
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState([]);
  const userId = window.localStorage.getItem("userId");

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
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchData, setSearchData] = useState("");
  const [postData, setPostData] = useState({ user_id: userId, name: "" });

  function handleSelect(event) {
    const text = window.getSelection().toString().trim();

    if (checked) {
      const selectedText = window.getSelection().toString();
      if (text) {
        setSelectedText(text);
        getWord(text);

        // 위치 관련
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        const { top, left, width, height } = rect;
        const tooltipTop = top + height;
        let tooltipLeft = left + width;
        let tooltipWidth = 0.4 * window.innerWidth;

        if (tooltipLeft + tooltipWidth > window.innerWidth) {
          tooltipLeft = window.innerWidth - tooltipWidth;
        }

        setTooltipPosition({ top: tooltipTop, left: tooltipLeft });
      }
      console.log("Selected text:", selectedText);
    }
  }

  useEffect(() => {
    setSearchData(selectedText);
  }, [selectedText]);

  /*
    state값으로 단어 변경 후 호출 시 이전 값이 전달됨 (타이밍 오류,,)
    paremeter로 전달해야 현재 선택한 단어가 잘 넘어감!!!
  */
  function getWord(t) {
    setName("");
    setDesc("");
    setLoading(true);
    api
      .get(`http://localhost:8080/word/${t}`)
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setName(res.data.name);
        setShowTooltip(true);
        setDesc(res.data.data);
        setPostData({ user_id: userId, name: name });
      })
      .catch((e) => {
        setLoading(false);
        swal("에러 발생!", "다시 시도해 주세요 😥", "error", {
          buttonColor: "red",
        });
        console.log(e);
      });
  }

  function addWord(n) {
    api
      .post(`http://localhost:8080/word`, { user_id: userId, name: n })
      .then((res) => {
        if (res.status === 201) {
          swal(
            "저장 성공!",
            "마이페이지에서 저장한 단어를 확인할 수 있어요",
            "success"
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
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
        {showTooltip && desc !== "" && (
          <Tooltip top={tooltipPosition.top} left={tooltipPosition.left}>
            <div>
              <h4>{name}</h4>
              <div>
                <img src={GPT} />
              </div>
            </div>
            <p id="hr" />
            <p>{desc}</p>
            <div>
              <button
                id="b1"
                onClick={() => {
                  addWord(name);
                }}
              >
                내 단어장에 추가
              </button>
              <button
                id="b2"
                onClick={() => {
                  setShowTooltip(false);
                }}
              >
                닫기
              </button>
            </div>
          </Tooltip>
        )}
      </div>
      {loading && <Loader />}
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
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: 4px 3px 3px #49494930;
  min-height: 90px;                                                                                                                                                                              0
  margin-bottom: 10px;
  padding: 10px;
  line-height: 2.2rem;

  ::selection {
    background: #FFD360
 }
`;

const Tooltip = styled.div`
  border: 2px solid #fab80950;
  width: 30vw;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px 10px;
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left}px;

  h4 {
    margin-top: 0;
    margin-bottom: 0;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    width: 20px;
    height: 20px;
  }

  #hr {
    border-top: 2px solid #d7d7d7;
    height: 8px;
    margin-top: 7px;
  }

  p {
    margin-top: 0;
    margin-bottom: 0;
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: 7px;
    width: 49%;
    margin-top: 10px;
    color: white;
    font-family: "NanumSquareNeo-Variable";
    padding: 3px 0;
    box-shadow: 3px 2px 4px #aeaeae;
  }

  #b1 {
    background-color: #006e61;
  }

  #b2 {
    background-color: #aeaeae;
  }
`;

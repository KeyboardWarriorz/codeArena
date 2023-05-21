import React from "react";
import styled from "styled-components";
import AuthInput from "../inputs/Authinput";
import MiniButton from "../buttons/MiniButton";

const Box = styled.div`
  p {
    margin-bottom: 10px;
  }

  #row1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: default;
  }

  #row2 {
    display: flex;
    align-items: center;
    cursor: default;
    justify-content: center;
  }

  #title {
    font-size: 14px;
  }

  #red {
    color: #c25450;
  }

  #added {
    margin-left: 7px;
    font-size: 4px;
    color: #006e61;
    margin-bottom: 0;
  }
`;
export default function AuthDiv(props) {
  return (
    <Box>
      <div id="row1">
        <div id="row2">
          <p id="title">{props.title}</p>
          {props.es && <p id="red">&nbsp;*</p>}
          {props.added && <p id="added">{props.added}</p>}
        </div>
        {props.isbutton && <MiniButton func={props.buttonfunc} text="중복 확인" />}
      </div>

      <AuthInput type={props.type} placeholder={props.placeholder} />
    </Box>
  );
}

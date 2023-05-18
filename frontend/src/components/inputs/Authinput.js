import styled from "styled-components";

const Input = styled.input`
  width: 320px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #d6d5d5;
  padding-left: 8px;
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

export default function AuthInput(props) {
  return <Input type={props.type} placeholder={props.placeholder} />;
}

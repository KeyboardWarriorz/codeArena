import { atom } from "recoil";

const resultState = atom({
  key: "resultState",
  default: {
    success: 0,
    problem_id: 0,
  },
});

export default resultState;

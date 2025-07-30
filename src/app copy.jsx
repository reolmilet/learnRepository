//app初始化
import React from "react";
import { useState } from "react";
//ScoreDisplay组件

//App组件
import ScoreDisplay from "./ScoreDisplay";
// 猿辅导实现分数
const App = () => {
  const [currentScore, setCurrentScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  function handleInput(e) {
    e.preventDefault();
    const parse = parseFraction(e.target.score.value);
    console.log(parse);
    if (parse === null) {
          return;
    
    }
    setCurrentScore(parseFraction(e.target.score.value).numerator);
    setTotalScore(parseFraction(e.target.score.value).denominator);
  }
  function parseFraction(str) {
    const pattern = /^\\frac\{(\d+)\}\{(\d+)\}$/;
    const match = str.match(pattern);

    if (!match) return null;

    return {
      numerator: parseInt(match[1]),
      denominator: parseInt(match[2]),
    };
  }
  return (
    <div>
      <form action="" onSubmit={handleInput}>
        <input type="text" name="score" />
        <button type="submit">Submit</button>
      </form>
      <ScoreDisplay currentScore={currentScore} totalScore={totalScore} />{" "}
    </div>
  );
};
export default App;

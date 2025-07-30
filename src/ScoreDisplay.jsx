import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import style from "./index.module.css";

// 可不可以约分
// 是否分子分母相等
// 分子分母是否有负数
// 分母是否为0
// 只输入分子或者只输入分母

// 展示
// 超宽
// 边界溢出
//
// 除去极限情况
const ScoreDisplay = ({
  currentScore,
  totalScore,
  animate = true,
  duration = 1000,
}) => {
  const refForm = useRef(null);

  const [displayScore, setDisplayScore] = useState(0);
  const [isint, setIsint] = useState(false);

  useEffect(() => {
    if (currentScore === totalScore) {
      setIsint(true);
    }
    if (!animate) {
      setDisplayScore(currentScore);
      return;
    }

    let start = 0;
    const increment = currentScore / (duration / 16); // 60fps
    //
    const timer = setInterval(() => {
      start += increment;
      if (start >= currentScore) {
        setDisplayScore(currentScore);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [currentScore, animate, duration]);

  return (
    <div className={style.scoreDisplay}>
      {!isint && (
        <div className={style.scoreContainer}>
          <div className={style.numerator}>{displayScore}</div>
          <div className={style.divider}></div>
          <div className={style.denominator}>{totalScore}</div>
        </div>
      )}
      {isint && <div>1</div>}
    </div>
  );
};

ScoreDisplay.propTypes = {
  currentScore: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
  animate: PropTypes.bool,
  duration: PropTypes.number,
};

export default ScoreDisplay;

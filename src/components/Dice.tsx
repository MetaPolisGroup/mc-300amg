import React, { useEffect, useState } from "react";

const Dice = () => {
  const faces = 6;
  const maxRollTimes = 10;

  const [intrvl, setIntrvl] = useState<NodeJS.Timer>();
  const [diceFace, setDiceFace] = useState<number>(1);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [rollTimes, setRollTimes] = useState<number>(0);
  useEffect(() => {
    if (rollTimes === 0) {
      clearInterval(intrvl);
      setBtnDisabled(false);
    }
  }, [rollTimes, intrvl]);

  function rollDice() {
    setBtnDisabled(true);
    clearInterval(intrvl);
    let counter = Math.floor(Math.random() * maxRollTimes + 1);
    setRollTimes(counter);
    const interval = setInterval(() => {
      setDiceFace(Math.floor(Math.random() * faces) + 1);
      counter--;
      setRollTimes(counter);
    }, 200);
    setIntrvl(interval);
  }

  const dice = (
    <div className="dice-container">
      <div className={`dice face-${diceFace}`}>
        <div className="face-1">
          <div className="dot-container">
            <div className="dot"></div>
          </div>
        </div>
        <div className="face-3">
          <div className="dot-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
        <div className="face-4">
          <div className="dot-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
        <div className="face-2">
          <div className="dot-container">
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
        <div className="face-5">
          <div className="dot-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
        <div className="face-6">
          <div className="dot-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const rollButton = (
    <button
      className="dan-btn dan-btn--default"
      disabled={btnDisabled}
      onClick={rollDice}
    >
      {btnDisabled}
      Roll Dice
    </button>
  );

  return (
    <div className="main-container">
      <div className="main-dice-container">{dice}</div>
      <div className="button-container">{rollButton}</div>
    </div>
  );
};

export default Dice;

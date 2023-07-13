"use client";

import React, { useEffect, useState } from "react";

interface ICountDown {
  title: string;
  min: number;
}

const CountDown: React.FC<ICountDown> = ({ title, min }) => {
  const [minute, setMinute] = useState<number>(min);
  const [second, setSecond] = useState<number>(0);

  useEffect(() => {
    let countDown = setTimeout(() => {
      if (minute === 0 && second === 0) {
        setMinute(min - 1);
        return setSecond(59);
      }

      if (second === 0) {
        setMinute(minute - 1);
        return setSecond(59);
      }

      return setSecond(second - 1);
    }, 1000);

    return () => {
      clearTimeout(countDown);
    };
  }, [minute, second, min]);

  const renderTime = () => {
    const _second = second < 10 ? `0${second}` : second;
    return (
      <>
        {minute}:{_second}
      </>
    );
  };

  return (
    <div className="bg-[--colors-backgroundAlt] p-1 px-1 rounded-3xl text-[--colors-light-white] flex gap-0 items-center flex-col md:flex-row rounded-bl-[3rem] min-w-[68px] md:rounded-bl-3xl md:gap-2 md:min-w-fit md:p-2 md:px-3">
      <div className="text-[--colors-secondary] text-base font-semibold rounded-bl-[3rem] flex-col md:flex-row md:text-lg">
        {renderTime()}
      </div>
      <div className="text-xs">{title}</div>
    </div>
  );
};

export default CountDown;

"use client";

import React, { useEffect, useState } from "react";

import clsx from "clsx";
import { Icons } from "./Icons";
import Button from "./ui/Button";

interface ICountDown {
  title: string;
  min: number;
  onAction?: {
    setIsShowDrawer?: (value: boolean) => void;
  };
}

const CountDown: React.FC<ICountDown> = ({ title, min, onAction }) => {
  const [minute, setMinute] = useState<number>(min);
  const [second, setSecond] = useState<number>(0);

  const LIST_BTN_FEATURE = [
    {
      id: "question",
      icon: <Icons.HelpCircle />,
      disabled: false,
      onAction: () => {},
    },
    {
      id: "cup",
      icon: <Icons.Trophy />,
      disabled: false,
      onAction: () => {},
    },
    {
      id: "history",
      icon: <Icons.History />,
      disabled: false,
      className: "hidden lg:flex",
      onAction: () => {
        return onAction?.setIsShowDrawer?.(true);
      },
    },
  ];

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

  const renderListFeature = () => {
    return LIST_BTN_FEATURE.map((feature) => {
      return (
        <Button
          key={feature.id}
          className={clsx(
            `w-12 h-12 !rounded-2xl !p-2 ${feature?.className}`,
            feature.disabled &&
              "cursor-no-drop !active:border-none focus:!border-none hidden md:flex",
            !feature.disabled &&
              "bg-[--colors-textSubtle] hover:bg-[--colors-textSubtle] hover:opacity-80"
          )}
          onClick={() => {
            if (!feature.disabled) {
              feature.onAction();
            }
          }}
        >
          {feature.icon}
        </Button>
      );
    });
  };

  return (
    <div className="flex items-center gap-2">
      <div className="bg-[--colors-backgroundAlt] p-1 px-1 pr-8 mr-3 rounded-3xl text-[--colors-light-white] flex gap-0 items-center flex-col md:flex-row rounded-bl-[3rem] min-w-[98px] md:rounded-bl-3xl md:gap-2 md:min-w-fit md:p-2 md:px-3 md:pr-11 order-1 sm:order-none relative">
        <div className="text-[--colors-secondary] text-base font-semibold rounded-bl-[3rem] flex-col md:flex-row md:text-lg">
          {renderTime()}
        </div>
        <div className="text-xs">{title}</div>
        <Icons.Clock />
      </div>

      {renderListFeature()}
    </div>
  );
};

export default CountDown;

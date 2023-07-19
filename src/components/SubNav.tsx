"use client";

import React, { useEffect, useState } from "react";

import clsx from "clsx";
import { Icons } from "./Icons";

interface ISubNav {
  isShowHistory: boolean;
  onShowHistory: (value: boolean) => void;
}

const MODE = {
  CARD: "CARD",
  CHART: "CHART",
  HISTORY: "HISTORY",
};

const SubNav: React.FC<ISubNav> = ({ isShowHistory, onShowHistory }) => {
  const [mode, setMode] = useState<string>(MODE.CARD);

  const classNameIconCenter = "w-[20px] h-[20px]";

  useEffect(() => {
    if (isShowHistory) return setMode(MODE.HISTORY);
    if (!isShowHistory) return setMode(MODE.CARD);
  }, [isShowHistory]);

  const handleAction = (action: string) => {
    if (action === MODE.CARD) {
      onShowHistory(false);
      return console.log("clicked Card");
    }

    if (action === MODE.CHART) {
      onShowHistory(false);
      return console.log("clicked Chart");
    }

    if (action === MODE.HISTORY) {
      return onShowHistory(true);
    }

    return;
  };

  const renderButton = () => {
    const LIST_BTN = [
      {
        id: "CARD",
        icon: () => <Icons.Layers className={classNameIconCenter} />,
      },
      {
        id: "CHART",
        icon: () => <Icons.BarChart3 className={classNameIconCenter} />,
      },
      {
        id: "HISTORY",
        icon: () => <Icons.History className={classNameIconCenter} />,
      },
    ];

    return (
      <div className="flex bg-[--colors-input] rounded-2xl text-[--colors-textSubtle]">
        {LIST_BTN.map((btn) => {
          return (
            <button
              className={clsx(
                "flex justify-center items-center w-[52px] h-8 rounded-2xl cursor-pointer",
                mode === btn.id &&
                  "bg-[--colors-textSubtle] text-[--colors-input]"
              )}
              key={btn.id}
              onClick={() => {
                setMode(btn.id);
                return handleAction(btn.id);
              }}
            >
              {btn.icon()}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-[--colors-backgroundAlt] p-[15px] flex justify-center items-center  lg:hidden">
      {renderButton()}
    </div>
  );
};

export default SubNav;

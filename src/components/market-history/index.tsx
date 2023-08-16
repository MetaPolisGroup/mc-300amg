"use client";
import React, { useState } from "react";

import clsx from "clsx";
import { Icons } from "../Icons";
import ItemHistory from "./ItemHistory";
import { LIST_MODE, LIST_RADIO, MODE, RADIO } from "@/constants/history";

interface IMarketHistory {
  onClose: () => void;
}

const MarkerHistory: React.FC<IMarketHistory> = ({ onClose }) => {
  const [mode, setMode] = useState<any>(LIST_MODE[0]);
  const [radioChecked, setRadioChecked] = useState<string>(RADIO.ALL);

  const handleSelectRadio = (value: string) => {
    setRadioChecked(value);
  };

  const renderMode = () => {
    return (
      <div className="flex justify-between bg-[--colors-input] h-8 rounded-2xl border-[1px] border-solid border-[--colors-inputSecondary] mb-4">
        {LIST_MODE.map((btn) => {
          return (
            <button
              key={btn.id}
              className={clsx(
                "w-1/2 text-base font-bold",
                btn.id !== mode.id && "text-[--colors-textSubtle]",
                btn.id === mode.id &&
                  "bg-[--colors-textSubtle] text-[--colors-backgroundAlt] rounded-2xl"
              )}
              onClick={() => {
                setMode(btn);
              }}
            >
              {btn.title}
            </button>
          );
        })}
      </div>
    );
  };

  const renderFilter = () => {
    if (mode.id === MODE.PNL) return null;

    const renderListRadio = () => {
      return LIST_RADIO.map((radio) => {
        return (
          <div key={radio} className="flex gap-1">
            <div
              className={clsx(
                "relative w-6 h-6 cursor-pointer  rounded-full border-2 border-solid",
                radio === radioChecked &&
                  "border-[--colors-success] bg-[--colors-success]",
                radio !== radioChecked &&
                  "border-[--colors-disabled] bg-[--colors-cardBorder]"
              )}
              onClick={() => handleSelectRadio(radio)}
            >
              <div
                className={clsx(
                  radio === radioChecked &&
                    "absolute w-3 h-3 bg-[--colors-backgroundAlt]  rounded-full top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
                )}
              />
            </div>
            <div
              className="cursor-pointer select-none"
              onClick={() => handleSelectRadio(radio)}
            >
              {radio}
            </div>
          </div>
        );
      });
    };

    return (
      <div>
        <div className="text-[--colors-textSubtle] text-xs font-medium">
          Filter
        </div>
        <div className="flex gap-4 text-[--colors-text] text-base font-medium">
          {renderListRadio()}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        className="p-4"
        style={{ background: "var(--colors-gradientBubblegum)" }}
      >
        <div className="flex justify-between mb-8">
          <div className="text-[--colors-text] text-xl font-bold">History</div>
          <button
            className="text-[--colors-primary] flex items-center gap-2 text-base font-bold"
            onClick={() => onClose()}
          >
            Close <Icons.ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {renderMode()}
        {renderFilter()}
      </div>

      <div className="bg-[--colors-backgroundAlt] text-[--colors-text]">
        <div className="overflow-y-auto lg:max-h-[75vh]">
          <ItemHistory />
          <ItemHistory />
          <ItemHistory />
        </div>
      </div>
    </div>
  );
};

export default MarkerHistory;

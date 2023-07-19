"use client";

import React, { useState } from "react";

import clsx from "clsx";
import { Icons } from "./Icons";

interface IDrawerHistory {
  open: boolean;
  onClose: (value: boolean) => void;
}

const MODE = {
  ROUNDS: "ROUNDS",
  PNL: "PNL",
};

const RADIO = {
  ALL: "All",
  COLLECTED: "Collected",
  UNCOLECTED: "Uncollected",
};

const LIST_MODE = [
  {
    id: MODE.ROUNDS,
    title: "Rounds",
  },
  {
    id: MODE.PNL,
    title: "PNL",
  },
];

const LIST_RADIO = [RADIO.ALL, RADIO.COLLECTED, RADIO.UNCOLECTED];

const DrawerHistory: React.FC<IDrawerHistory> = ({ open, onClose }) => {
  const [mode, setMode] = useState<any>(LIST_MODE[0]);
  const [radioChecked, setRadioChecked] = useState<string>(RADIO.ALL);

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
              onClick={() => setRadioChecked(radio)}
            >
              <div
                className={clsx(
                  radio === radioChecked &&
                    "absolute w-3 h-3 bg-[--colors-backgroundAlt]  rounded-full top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
                )}
              />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setRadioChecked(radio)}
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

  const renderContent = () => {
    if (mode.id === MODE.PNL) {
      return null;
    }

    return (
      <div>
        <div className="p-4 cursor-pointer border-b-2 border-solid border-[--colors-cardBorder] font-medium">
          <p>Showing history for Prediction v0.2</p>
          <p className="flex gap-1 items-center text-[--colors-primary] text-base">
            Check for unclaimed v0.1 winnings{" "}
            <Icons.ChevronRight className="w-5 h-5" />
          </p>
        </div>
      </div>
    );
  };

  const renderMainContent = () => {
    if (!open) return null;

    return (
      <>
        <div
          className="p-4"
          style={{ background: "var(--colors-gradientBubblegum)" }}
        >
          <div className="flex justify-between mb-8">
            <div className="text-[--colors-light-white] text-xl font-bold">
              History
            </div>
            <button
              className="text-[--colors-primary] flex gap-2 text-base font-bold"
              onClick={() => onClose(false)}
            >
              Close <Icons.ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {renderMode()}
          {renderFilter()}
        </div>

        <div className="h-full bg-[--colors-backgroundAlt] text-[--colors-text]">
          {renderContent()}

          <div className="text-center p-6">
            <p className="mb-2 text-xl font-bold">
              No prediction history available
            </p>
            <p className="text-base font-medium">
              If you are sure you should see history here, make sure you’re
              connected to the correct wallet and try again.
            </p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      className={clsx(
        open && "w-[385px] transition-transform translate-x-0",
        !open && "w-0 transition-transform transform translate-x-full"
      )}
    >
      {renderMainContent()}
    </div>
  );
};

export default DrawerHistory;

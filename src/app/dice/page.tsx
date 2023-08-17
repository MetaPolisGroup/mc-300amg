"use client";
import React, { useState } from "react";

import clsx from "clsx";
import { Icons } from "@/components/Icons";
import DiceHistory from "@/components/dice-history";
import Dice from "@/components/bet-dice/Dice";

const ChineseDice = () => {
  const [isShowHistory, setIsShowHistory] = useState<boolean>(false);

  return (
    <main className="bg-gradient-to-r from-[--colors-violetAlt1] to-[--colors-violetAlt2]">
      <div className="flex overflow-hidden min-h-[85vh]">
        <div
          className={clsx(
            "overflow-hidden py-7 md:py-9 px-3 md:px-6",
            isShowHistory
              ? "w-[0px] lg:w-[calc(100%-385px)] !px-0 lg:!px-6"
              : "w-[100%]"
          )}
        >
          <div className="flex justify-end">
            <button
              className="bg-[--colors-primary] h-fit p-3 rounded-xl"
              onClick={() => setIsShowHistory(!isShowHistory)}
            >
              <Icons.History className="text-[--colors-white]" />
            </button>
          </div>

          <Dice />
        </div>

        <div
          className={clsx(
            "bg-[--colors-backgroundAlt]",
            isShowHistory &&
              "w-[100%] lg:w-[385px] transition-transform translate-x-0",
            !isShowHistory &&
              "w-0 transition-transform transform translate-x-full"
          )}
        >
          {isShowHistory ? (
            <DiceHistory onClose={() => setIsShowHistory(false)} />
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default ChineseDice;

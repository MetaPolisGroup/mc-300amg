"use client";
import React, { useState } from "react";

import clsx from "clsx";
import { Icons } from "@/components/Icons";
import MarkerHistory from "@/components/market-history";
import BoxingCard from "@/components/bet-boxing/BoxingCard";

import ElectionCard from "@/components/bet-election/ElectionCard";

const MarketPage = () => {
  const [isShowHistory, setIsShowHistory] = useState<boolean>(false);

  return (
    <main className="bg-gradient-to-br from-slate-400 to-indigo-800">
      <div className="flex overflow-hidden min-h-[85vh]">
        <div
          className={clsx(
            "overflow-hidden py-7 md:py-9 px-3 md:px-6",
            isShowHistory
              ? "w-[0px] lg:w-[calc(100%-385px)] !px-0 lg:!px-6"
              : "w-[100%]"
          )}
        >
          <div className="flex justify-between">
            <h1 className="pb-5 text-zinc-100 text-7xl font-bold leading-normal">
              Market
            </h1>

            <button
              className="bg-[--colors-primary] h-fit p-3 rounded-xl"
              onClick={() => setIsShowHistory(!isShowHistory)}
            >
              <Icons.History className="text-[--colors-white]" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-2">
            <BoxingCard />
            <ElectionCard />
          </div>
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
            <MarkerHistory onClose={() => setIsShowHistory(false)} />
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default MarketPage;

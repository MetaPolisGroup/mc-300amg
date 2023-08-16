"use client";
import React, { useState } from "react";

import clsx from "clsx";
import { Icons } from "../Icons";
import { CURRENCY_UNIT } from "@/constants";

const ItemHistory: React.FC = () => {
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);

  const isLive = false;
  const isRefund = false;
  const isWaiting = false;
  const isWinningRefund = false;
  const isLosingRefund = false;
  const isWin = true;
  const isLose = false;

  const renderWinningAmount = () => {
    if (isWaiting || isLive) return null;

    // if (isRefund)
    //   return (
    //     <div className="text-center">
    //       <div className="text-xs">Your Result</div>
    //       <div className={clsx("font-bold text-[--colors-success]")}>
    //       + {handlerFormatEther(data?.refund)}
    //       </div>
    //     </div>
    //   );

    return (
      <div className="text-center">
        <div className="text-xs">Your Result</div>
        <div
          className={clsx(
            "font-bold",
            isWin && "text-[--colors-success]",
            isLose && "text-[--colors-light-failure]"
          )}
        >
          {/* {isWin
            ? `+ ${handlerFormatEther(
                data?.winning_amount + data?.refund + data?.amount
              )}`
            : `- ${winningAmount}`} */}
          + 100
        </div>
      </div>
    );
  };

  const renderContentDetail = () => {
    if (!isShowDetail) return null;

    return (
      <div className="p-4 border-b-2 border-solid border-[--colors-cardBorder] !bg-[--colors-backgroundAlt2]">
        <div className="flex justify-between mb-2">
          <div className="text-lg font-bold">Your History</div>
          <div
            className={clsx(
              "flex text-lg font-bold gap-2 uppercase",
              isWin && "text-[--colors-warning]",
              isLose && "text-[--colors-light-failure]"
            )}
          >
            WIN
            {isWin ? (
              <Icons.Trophy className="w-4" />
            ) : (
              <Icons.Ban className="w-4" />
            )}
          </div>
        </div>

        <div className="border-2 border-solid border-[--colors-textSubtle] rounded-2xl p-3 flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="text-sm flex items-center">Your direction:</div>
            <div
              className={clsx(
                "text-sm font-bold flex gap-1 items-center p-1 rounded-md",
                "bg-[--colors-success]"
              )}
            >
              Marh
            </div>
          </div>

          <div className="flex justify-between">
            <div className="text-sm">Prize pool</div>
            <div className="text-sm font-bold">999 {CURRENCY_UNIT}</div>
          </div>

          <div className="flex justify-between">
            <div className="text-sm">Mark</div>
            <div className="text-sm font-bold">999 {CURRENCY_UNIT}</div>
          </div>

          <div className="flex justify-between">
            <div className="text-sm">ELon</div>
            <div className="text-sm font-bold">999 {CURRENCY_UNIT}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        className="p-4 border-b-2 border-solid border-[--colors-cardBorder] cursor-pointer flex items-center justify-between"
        onClick={() => {
          setIsShowDetail(!isShowDetail);
        }}
      >
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-xs">Round</div>
            <div className="text-[--colors-text] font-bold">1234</div>
          </div>
          {renderWinningAmount()}
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-[--colors-primary] text-sm text-[--colors-white] px-4 py-1 rounded-2xl cursor-pointer hover:opacity-[0.8]">
            Collect
          </button>
          <div>
            {isShowDetail ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
          </div>
        </div>
      </div>

      {renderContentDetail()}
    </div>
  );
};

export default ItemHistory;

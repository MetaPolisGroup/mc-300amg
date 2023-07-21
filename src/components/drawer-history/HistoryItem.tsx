"use client";

import React, { useState } from "react";

import { Icons } from "../Icons";
import clsx from "clsx";
import { RESULT_STATUS, USER_DIRECTION } from "@/constants/history";

interface IItem {
  data: any;
}

const HistoryItem: React.FC<IItem> = ({ data }) => {
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);

  const isWin = data?.result === RESULT_STATUS.WIN ?? false;
  const isRoundUp = data?.round_history?.result === USER_DIRECTION.UP ?? false;
  const isUserDerectionUp =
    data?.user_history?.direction === USER_DIRECTION.UP ?? false;

  const renderYourHistory = () => {
    return (
      <div className="mb-5">
        <div className="flex justify-between mb-2">
          <div className="text-lg font-bold">Your History</div>
          <div
            className={clsx(
              "flex text-lg font-bold gap-2",
              isWin && "text-[--colors-warning]",
              !isWin && "text-[--colors-textSubtle]"
            )}
          >
            {data?.result}{" "}
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
                isUserDerectionUp && "bg-[--colors-success]",
                !isUserDerectionUp && "bg-[--colors-failure]"
              )}
            >
              {isUserDerectionUp ? (
                <Icons.ArrowUp className="w-[20px] h-[20px]" />
              ) : (
                <Icons.ArrowDown className="w-[20px] h-[20px]" />
              )}{" "}
              {data?.user_history?.direction}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="text-sm">Your position</div>
            <div className="text-sm font-bold">
              {data?.user_history?.position} BNB
            </div>
          </div>

          <div className="flex justify-between">
            <div className="text-sm font-bold">Your winnings:</div>
            <div>
              <div
                className={clsx(
                  "text-sm font-bold",
                  isWin && "text-[--colors-success]",
                  !isWin && "text-[--colors-failure]"
                )}
              >
                {data?.winning_amount} BNB
              </div>
              <div className="text-right text-[--colors-textSubtle] text-xs">
                ~${data?.user_history?.about}
              </div>
            </div>
          </div>

          {isWin ? (
            <>
              <hr className="border-b-[1px] border-solid border-[--colors-cardBorder]" />

              <div className="flex justify-between text-[--colors-textSubtle]">
                <div className="text-xs font-bold">Amount to collect:</div>
                <div className="flex gap-1 text-xs font-bold items-center">
                  {data?.user_history?.amount_to_collect} BNB{" "}
                  <Icons.AlertCircle className="w-[17px] h-[17px]" />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    );
  };

  const renderRoundHistory = () => {
    return (
      <div>
        <div className="text-lg font-bold mb-2">Round History</div>
        <div
          className={clsx(
            "border-2 border-solid rounded-2xl p-3",
            isRoundUp && "border-[--colors-success]",
            !isRoundUp && "border-[--colors-failure]"
          )}
        >
          <div className="text-xs text-[--colors-textSubtle] font-bold mb-2">
            CLOSED PRICE
          </div>
          <div className="flex justify-between mb-3">
            <div
              className={clsx(
                "text-2xl font-bold",
                isRoundUp
                  ? "text-[--colors-success]"
                  : "text-[--colors-failure]"
              )}
            >
              ${data?.round_history?.closed_price}
            </div>
            <div
              className={clsx(
                "flex gap-1 items-center rounded-lg p-2 text-sm font-bold",
                isRoundUp ? "bg-[--colors-success]" : "bg-[--colors-failure]"
              )}
            >
              {isRoundUp ? (
                <Icons.ArrowUp className="w-[20px] h-[20px]" />
              ) : (
                <Icons.ArrowDown className="w-[20px] h-[20px]" />
              )}{" "}
              ${data?.round_history?.result_price}
            </div>
          </div>
          <div className="flex justify-between mb-1">
            <div className="text-sm">Locked Price:</div>
            <div className="text-sm">${data?.round_history?.locked_price}</div>
          </div>
          <div className="flex justify-between mb-1">
            <div className="text-sm font-bold">Prize Pool:</div>
            <div className="text-sm font-bold">
              {data?.round_history?.prize_pool} BNB
            </div>
          </div>
          <div className="flex justify-between mb-1">
            <div className="text-xs">UP:</div>
            <div className="text-xs">
              <span className="font-bold">
                {data?.round_history?.up}x Payout
              </span>{" "}
              | {data?.round_history?.up_value} BNB
            </div>
          </div>
          <div className="flex justify-between mb-1">
            <div className="text-xs">DOWN:</div>
            <div className="text-xs">
              <span className="font-bold">
                {data?.round_history?.down}x Payout{" "}
              </span>{" "}
              | {data?.round_history?.down_value} BNB
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContentDetail = () => {
    if (!isShowDetail) return null;

    return (
      <div className="p-4 border-b-2 border-solid border-[--colors-cardBorder] !bg-[--colors-backgroundAlt2]">
        {renderYourHistory()}

        {renderRoundHistory()}
      </div>
    );
  };

  return (
    <>
      <div
        className="p-4 border-b-2 border-solid border-[--colors-cardBorder] cursor-pointer flex items-center justify-between"
        onClick={() => {
          setIsShowDetail(!isShowDetail);
        }}
      >
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-xs">Round</div>
            <div className="text-[--colors-text] font-bold">{data?.round}</div>
          </div>
          <div className="text-center">
            <div className="text-xs">Your Result</div>
            <div
              className={clsx(
                "font-bold",
                isWin && "text-[--colors-success]",
                !isWin && "text-[--colors-failure]"
              )}
            >
              {data?.winning_amount}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {!data?.is_collected ? (
            <button
              className="bg-[--colors-primary] text-sm text-[--colors-white] px-4 py-1 rounded-2xl cursor-pointer hover:opacity-[0.8]"
              onClick={(e) => {
                console.log("Collected");
                e.stopPropagation();
              }}
            >
              Collect
            </button>
          ) : null}
          <div>
            {isShowDetail ? <Icons.ChevronUp /> : <Icons.ChevronDown />}
          </div>
        </div>
      </div>

      {renderContentDetail()}
    </>
  );
};

export default HistoryItem;

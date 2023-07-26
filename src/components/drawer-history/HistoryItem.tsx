"use client";

import React, { createRef, useState } from "react";

import clsx from "clsx";
import { ethers } from "ethers";
import { Icons } from "../Icons";
import Popup, { PopupRef } from "../ui/Modal";
import ClaimModal from "../bet-bo/ClaimModal";
import { replaceDotToComma } from "@/utils/format-number";
import { RESULT_STATUS, USER_DIRECTION } from "@/constants/history";

interface IHistoryDataProps {
  data: IHistory;
  onCollect: (status: boolean, round: string) => void;
}

const HistoryItem: React.FC<IHistoryDataProps> = ({ data, onCollect }) => {
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);

  const isWin = data?.status === RESULT_STATUS.WIN;
  const isLose = data?.status === RESULT_STATUS.LOSE;
  const isLive = data?.status === RESULT_STATUS.LIVE;
  const isWaiting = data?.status === RESULT_STATUS.WAITING;

  const handlerFormatEther = (value: number) => {
    return Number(ethers?.formatEther(BigInt(value))).toFixed(4);
  };

  const winningAmount = isLose
    ? data?.amount !== 0
      ? handlerFormatEther(data?.amount)
      : handlerFormatEther(data?.refund)
    : handlerFormatEther(data?.winning_amount);

  const ratePrice =
    (data?.round?.closePrice - data?.round?.lockPrice) / 10 ** 8;

  const renderYourHistory = () => {
    return (
      <div className="mb-5">
        <div className="flex justify-between mb-2">
          <div className="text-lg font-bold">Your History</div>
          <div
            className={clsx(
              "flex text-lg font-bold gap-2 uppercase",
              isWin && "text-[--colors-warning]",
              isLose && "text-[--colors-textSubtle]"
            )}
          >
            {data?.status}{" "}
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
                data?.position === "UP"
                  ? "bg-[--colors-success]"
                  : "bg-[--colors-failure]"
              )}
            >
              {data?.position === "UP" ? (
                <Icons.ArrowUp className="w-[20px] h-[20px]" />
              ) : (
                <Icons.ArrowDown className="w-[20px] h-[20px]" />
              )}{" "}
              {data?.position}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="text-sm">Your position</div>
            <div className="text-sm font-bold">
              {data?.amount
                ? replaceDotToComma(ethers.formatEther(BigInt(data?.amount)))
                : 0}{" "}
              BNB
            </div>
          </div>

          <div className="flex justify-between">
            <div className="text-sm font-bold">Your winnings:</div>
            <div>
              <div
                className={clsx(
                  "text-sm font-bold",
                  isWin && "text-[--colors-success]",
                  isLose && "text-[--colors-failure]"
                )}
              >
                {isWin ? "+" : "-"} {winningAmount} BNB
              </div>
              {/* <div className="text-right text-[--colors-textSubtle] text-xs">
                ~${data?.user_history?.about}
              </div> */}
            </div>
          </div>

          {isWin ? (
            <>
              <hr className="border-b-[1px] border-solid border-[--colors-cardBorder]" />

              <div className="flex justify-between text-[--colors-textSubtle]">
                <div className="text-xs font-bold">Amount to collect:</div>
                <div className="flex gap-1 text-xs font-bold items-center">
                  {/* winning_amount + bet */}
                  {handlerFormatEther(data.winning_amount)} BNB{" "}
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
            ratePrice > 0
              ? "border-[--colors-success]"
              : "border-[--colors-failure]"
          )}
        >
          <div className="text-xs text-[--colors-textSubtle] font-bold mb-2">
            CLOSED PRICE
          </div>
          <div className="flex justify-between mb-3">
            <div
              className={clsx(
                "text-2xl font-bold",
                ratePrice > 0
                  ? "text-[--colors-success]"
                  : "text-[--colors-failure]"
              )}
            >
              $
              {replaceDotToComma(
                (data?.round?.closePrice / 10 ** 8).toFixed(4).toString()
              )}
            </div>
            <div
              className={clsx(
                "flex gap-1 items-center rounded-lg p-2 text-sm font-bold",
                ratePrice > 0
                  ? "bg-[--colors-success]"
                  : "bg-[--colors-failure]"
              )}
            >
              {ratePrice > 0 ? (
                <Icons.ArrowUp className="w-[20px] h-[20px]" />
              ) : (
                <Icons.ArrowDown className="w-[20px] h-[20px]" />
              )}{" "}
              ${ratePrice.toFixed(4)}
            </div>
          </div>
          <div className="flex justify-between mb-1">
            <div className="text-sm">Locked Price:</div>
            <div className="text-sm">
<<<<<<< HEAD
              $
              {data?.round?.lockPrice
                ? replaceDotToComma(
                    ethers.formatEther(BigInt(data?.round?.lockPrice))
                  )
                : 0}
=======
              ${data?.round?.lockPrice ? data?.round?.lockPrice / 10 ** 8 : 0}
>>>>>>> dev
            </div>
          </div>
          <div className="flex justify-between mb-1">
            <div className="text-sm font-bold">Prize Pool:</div>
            <div className="text-sm font-bold">
              {data?.round?.totalAmount
                ? replaceDotToComma(
                    ethers.formatEther(BigInt(data?.round?.totalAmount))
                  )
                : 0}{" "}
              BNB
            </div>
          </div>
          <div className="flex justify-between mb-1">
            <div className="text-xs">UP:</div>
            <div className="text-xs">
              <span className="font-bold">1 Payout</span>
            </div>
          </div>
          <div className="flex justify-between mb-1">
            <div className="text-xs">DOWN:</div>
            <div className="text-xs">
              <span className="font-bold">1 Payout</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWinningAmount = () => {
    if (isWaiting || isLive) return null;

    return (
      <div className="text-center">
        <div className="text-xs">Your Result</div>
        <div
          className={clsx(
            "font-bold",
            isWin && "text-[--colors-success]",
            isLose && "text-[--colors-failure]"
          )}
        >
          {isWin ? "+" : "-"} {winningAmount}
        </div>
      </div>
    );
  };

  const renderLayoutStatus = () => {
    if (isLive) {
      return (
        <div className="flex text-[--colors-secondary] font-semibold text-base gap-2">
          <Icons.PlayCircle />
          <span>Live</span>
        </div>
      );
    }

    if (isWaiting) {
      return (
        <div className="flex text-[--colors-primary] font-semibold text-base gap-2">
          <Icons.Clock3 />
          <span>Starting Soon</span>
        </div>
      );
    }

    return null;
  };

  const renderContentDetail = () => {
    if (!isShowDetail) return null;

    return (
      <div className="p-4 border-b-2 border-solid border-[--colors-cardBorder] !bg-[--colors-backgroundAlt2]">
        {!isWaiting && !isLive ? renderYourHistory() : null}

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
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-xs">Round</div>
            <div className="text-[--colors-text] font-bold">{data?.epoch}</div>
          </div>
          {renderWinningAmount()}

          {renderLayoutStatus()}
        </div>
        <div className="flex gap-2">
          {isWin && data?.claimed === false ? (
            <button
              className="bg-[--colors-primary] text-sm text-[--colors-white] px-4 py-1 rounded-2xl cursor-pointer hover:opacity-[0.8]"
              onClick={(e) => {
                onCollect(true, data?.round?.epoch);
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

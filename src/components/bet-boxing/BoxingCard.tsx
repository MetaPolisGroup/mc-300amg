"use client";
import React, { useEffect, useState } from "react";
import SetBoxingBetPosition from "./SetBoxingBetPosition";
import getDataFileredByOnSnapshot from "@/helpers/getDataFilteredByOnSnapshot";
import { DocumentData } from "firebase/firestore";
import { EMarketTypes } from "@/constants/marketsType";
import { toFixedEtherNumber } from "@/utils/format-number";
import { ethers } from "ethers";
import { CURRENCY_UNIT } from "@/constants";
import { useAccount } from "wagmi";
import { isEmpty } from "lodash";
import TooltipElement from "../ui/Tooltip";
import Button from "../ui/Button";

const BoxingCard = () => {
  const [showSetBetCard, setShowSetBetCard] = useState<boolean>(false);
  const [yesOrNoStatus, setYesOrNoStatus] = useState<string>("");
  const [boxingData, setBoxingData] = useState<IBoxingData[]>([]);
  const [userBettedBoxing, setUserBettedBoxing] = useState<IBoxingBetted[]>([]);
  const { isConnected, address } = useAccount();

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getDataFileredByOnSnapshot(
      "markets",
      [["epoch", "==", EMarketTypes.BOXING]],
      (docs: DocumentData) => {
        setBoxingData(docs as IBoxingData[]);
      }
    );
    if (isConnected && address) {
      getDataFileredByOnSnapshot(
        "bets_market",
        [["user_address", "==", address as `0x${string}`]],
        (docs) => {
          setUserBettedBoxing(docs as IBoxingBetted[]);
        }
      );
    }
  }, [isConnected, address]);

  console.log(userBettedBoxing);

  const enterYesOrNoHandler = (status: string) => {
    setShowSetBetCard(true);
    if (status === "YES") setYesOrNoStatus("YES");
    if (status === "NO") setYesOrNoStatus("NO");
  };

  const changeYesOrNoHandler = (status: string) => {
    setYesOrNoStatus(status);
    inputRef.current?.focus();
  };

  const placedBetHandler = (status: boolean) => {
    setShowSetBetCard(status);
  };

  const backwardHandler = (status: boolean) => {
    setShowSetBetCard(status);
  };

  return (
    <div
      className={`w-full flex h-[485px] justify-center items-center relative transition-transform duration-700 preverve-3d ${
        showSetBetCard === true && "rotateY-180"
      }`}
    >
      <div
        className={`card z-20 w-96 md:w-[505px] shadow-xl backface-hidden ${
          showSetBetCard && "z-10"
        }`}
      >
        <div className="card-body rounded-2xl p-4 bg-[--colors-backgroundAlt]">
          <div className="relative -mb-[0.55rem]">
            <div className="h-16 mx-auto w-60">
              <div className="flex flex-col justify-start absolute top-0 left-0 w-full h-full">
                <div className="w-full md:w-[290px] h-12 flex items-center px-4 mb-3 md:mb-5 text-slate-400 text-xl font-light leading-7 bg-[--colors-backgroundAlt] rounded-[20px] border-2 border-slate-400 justify-center">
                  Highlights
                </div>
                <div className="text-[--colors-textSubtle] font-semibold text-sm"></div>
              </div>
            </div>
          </div>
          <div className="mb-5 md:mb-10 text-[--colors-contrast] text-base font-bold leading-7">
            An epic showdown is here! Elon Musk vs Mark Zuckerberg Who&apos;s
            gonna win?
          </div>

          <div className="flex flex-col justify-between gap-2">
            <div className="flex gap-2 items-center">
              <div className="text-[--colors-contrast] text-base font-light leading-snug">
                Total Volumn
              </div>
              <div className="text-slate-400 text-[26px] font-bold leading-9">
                {boxingData?.[0]?.totalAmount
                  ? toFixedEtherNumber(
                      ethers.formatEther(BigInt(boxingData?.[0]?.totalAmount)),
                      2
                    )
                  : 0}{" "}
                {CURRENCY_UNIT}
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-3 justify-end">
              {!isEmpty(userBettedBoxing) ? (
                <>
                  <div
                    className={`w-full h-[54px] flex items-center justify-between p-[6px] pr-4 bg-gradient-to-br from-slate-400 to-indigo-800 rounded-[20px] cursor-pointer ${
                      userBettedBoxing?.[0]?.position !== "UP"
                        ? "from-slate-500 to-slate-600 cursor-not-allowed opacity-60"
                        : ""
                    }`}
                  >
                    <div className="w-44 py-[7px] px-4 text-[--colors-contrast] text-xl font-light leading-7 bg-[--colors-backgroundAlt] rounded-[14px]">
                      {boxingData?.[0]?.bullAmount
                        ? toFixedEtherNumber(
                            ethers.formatEther(
                              BigInt(boxingData?.[0]?.bullAmount)
                            ),
                            2
                          )
                        : 0}{" "}
                      {CURRENCY_UNIT}
                    </div>
                    <div className="flex flex-1 items-center justify-end text-right text-white text-xs font-bold leading-7">
                      {userBettedBoxing?.[0]?.position === "UP" ? (
                        <TooltipElement
                          title={`${toFixedEtherNumber(
                            ethers.formatEther(
                              BigInt(userBettedBoxing?.[0]?.amount)
                            ),
                            2
                          )} ${CURRENCY_UNIT}`}
                          classNameText="text-right"
                        >
                          ELON MUSK ENTERED
                        </TooltipElement>
                      ) : (
                        "ELON MUSK"
                      )}
                    </div>
                  </div>

                  <div
                    className={`w-full h-[54px] flex items-center justify-between p-[6px] pr-4 bg-gradient-to-br from-slate-400 to-indigo-800 rounded-[20px] cursor-pointer ${
                      userBettedBoxing?.[0]?.position !== "DOWN"
                        ? "from-slate-500 to-slate-600 cursor-not-allowed opacity-60"
                        : ""
                    }`}
                  >
                    <div className="w-44 py-[7px] px-4 text-[--colors-contrast] text-xl font-light leading-7 bg-[--colors-backgroundAlt] rounded-[14px]">
                      {boxingData?.[0]?.bearAmount
                        ? toFixedEtherNumber(
                            ethers.formatEther(
                              BigInt(boxingData?.[0]?.bearAmount)
                            ),
                            2
                          )
                        : 0}{" "}
                      {CURRENCY_UNIT}
                    </div>
                    <div className="flex flex-1 items-center justify-end text-right text-white text-xs font-bold leading-7">
                      {userBettedBoxing?.[0]?.position === "DOWN" ? (
                        <TooltipElement
                          title={`${toFixedEtherNumber(
                            ethers.formatEther(
                              BigInt(userBettedBoxing?.[0]?.amount)
                            ),
                            2
                          )} ${CURRENCY_UNIT}`}
                          classNameText="text-right"
                        >
                          MARK ZUCKERBERG ENTERED
                        </TooltipElement>
                      ) : (
                        "MARK ZUCKERBERG"
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="w-full flex-1 h-[54px] flex items-center justify-between p-[6px] pr-4 bg-gradient-to-br from-slate-400 to-indigo-800 rounded-[20px] cursor-pointer"
                    onClick={() => enterYesOrNoHandler("YES")}
                  >
                    <div className="w-44 py-[7px] px-4 text-[--colors-contrast] text-xl font-light leading-7 bg-[--colors-backgroundAlt] rounded-[14px]">
                      {boxingData?.[0]?.bullAmount
                        ? toFixedEtherNumber(
                            ethers.formatEther(
                              BigInt(boxingData?.[0]?.bullAmount)
                            ),
                            2
                          )
                        : 0}{" "}
                      {CURRENCY_UNIT}
                    </div>
                    <div className="flex flex-1 justify-between pl-2">
                      <div className="flex items-center justify-start text-white text-xs font-bold leading-7">
                        ELON MUSK
                      </div>
                      <button className="text-white">Select</button>
                    </div>
                  </div>

                  <div
                    className="w-full flex-1 h-[54px] flex items-center justify-between p-[6px] pr-4 bg-gradient-to-br from-slate-400 to-indigo-800 rounded-[20px] cursor-pointer"
                    onClick={() => enterYesOrNoHandler("NO")}
                  >
                    <div className="w-44 py-[7px] px-4 text-[--colors-contrast] text-xl font-light leading-7 bg-[--colors-backgroundAlt] rounded-[14px]">
                      {boxingData?.[0]?.bearAmount
                        ? toFixedEtherNumber(
                            ethers.formatEther(
                              BigInt(boxingData?.[0]?.bearAmount)
                            ),
                            2
                          )
                        : 0}{" "}
                      {CURRENCY_UNIT}
                    </div>
                    <div className="flex flex-1 justify-between pl-2">
                      <div className="flex items-center justify-center text-white text-xs font-bold leading-7">
                        MARK ZUCKERBERG
                      </div>
                      <button className="text-white">Select</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <SetBoxingBetPosition
        showSetBetCard={showSetBetCard}
        yesOrNoStatus={yesOrNoStatus}
        onEnterYesOrNo={changeYesOrNoHandler}
        onBackward={backwardHandler}
        currentRound={EMarketTypes.BOXING.toString()}
        onPlacedBet={placedBetHandler}
        inputRef={inputRef}
      />
    </div>
  );
};

export default BoxingCard;
